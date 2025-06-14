import cv2
from ultralytics import YOLO
from collections import defaultdict
import time
import serial

# === Inisialisasi Serial ke Arduino ===
arduino = serial.Serial('COM4', 9600)  # Ganti dengan COM port kamu
time.sleep(2)  # Tunggu koneksi serial stabil

# === Kirim perintah RESET ke Arduino ===
arduino.write(b'reset\n')
print("🌀 Reset perintah terkirim ke Arduino...")

# Load model
model = YOLO(r"C:\Users\Yoel\Documents\5term\BootcampDBS\CapstoneProject\Workspace\deployModel\model\best_own_dataset.pt")
target_classes = ["organic", "inorganic"]
class_list = model.names

cap = cv2.VideoCapture(0)
frame_width, frame_height = 640, 480
cap.set(cv2.CAP_PROP_FRAME_WIDTH, frame_width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, frame_height)

counts = defaultdict(int)
last_seen = {}
counted_ids = set()
TIMEOUT = 5.0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    now = time.time()
    results = model.track(frame, persist=True)

    if results and results[0].boxes.id is not None:
        boxes = results[0].boxes.xyxy.cpu()
        ids = results[0].boxes.id.int().cpu().tolist()
        classes = results[0].boxes.cls.int().cpu().tolist()

        for box, obj_id, cls_id in zip(boxes, ids, classes):
            label = class_list[cls_id]
            if label not in target_classes:
                continue

            last_seen[obj_id] = (now, label)

            if obj_id not in counted_ids:
                has_active_object = False
                for seen_id, (seen_time, seen_label) in list(last_seen.items()):
                    if seen_label == label and now - seen_time < TIMEOUT and seen_id != obj_id:
                        has_active_object = True
                        break

                if not has_active_object:
                    counted_ids.add(obj_id)
                    counts[label] += 1
                    print(f"ID {obj_id} ({label}) dihitung. Total: {counts[label]}")

                    # === Kirim label ke Arduino ===
                    arduino.write((label + '\n').encode())
                    print(f"📤 Terkirim ke Arduino: {label}")

            x1, y1, x2, y2 = map(int, box)
            cx = (x1 + x2) // 2
            cy = (y1 + y2) // 2
            cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 255, 0), 2)
            cv2.putText(frame, f"{label} ID:{obj_id}", (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 1)
            cv2.circle(frame, (cx, cy), 4, (0, 0, 255), -1)

    expired_ids = [obj_id for obj_id, (t, _) in last_seen.items() if now - t > TIMEOUT]
    for obj_id in expired_ids:
        last_seen.pop(obj_id, None)
        counted_ids.discard(obj_id)

    # Tampilkan Counter
    cv2.putText(frame, f"Organic: {counts['organic']}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
    cv2.putText(frame, f"Inorganic: {counts['inorganic']}", (10, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 255), 2)

    cv2.imshow("Object Count + Arduino Sync", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
arduino.close()
print("✅ Sistem deteksi & komunikasi ke Arduino selesai.")
