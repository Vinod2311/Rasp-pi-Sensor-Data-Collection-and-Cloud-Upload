import pkg from 'realm';
const { App,Credentials} = pkg;
import data from '../readingMongo.json' with { type: 'json' };




const currentUser = {
  fName: "Joe",
  lName: "Bloggs",
  email: "test@test.com",
  password: "secret",
  raspberryName: "raspi 1"
};

// Initialize your Mongo App.
const monogoApp = new App({
  id: "application-1-dkzsnxq",
});

async function checkConfig(){
  try {
    //app.emailPasswordAuth.registerUser("joe@bloggs.com","secret")
    const credentials = Credentials.emailPassword(currentUser["email"],currentUser["password"])
    const user = await monogoApp.logIn(credentials)
    const raspberryCollection = await user.mongoClient("mongodb-atlas").db("Raspberry_pi").collection("Devices")
    const raspberryPi = await raspberryCollection.findOne({raspberryPiName: currentUser.raspberryName})
    console.log(raspberryPi)
    const collection = await user.mongoClient("mongodb-atlas").db("Readings").collection(user.id)
    data['time'] = new Date()
    
    const result = await collection.insertOne(data)
    //console.log(result)
    console.log("Upload Successful")
  } catch (error){
    console.error(error)
  }
};

uploadData()



