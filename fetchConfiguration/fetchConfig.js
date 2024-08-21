
import data from '../readingFirebase.json' with { type: 'json' };
import {getStorage,ref as refStorage,uploadBytes}  from 'firebase/storage'
import { initializeApp,deleteApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, set, onValue, update, ref } from "firebase/database";
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


var firebaseApp = initializeApp(firebaseConfig)

const firebaseDatabase = getDatabase(firebaseApp);

const firebaseAuth = getAuth(firebaseApp)




async function listenToConfig() {
  const configRef = ref(firebaseDatabase,'config')
  onValue(configRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
  })
}





listenToConfig()





