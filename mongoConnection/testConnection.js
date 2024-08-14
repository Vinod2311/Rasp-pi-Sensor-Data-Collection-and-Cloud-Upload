import pkg from 'realm';
const { App, Credentials } = pkg;
import fs from 'fs'
import path from "path";
import { spawnSync } from 'child_process';


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



async function readPythonScript(){
  const pythonScript = await spawnSync('python3',['../soil_moisture_sensor/test3.py']);
  const result = pythonScript.stdout.toString().trim();
  console.log(result)
}


async function fetchData(){
  try {
    const credentials = Credentials.emailPassword(currentUser["email"],currentUser["password"])
    const user = await app.logIn(credentials)
    const collection = await user.mongoClient("mongodb-atlas").db("testDb").collection("testCollection")
    const count = await collection.count()
    if (count == 1){
      console.log("Connection with mongoDB estabilised")
    } else{
      console.error(error)
    }
  } catch (error){
    console.error(error)
  }
};

fetchData()

//readPythonScript()


