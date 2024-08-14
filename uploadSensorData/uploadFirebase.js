
import data from '../reading.json' with { type: 'json' };
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, set, push, child, update, ref } from "firebase/database";



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
console.log(currentUser["email"])

var userFirebase

const firebaseApp = initializeApp(firebaseConfig)

const firebaseDatabase = getDatabase(firebaseApp);

const firebaseAuth = getAuth(firebaseApp)

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
    console.log(userFirebase)
  }).catch((error) => {
    const errorCode = error.code
    console.log(errorCode)
  })
}

//createUserFirebase()

async function uploadDataFirebase(){
  await createUserFirebase()
  const firebaseData = {
   
    ...data,
    timestamp: Date.now(),
    ownerName: currentUser["fName"] + " " + currentUser["lName"],
    raspberryId: "To be filled"
  }
  console.log(firebaseData)
  //console.log(ref(firebaseDatabase,'users/' + userFirebase.uid))
  //const db = getDatabase() 
  //const key = push(child(ref(firebaseDatabase), 'users')).key
  //console.log(key)
  //const updateData = {}
  //console.log(`/users/${currentUser.fName}`)
  //updateData['/users/${currentUser[fName]}' ] = firebaseData
  set(ref(firebaseDatabase,'users/' + userFirebase.uid +'/'+ firebaseData.time.toString()  ),firebaseData)
  return 
}

uploadDataFirebase()





