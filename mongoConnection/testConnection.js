import pkg from 'realm';
const { App, Credentials } = pkg;
import userData from '../user.json' with { type: 'json' };

// Initialize mongoDB App
const app = new App({
  id: "application-1-dkzsnxq",
});

//User details
const currentUser = userData.currentUser


async function ConnectToAppService(){
  try {
    const credentials = Credentials.emailPassword(currentUser["email"],currentUser["password"])
    const user = await app.logIn(credentials)
    const collection = await user.mongoClient("mongodb-atlas").db("testDb").collection("testCollection")
    const count = await collection.count()
    if (count == 1){
      console.log("Connection with mongoDB App Service estabilised")
    } else{
      console.error(error)
    }
  } catch (error){
    console.error(error)
  }
};

ConnectToAppService()




