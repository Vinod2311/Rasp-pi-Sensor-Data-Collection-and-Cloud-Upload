
import data from '../readingFirebase.json' with { type: 'json' };
import {getStorage,ref as refStorage,uploadBytes}  from 'firebase/storage'
import { initializeApp,deleteApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, set, get, push, child, update, ref, onValue } from "firebase/database";
import * as fs from 'node:fs'
import path from 'node:path';


//const x = path.resolve(import.meta.dirname, '../file.xml')
//console.log(x)



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

const currentUser = {
  fName: "Joe",
  lName: "Bloggs",
  email: "test@test.com",
  password: "secret"
};

var userFirebase

var firebaseApp = initializeApp(firebaseConfig)

const firebaseDatabase = getDatabase(firebaseApp);

const firebaseAuth = getAuth(firebaseApp)

const firebaseStorage = getStorage(firebaseApp)


async function uploadImage() {
  const imagePath = path.resolve(import.meta.dirname, '../foo.jpg')
  const data = fs.readFileSync(imagePath)
  const storageRef = refStorage(firebaseStorage,'test.jpg')
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
    const errorCode = error.code
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
    //console.log(userFirebase)
  }).catch((error) => {
    const errorCode = error.code
    console.log(errorCode)
    return
    
  })
}

//createUserFirebase()
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadDataFirebase(){
  try {
    await createUserFirebase()
    //await uploadImage()
    const firebaseData = {
    
      ...data,
      timestamp: Date.now(),
      ownerName: currentUser["fName"] + " " + currentUser["lName"],
      
    }
    const userData = {fName: currentUser["fName"], lName: currentUser["lName"], email: currentUser["email"]}
    //console.log(firebaseData)
    await update(ref(firebaseDatabase,'users/' + userFirebase.uid +'/'  ),userData)
    const result = await set(ref(firebaseDatabase,'users/' + userFirebase.uid +'/readings/'+  firebaseData.timestamp.toString()  ),firebaseData)
    //await find(ref(firebaseDatabase,'users/' + userFirebase.uid +'/config/' ),)
    const dbRef = ref(firebaseDatabase);
    await get(child(dbRef, `users/${userFirebase.uid}/config`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      
      console.log(snapshot.val());
      await sleep(snapshot.val().firebaseDBFrequency*1000)
    } else {
      console.log("No data available");
    }
    }).catch((error) => {
      console.error(error);
    });
    //deleteApp(firebaseApp)
    //return
  } catch(error){
    console.error(error)
  } finally {
    console.log("exit")
    //await deleteApp(firebaseApp)
    
  }
  process.exit()

};

uploadDataFirebase()





