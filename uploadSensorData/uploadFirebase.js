
import data from '../readingFirebase.json' with { type: 'json' };
import {getStorage,ref as refStorage,uploadBytes}  from 'firebase/storage'
import { initializeApp,deleteApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, set, push, child, update, ref } from "firebase/database";
import * as fs from 'node:fs'
import path from 'node:path';

//const x = path.resolve(import.meta.dirname, '../file.xml')
//console.log(x)



const firebaseConfig = {
  apiKey: "AIzaSyD7_zof5JzNwklR-j4p2K--SjQJP36XBX4",
  authDomain: "plant-health-ce7eb.firebaseapp.com",
  databaseURL: "https://plant-health-ce7eb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plant-health-ce7eb",
  storageBucket: "plant-health-ce7eb.appspot.com",
  messagingSenderId: "200030059955",
  appId: "1:200030059955:web:0e38206315d84abbec5fc6",
  measurementId: "G-ZVESSKYMD4"
};

const currentUser = {
  fName: "Joe",
  lName: "Bloggs",
  email: "sample@sample.com",
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

async function uploadDataFirebase(){
  try {
    await createUserFirebase()
    await uploadImage()
    const firebaseData = {
    
      ...data,
      timestamp: Date.now(),
      ownerName: currentUser["fName"] + " " + currentUser["lName"],
      raspberryId: "To be filled"
    }
    const userData = {fName: currentUser["fName"], lName: currentUser["lName"], email: currentUser["email"]}
    //console.log(firebaseData)
    await update(ref(firebaseDatabase,'users/' + userFirebase.uid +'/'  ),userData)
    const result = await set(ref(firebaseDatabase,'users/' + userFirebase.uid +'/readings/'+  firebaseData.timestamp.toString()  ),firebaseData)
    //deleteApp(firebaseApp)
    //return
  } catch(error){
    console.error(error)
  } finally {
    console.log("exit")
    //await deleteApp(firebaseApp)
    process.exit()
  }
  

};

uploadDataFirebase()





