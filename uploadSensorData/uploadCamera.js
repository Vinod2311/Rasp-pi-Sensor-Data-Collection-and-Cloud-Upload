
import data from '../readingFirebase.json' with { type: 'json' };
import userData from '../user.json' with { type: 'json' };
import {getStorage,ref as refStorage,uploadBytes}  from 'firebase/storage'
import pkg from 'realm';
const { App,Credentials} = pkg;
import { initializeApp} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, set, get, child, update, ref } from "firebase/database";
import * as fs from 'node:fs'
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
//const {v4: uuidv4} = pkg
//Public API for database
const firebaseConfig = {
  apiKey: "AIzaSyCHfnIcqTbOKuKtizPN4qUp6_AuwABENF8",
  authDomain: "raspberry-pi-plant-monitoring.firebaseapp.com",
  databaseURL: "https://raspberry-pi-plant-monitoring-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "raspberry-pi-plant-monitoring",
  storageBucket: "raspberry-pi-plant-monitoring.appspot.com",
  messagingSenderId: "656085848146",
  appId: "1:656085848146:web:d899dd1a52857536610f8b",
  measurementId: "G-XZ4ZSM1J4X"
};

const monogoApp = new App({
  id: "application-1-dkzsnxq",
});

const currentUser = userData.currentUser

//Initialise firebase instance
var userFirebase
var firebaseApp = initializeApp(firebaseConfig)
const firebaseDatabase = getDatabase(firebaseApp);
const firebaseAuth = getAuth(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)


async function uploadImage(ownerId,uuid) {
  const imagePath = path.resolve(import.meta.dirname, '../photos/image.jpg')
  const data = fs.readFileSync(imagePath)
  const storageRef = refStorage(firebaseStorage,`${ownerId}/${uuid}.jpg`)
  await uploadBytes(storageRef, data).then((snapshot) => {
    console.log('Uploaded a file!');
  })
}

async function createUserFirebase(){
  var emailAlreadyInUse = false
  await createUserWithEmailAndPassword(firebaseAuth, currentUser["email"],currentUser["password"]).then
  ((userCredentials) => {
    userFirebase = userCredentials.user
    console.log(userFirebase)
  })
  .catch((error) => {
    console.log(error.code)
    emailAlreadyInUse = true
  })
  if (emailAlreadyInUse == true){
    await signInUserFirebase()
  }
}

async function signInUserFirebase(){
  await signInWithEmailAndPassword(firebaseAuth,currentUser["email"],currentUser["password"]).then
  ((userCredentials) => {
    userFirebase = userCredentials.user
  }).catch((error) => {
    const errorCode = error.code
    console.log(errorCode)
    return
    
  })
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadDataCamera(){
  try {
    await createUserFirebase()
    const credentials = Credentials.emailPassword(currentUser["email"],currentUser["password"])
    const userMongo = await monogoApp.logIn(credentials)
    const timestamp = new Date()
    const myuuid = uuidv4()
    await uploadImage(userFirebase.uid,myuuid)
    const collection = await userMongo.mongoClient("mongodb-atlas").db("Images").collection(userMongo.id)
    const result = await collection.insertOne({"url": `${userFirebase.uid}/${myuuid}`, "timestamp": timestamp})
    const dbRef = ref(firebaseDatabase);
    await get(child(dbRef, `users/${userFirebase.uid}/${currentUser.raspberryPiName}/config`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      await sleep(snapshot.val().cameraFrequency*3600000)
    } else {
      console.log("No data available");
    }
    }).catch((error) => {
      console.error(error);
    });
  } catch(error){
    console.error(error)
  } finally {
    console.log("exit")
    
  }
  process.exit()
};

uploadDataCamera()





