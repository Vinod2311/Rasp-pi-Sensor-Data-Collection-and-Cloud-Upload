import pkg from 'realm';
const { App, Credentials,Timestamp,time } = pkg;
import fs from 'fs'
import path from "path";
import { spawnSync } from 'child_process';

import data from '../reading.json' with { type: 'json' };
import { type } from 'os';
console.log(data) 


// Initialize your App.
const app = new App({
  id: "application-1-dkzsnxq",
});


//User details
const currentUser = {
  "fName": "Joe",
  "lName": "bloggs",
  "email": "sample@sample.com",
  "password": "secret"
};



async function uploadData(){
  try {
    const credentials = Credentials.emailPassword(currentUser["email"],currentUser["password"])
    const user = await app.logIn(credentials)
    const collection = await user.mongoClient("mongodb-atlas").db(fName + lName).collection("reading")
    data['time'] = new Date()
    console.log(data['time'])
    console.log(data)
    console.log(typeof(data))
    const result = await collection.insertOne(data)

  } catch (error){
    console.error(error)
  }
};

uploadData()



