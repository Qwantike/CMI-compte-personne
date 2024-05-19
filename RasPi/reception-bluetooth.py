#!/usr/bin/env python3
import serial
import sys

bluetooth_serial= serial.Serial("/dev/rfcomm0", 9600)

try:
    while True:
        data = bluetooth_serial.readline().decode().strip()
        if data:
            print(data)
            sys.stdout.flush()

            
            
except KeyboardInterrupt:
    bluetooth_serial.close()
    print("Programme terminé")
    
except Exception as e:
    print("erreur produite", e )
    bluetooth_serial.close()
    
            
