import '@tensorflow/tfjs-node';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
// import * as faceapi from 'face-api.js';
import * as faceapi from '@vladmandic/face-api';

import { spawn } from 'child_process';
import * as canvas from 'canvas';

const pythonPath = path.resolve(__dirname, '../../../backend-openvino');

@Injectable()
export class AiService {
  analyzeEmotion(imageName: string): Promise<{
    neutral: number;
    happy: number;
    sad: number;
    surprised: number;
    angry: number;
  }> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn(
        `Scripts/python.exe`,
        ['emotion_recognition.py', imageName],
        {
          cwd: pythonPath,
        },
      );

      let result = '';
      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error('Error2:', data.toString());
        reject(new Error(`Python process error: ${data.toString()}`));
      });

      pythonProcess.on('close', (code) => {
        if (code == 0) {
          resolve(JSON.parse(result));
        }
      });
    });
  }

  async analyzeEmotionWithFaceApi(image: Express.Multer.File) {
    // face-api 환경 설정
    const { Canvas, Image, ImageData } = canvas;

    faceapi.env.monkeyPatch({
      Canvas,
      Image,
      ImageData,
    } as any);

    // 모델 로드
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    await faceapi.nets.faceExpressionNet.loadFromDisk('./models');

    console.log('f', image);
    // 이미지를 로드하고 감정을 인식
    const img = await canvas.loadImage(image.path);
    const detections = await faceapi
      .detectSingleFace(
        img as any,
        new faceapi.SsdMobilenetv1Options({ minConfidence: 0.2 }),
      )
      .withFaceExpressions();

    if (detections) return detections.expressions;
    else return undefined;
  }
}
