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



async function createEmptyFile(){
  //fs.watchFile(path.resolve(__dirname, 'testData.json'),'a')
  //const relativePath = path.resolve(__dirname, 'testData.json')
  //console.log(relativePath)
  fs.writeFile('../testFile.json', 'sample data', function (err) {
    if (err) throw err;
    console.log("It's saved!");
});
}

async function fetchData(){
  try {
    //const credentials = Realm.Credentials.emailPassword(currentUser["email"],currentUser["password"])
    const credentials = Credentials.emailPassword(currentUser["email"],currentUser["password"])
    console.log(credentials)
    const user = await app.logIn(credentials)
    //const newDatabase = await user.mongoClient("mongodb-atlas").db("newDatabase")
    const newCollection = await user.mongoClient("mongodb-atlas").db(currentUser["fName"]).collection("sensorData")
    //const collection = await user.mongoClient("mongodb-atlas").db("todo").collection("Item")

    //const list = await collection.find()
    
    const result = await newCollection.insertOne({
      summary: "eating",
      isComplete: true,
      owner_id: "44"
    })
    //console.log(list)
  } catch (error){
    console.error(error)
  }
};
fetchData();
createEmptyFile();
readPythonScript()


