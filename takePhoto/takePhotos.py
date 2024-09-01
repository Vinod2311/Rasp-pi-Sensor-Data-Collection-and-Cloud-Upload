from picamera import PiCamera

import sys
import os



#start camera and wait for it to be ready
def takePhoto():
  camera = PiCamera()
  camera.resolution = (640, 480)
  camera.start_preview()
  path = os.path.abspath('photos/image.jpg')
  camera.capture(path)
  camera.stop_preview()
  camera.close()
  

#takePhoto()
