import pkg from 'realm';
const { App,Credentials} = pkg;
import data from '../reading.json' with { type: 'json' };




const currentUser = {
  fName: "Joe",
  lName: "Bloggs",
  email: "sample@sample.com",
  password: "secret"
};

// Initialize your Mongo App.
const monogoApp = new App({
  id: "application-1-dkzsnxq",
});

async function uploadData(){
  try {
    //app.emailPasswordAuth.registerUser("joe@bloggs.com","secret")
    const credentials = Credentials.emailPassword(currentUser["email"],currentUser["password"])
    const user = await monogoApp.logIn(credentials)
    const collection = await user.mongoClient("mongodb-atlas").db(currentUser.fName +"_"+ currentUser.lName).collection("Readings")
    
    data['time'] = new Date()
    data['raspberryId'] = "To be filled"
    data['ownerId'] = user.id
    const result = await collection.insertOne(data)
    //console.log(result)
    console.log("Upload Successful")
  } catch (error){
    console.error(error)
  }
};

uploadData()



