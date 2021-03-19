/**
 * This example turns the ESP32 into a Bluetooth LE keyboard that writes the words, presses Enter, presses a media key and then Ctrl+Alt+Delete
 */
#include <BleKeyboard.h>
#include "AiEsp32RotaryEncoder.h"
#include "Arduino.h"

/*
connecting Rotary encoder
CLK (A pin) - to any microcontroler intput pin with interrupt -> in this example pin 32
DT (B pin) - to any microcontroler intput pin with interrupt -> in this example pin 21
SW (button pin) - to any microcontroler intput pin -> in this example pin 25
VCC - to microcontroler VCC (then set ROTARY_ENCODER_VCC_PIN -1) or in this example pin 25
GND - to microcontroler GND
*/
#define ROTARY_ENCODER_A_PIN 32
#define ROTARY_ENCODER_B_PIN 21
#define ROTARY_ENCODER_BUTTON_PIN 25
#define ROTARY_ENCODER_VCC_PIN 27 /* 27 put -1 of Rotary encoder Vcc is connected directly to 3,3V; else you can use declared output pin for powering rotary encoder */

//depending on your encoder - try 1,2 or 4 to get expected behaviour
//#define ROTARY_ENCODER_STEPS 1
//#define ROTARY_ENCODER_STEPS 2
#define ROTARY_ENCODER_STEPS 4

#define joi 14
AiEsp32RotaryEncoder rotaryEncoder = AiEsp32RotaryEncoder(ROTARY_ENCODER_A_PIN, ROTARY_ENCODER_B_PIN, ROTARY_ENCODER_BUTTON_PIN, ROTARY_ENCODER_VCC_PIN, 4);

int test_limits = 2;
int allowrot =1;
BleKeyboard bleKeyboard;
void rotary_onButtonClick()
{
  static unsigned long lastTimePressed = 0;
  if (millis() - lastTimePressed < 50)
    return; //ignore multiple press in that time milliseconds
  lastTimePressed = millis();
  //rotaryEncoder.reset();
  //rotaryEncoder.disable();
  /*rotaryEncoder.setBoundaries(-test_limits, test_limits, false);
  test_limits *= 2;*/
  Serial.print("button pressed at ");
  Serial.println(millis());
  bleKeyboard.write('c');
}
int go =0;
void rotary_loop()
{
  //lets see if anything changed
  int16_t encoderDelta = rotaryEncoder.encoderChanged();

  //optionally we can ignore whenever there is no change
  if (encoderDelta == 0)
    //go =0;
    return;
    
  //for some cases we only want to know if value is increased or decreased (typically for menu items)
  if (allowrot ==1){
      if (encoderDelta > 0){
      if(encoderDelta > 500){
        Serial.print("+big");
        bleKeyboard.write('e');
      }else{
        Serial.print("+");
      bleKeyboard.write('d');
      //go =1;
      }
      
    }else if (encoderDelta < 0){
      if(encoderDelta < -500){
        Serial.print("-big");
        bleKeyboard.write('d');
      }else{
        Serial.print("-");
        bleKeyboard.write('e');
      }
      
      //go =-1;
    }
      
  }
  

  //for other cases we want to know what is current value. Additionally often we only want if something changed
  //example: when using rotary encoder to set termostat temperature, or sound volume etc

  //if value is changed compared to our last read
  if (encoderDelta != 0)
  {
    //if(go != 0){
      //if(go ==1){
        //bleKeyboard.write('e');
        //Serial.print("go: ");
    //Serial.println(go);
        //go=0;
      //}else if(go ==-1){
        //bleKeyboard.write('d');
        //Serial.print("go: ");
    //Serial.println(go);
        //go=0;
      //}
      //now we need current value
    int16_t encoderValue = rotaryEncoder.readEncoder();
    //process new value. Here is simple output.
    Serial.print("Value: ");
    Serial.println(encoderValue);
    //encoderDelta=500;
    //}
    Serial.print("Deelta: ");
    Serial.println(encoderDelta);
    //encoderValue=500;
  }
}
void setup() {

  Serial.begin(115200);
  Serial.println("Starting BLE work!");
  bleKeyboard.begin();
  //we must initialize rotary encoder
  rotaryEncoder.begin();

  rotaryEncoder.setup(
    [] { rotaryEncoder.readEncoder_ISR(); },
    [] { rotary_onButtonClick(); });
  //optionally we can set boundaries and if values should cycle or not
  bool circleValues = true;
  rotaryEncoder.setBoundaries(0, 1000, circleValues); //minValue, maxValue, circleValues true|false (when max go to min and vice versa)

  /*Rotary acceleration introduced 25.2.2021.
   * in case range to select is huge, for example - select a value between 0 and 1000 and we want 785
   * without accelerateion you need long time to get to that number
   * Using acceleration, faster you turn, faster will the value raise.
   * For fine tuning slow down.
   */
  //rotaryEncoder.disableAcceleration(); //acceleration is now enabled by default - disable if you dont need it
  rotaryEncoder.setAcceleration(0); //250or set the value - larger number = more accelearation; 0 or 1 means disabled acceleration
}
int first =0;
int center=0;

void loop() {
  if(bleKeyboard.isConnected()) {
    if (first <4){
      first+=1;
      center=analogRead(joi);
      Serial.print("CENTER");
      Serial.println(center);
    }
    
    int joival = analogRead(joi);
    //Serial.print("joi");
    //Serial.println((analogRead(joi)));
  if(joival-center > 200){
    allowrot=0;
  //if(joival > 1900){
    if(joival < 3000){
      Serial.print("JoiValue: ");
      Serial.println(joival);
      bleKeyboard.write('a');
    }
  }else if(joival-center < -200){
    allowrot=0;
  //} else if (joival<1000){
    if(joival > 0){
      Serial.print("JoiValue: ");
      Serial.println(joival);
      bleKeyboard.write('b');
    }
  }else{
    if(allowrot==0){
      allowrot=1;
      Serial.print("no");
    }
    
  }
  //in loop call your custom function which will process rotary encoder values
  rotary_loop();

  delay(50);
  if (millis() > 20000)
    rotaryEncoder.enable();
  }

}
