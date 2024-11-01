import sys
from openvino.runtime import Core
import cv2
import numpy as np
import base64

# Set OpenVINO
ie = Core()
model_path = "models/High/emotions-03.xml"
model = ie.read_model(model=model_path)
compiled_model = ie.compile_model(model=model, device_name="CPU")

# output_layer
output_layer = compiled_model.output(0)

# targets
emotion_labels = ["neutral", "happy", "sad", "surprised", "angry"]

# OpenCV Haar Cascade - face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def analyze_emotion(image_name):
    image = cv2.imread("../backend/uploads/" + image_name)

    # 그레이스케일 변환 얼굴 검출 성능 향상...
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # face detection
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    if len(faces) > 0:
        (x, y, w, h) = faces[0]
        face = image[y:y+h, x:x+w]

        # model size cut
        face_resized = cv2.resize(face, (64, 64))

        # 이미지 차원 변환 (HWC -> CHW)
        face_transposed = face_resized.transpose(2, 0, 1)  # (H, W, C) -> (C, H, W)

        # batch add (1, C, H, W)
        face_input = np.expand_dims(face_transposed, axis=0)

        # (1, 3, 64, 64) check ONLY FOR DEVS
        # print("입력 배열 형태:", face_input.shape)

        # OpenVINO 모델 추론
        result = compiled_model([face_input])[output_layer].squeeze()
        # emotion = emotion_labels[np.argmax(result)]

        # 각 감정별 계산
        emotion_values = np.exp(result) / np.sum(np.exp(result))  # softmax

        # 결과 format
        result = '{'
        for i, (emotion, value) in enumerate(zip(emotion_labels, emotion_values)):
            result += f"\"{emotion}\": {value:.2f}"
            if i == len(emotion_labels) - 1:
                result += '}'
            else:
                result += ','

        # 결과 출력
        return result
    else:
        sys.stderr.write("No face detected.")
        sys.exit(1)

if __name__ == "__main__":
    image_name = sys.argv[1]
    print(analyze_emotion(image_name))
