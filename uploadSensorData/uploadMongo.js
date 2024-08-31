import pkg from 'realm';
const { App,Credentials} = pkg;
import data from '../readingMongo.json' with { type: 'json' };
import userData from '../user.json' with { type: 'json' };



const currentUser = userData.currentUser

// Initialize mongo app
const monogoApp = new App({
  id: "application-1-dkzsnxq",
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadData(){
  try {
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
    await sleep(raspberryPi.timings.mongoDBFrequency*60000)
    console.log("Upload Successful")
  } catch (error){
    console.error(error)
  }
};

uploadData()



