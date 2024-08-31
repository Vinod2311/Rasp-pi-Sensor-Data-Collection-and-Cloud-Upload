from PiAnalog import *


#PiAnalog is used to measure the resistance of the photoresistor.
#In my setup the capacitor is 1.0 microfarad and the resistors are 220 ohms as inputed below.
p = PiAnalog(1.0,220)

#The resistance is read and an appropiate scaling factor is applied so that 
#at bright sunlight the reading is 100 and at no sunling it falls to 0. 
def readLightIntensity():
    resitance = p.read_resistance()
    scalingFactor = 100000.0
    lightIntensity = round(scalingFactor/resitance, 4)
    return lightIntensity
    
#print(readLightIntensity())