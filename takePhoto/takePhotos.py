from picamera import PiCamera
import time


camera = PiCamera()
camera.resolution = (1024, 768)
camera.start_preview()
time.sleep(2)
timeStamp =time.time()
path = 'photos/'+str(timeStamp) +'.jpg'
print(path)
camera.capture(path)
