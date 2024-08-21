import sys
import os
sys.path.insert(0, os.path.abspath(''))
import subprocess
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from multiprocessing import Process
import time
import threading
from writeSensorReading.testWrite import writeReadingData


def checkSensorReadingFileExists():
  file = open('readingFirebase.json','w+')
  file = open('readingMongo.json', 'w+')
  



def checkMongoConnection():
  result = subprocess.run(["node","mongoConnection/testConnection.js"], capture_output=True, text=True)
  print(result)   #Check mongoDB App service connection
  if (result.returncode == 0):
    print('\nConnected to MongoDB\n')
  else:
    print("No Connection to MongoDB")
    quit()



def uploadToMongo(frequency):
  #print("mongoLoop")
  while True:
    writeReadingData('readingMongo.json')
    uploadResultMongo = subprocess.run(["node", "uploadSensorData/uploadMongo.js"], capture_output=True, text=True)
    if (uploadResultMongo.returncode == 0):
      print('Uploaded to MongoDB')
      time.sleep(frequency)
    else:
      print(uploadResultMongo)
      print("Upload to Mongo Failed")
      quit()

def uploadToFirebase(frequency):
  
  while True:
    writeReadingData('readingFirebase.json')
    uploadResultFirebase = subprocess.run(["node", "uploadSensorData/uploadFirebase.js"], capture_output=True, text=True)
    if (uploadResultFirebase.returncode == 0):
      print('Uploaded to Firebase \n')
      time.sleep(frequency)
    else:
      print(uploadResultFirebase)
      print("Upload to Firebase Failed")
      quit()

#uploadToMongoProcess = Process(target=uploadToMongo(10))
#uploadToFirebaseProcess = Process(target=uploadToFirebase(5))

#Main script to collect and upload sensor readings
def main():
  
  checkSensorReadingFileExists()       
  checkMongoConnection()
  time.sleep(1)

  #t1 = threading.Thread(target=uploadToFirebase, args=(5,))
  #t1.start()
  #t2 = threading.Thread(target=uploadToMongo,args=(10,))
  #t2.start()

  uploadToFirebaseProcess = Process(target=uploadToFirebase, args=(10,))
  uploadToFirebaseProcess.start()

  uploadToMongoProcess = Process(target=uploadToMongo,args=(600,))
  uploadToMongoProcess.start()

  uploadToFirebaseProcess.join()
  uploadToMongoProcess.join()
  
 
  
  #t1.start()
  #t2.start()
  #with ThreadPoolExecutor(max_workers=2) as executor:
  #  results = executor.map(uploadToFirebase(5),uploadToMongo(10))
  #  for result in results:
  #    print(result)
  #uploadToFirebaseProcess.start()
  #uploadToMongoProcess.start()

  #uploadToMongoProcess.join()
  #uploadToFirebaseProcess.join()




  
    
  #  quit()
       
  


#Run program
if __name__ == "__main__":
  main()





