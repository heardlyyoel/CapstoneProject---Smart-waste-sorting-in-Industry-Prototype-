#include <Servo.h>

Servo myServo;
int centerPos = 86;
const int irPin = 4;

String lastDetectedLabel = "";

void setup() {
  myServo.attach(9);
  myServo.write(centerPos);
  pinMode(irPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  // Baca perintah dari Python
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    input.trim();

    // === Tangani perintah RESET ===
    if (input.equalsIgnoreCase("reset")) {
      lastDetectedLabel = "";
      Serial.println("🔄 Label direset");
    } else if (input.equalsIgnoreCase("organic") || input.equalsIgnoreCase("inorganic")) {
      lastDetectedLabel = input;
      Serial.print("Diterima: ");
      Serial.println(lastDetectedLabel);
    }
  }

  // Jika ada label & IR aktif, jalankan servo
  if (lastDetectedLabel != "" && digitalRead(irPin) == LOW) {
    if (lastDetectedLabel.equalsIgnoreCase("organic")) {
      myServo.write(105); delay(200);
      myServo.write(50); delay(120);
    } else if (lastDetectedLabel.equalsIgnoreCase("inorganic")) {
      myServo.write(64); delay(200);
      myServo.write(120); delay(120);
    }

    delay(300);
    myServo.write(centerPos);
    delay(150);
    lastDetectedLabel = "";
  }
}
