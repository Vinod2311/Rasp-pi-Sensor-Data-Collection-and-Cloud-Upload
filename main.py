
import subprocess

#Main script to collect and upload sensor readings
def main():
  file = open('reading.json','w+')            #Check readingFile is present
  result = subprocess.run(["node","mongoConnection/testConnection.js"], capture_output=True, text=True)   #Check mongoDB App service connection
  if (result == "Connection with mongoDB established"):
    return
  return


#Run program
if __name__ == "__main__":
  main()