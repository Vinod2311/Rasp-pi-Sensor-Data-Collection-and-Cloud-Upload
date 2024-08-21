import pkg from 'realm';
const { App,Credentials} = pkg;
import data from '../readingMongo.json' with { type: 'json' };




const currentUser = {
  fName: "Joe",
  lName: "Bloggs",
  email: "test@test.com",
  password: "secret",
  raspberryPiName: "raspi 1"
};

// Initialize your Mongo App.
const monogoApp = new App({
  id: "application-1-dkzsnxq",
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadData(){
  try {
    //app.emailPasswordAuth.registerUser("joe@bloggs.com","secret")
    const credentials = Credentials.emailPassword(currentUser["email"],currentUser["password"])
    const user = await monogoApp.logIn(credentials)
    const raspberryCollection = await user.mongoClient("mongodb-atlas").db("Raspberry_pi").collection("Devices")
    const raspberryPi = await raspberryCollection.findOne({raspberryPiName: currentUser.raspberryPiName})
    console.log(raspberryPi)
    const collection = await user.mongoClient("mongodb-atlas").db("Readings").collection(user.id)
    data['time'] = new Date()
    data['raspberryId'] = (raspberryPi._id).toString()
    data['ownerId'] = user.id
    const result = await collection.insertOne(data)
    console.log(raspberryPi.timings.mongoDBFrequency*3600000)
    await sleep(raspberryPi.timings.mongoDBFrequency*60000)
    //console.log(result)
    console.log("Upload Successful")
  } catch (error){
    console.error(error)
  }
};

uploadData()



