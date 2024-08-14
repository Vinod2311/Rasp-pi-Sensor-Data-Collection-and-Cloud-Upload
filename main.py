import sys
import os
sys.path.insert(0, os.path.abspath(''))
import subprocess
import time
from writeSensorReading.testWrite import writeReadingData


def checkSensorReadingFileExists():
  file = open('reading.json','w+')



def checkMongoConnection():
  result = subprocess.run(["node","mongoConnection/testConnection.js"], capture_output=True, text=True)   #Check mongoDB App service connection
  if (result.returncode == 0):
    print('\nConnected to MongoDB\n')
  else:
    print("No Connection to MongoDB")
    quit()



def uploadToMongo():
  uploadResult = subprocess.run(["node", "uploadSensorData/uploadMongo.js"], capture_output=True, text=True)
  if (uploadResult.returncode == 0):
    print('Uploaded to MongoDB  \n')
  else:
    print(uploadResult)
    print("Upload Failed")
    quit()

def uploadToFirebase():
  uploadResult = subprocess.run(["node", "uploadSensorData/uploadFirebase.js"], capture_output=True, text=True)
  if (uploadResult.returncode == 0):
    print('Uploaded to Firebase')
  else:
    print(uploadResult)
    print("Upload Failed")
    quit()



#Main script to collect and upload sensor readings
def main():
  
  checkSensorReadingFileExists()       
  checkMongoConnection()
  while True:
    writeReadingData()
    uploadToMongo()
    uploadToFirebase()
    time.sleep(5)
  #  quit()
  quit()     
  


#Run program
if __name__ == "__main__":
  main()





