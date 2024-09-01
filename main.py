import sys
import os
sys.path.insert(0, os.path.abspath(''))
import subprocess
from multiprocessing import Process
import time
from writeSensorReading.writeData import writeReadingData
from takePhoto.takePhotos import takePhoto


def checkSensorReadingFileExists():
  file = open('readingFirebase.json','w+')
  file = open('readingMongo.json', 'w+')
  

def checkMongoConnection():
  result = subprocess.run(["node","mongoConnection/testConnection.js"], capture_output=True, text=True)
  if (result.returncode == 0):
    print('\nConnected to MongoDB\n')
  else:
    print("No Connection to MongoDB")
    



def uploadToMongo():
  while True:
    writeReadingData('readingMongo.json')
    uploadResultMongo = subprocess.run(["node", "uploadSensorData/uploadMongo.js"], capture_output=True, text=True)
    if (uploadResultMongo.returncode == 0):
      print('Uploaded to MongoDB')
    else:
      print(uploadResultMongo)
      print("Upload to Mongo Failed")
      break


def uploadImages():
  while True:
    takePhoto()
    uploadResultFirebase = subprocess.run(["node", "uploadSensorData/uploadCamera.js"], capture_output=True, text=True)
    if (uploadResultFirebase.returncode == 0):
      print('Uploaded image \n')
    else:
      print(uploadResultFirebase)
      print("Upload to Firebase storage Failed")
      break



def uploadToFirebase():
  while True:
    writeReadingData('readingFirebase.json')
    uploadResultFirebase = subprocess.run(["node", "uploadSensorData/uploadFirebase.js"], capture_output=True, text=True)
    if (uploadResultFirebase.returncode == 0):
      print('Uploaded to Firebase \n')
    else:
      print(uploadResultFirebase)
      print("Upload to Firebase Failed")
      break



#Main script to collect and upload sensor readings
def main():
  try:
  
    checkSensorReadingFileExists()       
    checkMongoConnection()
    time.sleep(1)

  #Start to subprocess to capture and upload to both databases(with different frequencies)
    uploadToFirebaseProcess = Process(target=uploadToFirebase)
    uploadToFirebaseProcess.start()

    uploadToMongoProcess = Process(target=uploadToMongo)
    uploadToMongoProcess.start()

    uploadImageProcess = Process(target=uploadImages)
    uploadImageProcess.start()

    uploadToFirebaseProcess.join()
    uploadToMongoProcess.join()
    uploadImageProcess.join()
  except:
    uploadImageProcess.terminate()
    uploadToFirebaseProcess.terminate()
    uploadToMongoProcess.terminate()
  
       
#Run program
if __name__ == "__main__":
  main()





