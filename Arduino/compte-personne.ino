#include <SoftwareSerial.h>

#define DEBUG false


SoftwareSerial BTdevice(5,4); //RX,TX

const int sensorPin1 = 2; // IR sensor 1 pin
const int sensorPin2 = 3; // IR sensor 2 pin

unsigned long debut_flag;
int cpt=0;

void setup() {
    pinMode(sensorPin1, INPUT_PULLUP);
    pinMode(sensorPin2, INPUT_PULLUP);
    Serial.begin(9600);
    BTdevice.begin(9600);
}

// Function to check if sensor 1 is triggered
bool check1()
{
    return digitalRead(sensorPin1) == LOW;
}

// Function to check if sensor 2 is triggered
bool check2()
{
    return digitalRead(sensorPin2) == LOW;
}

void loop() {
    bool flag1 = false;
    bool flag2 = false;
    if (BTdevice.available()>0)
    {  
       #if DEBUG
        Serial.print("BT disponible");
        delay(1000);
        #endif
    }
    else 
    {  
        #if DEBUG
        Serial.print("BT non-disponible");
        delay(1000);
        #endif
    }

    flag1 = check1();
    if (flag1)
    {
        debut_flag = millis();
        while (((millis() - debut_flag) < 4000) && (!flag2))
        {
            flag2 = check2();
        }
        if (flag2)
        {
            cpt++;
            Serial.print("Sent value:");
            Serial.println(cpt);
            BTdevice.write(String(cpt).c_str());              
            BTdevice.write("\n");
            delay(1000);
            flag2 = false;
            flag1 = false;
           
        }
    }

    flag2 = check2();
    if (flag2)
    {
        debut_flag = millis();
        while (((millis() - debut_flag) < 4000) && (!flag1))
        {
            flag1 = check1();
        }
        if (flag1)
        {
            cpt--;
            if(cpt<0){
              cpt=0;
              }
            Serial.print("Sent value:");
            Serial.println(cpt);
            BTdevice.write(String(cpt).c_str());
            BTdevice.write("\n");
            delay(1000);
            flag2 = false;
            flag1 = false;
        }
    }
}
