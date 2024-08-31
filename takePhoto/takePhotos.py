from picamera import PiCamera
import time


camera = PiCamera()
camera.resolution = (1024, 768)

#start camera and wait for it to be ready
camera.start_preview()
time.sleep(2)

timeStamp =time.time()
path = 'photos/'+str(timeStamp) +'.jpg'
camera.capture(path)
