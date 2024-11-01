import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  async analyzeEmotion(@UploadedFile() file: Express.Multer.File) {
    try {
      const pyResult = await this.aiService.analyzeEmotion(file.filename);
      const faResult = await this.aiService.analyzeEmotionWithFaceApi(file);
      console.log('1:', pyResult);
      console.log('2:', faResult);

      type EmotionScores = {
        neutral: number;
        happy: number;
        sad: number;
        surprised: number;
        angry: number;
      };

      const emotions: (keyof EmotionScores)[] = [
        'neutral',
        'happy',
        'sad',
        'surprised',
        'angry',
      ];

      const offset = {
        neutral: 0,
        happy: 0,
        sad: 0,
        surprised: 0,
        angry: 0,
      };

      if (faResult) {
        const sum_exp = emotions.reduce(
          (sum, emotion) => sum + Math.exp(faResult[emotion]),
          0,
        );

        emotions.forEach((emotion) => {
          offset[emotion] = Math.exp(faResult[emotion]) / sum_exp;
        });
      }

      const result: EmotionScores = emotions.reduce(
        (acc, emotion) => {
          acc[emotion] = (pyResult[emotion] || 0) + (offset[emotion] || 0);
          return acc;
        },
        { neutral: 0, happy: 0, sad: 0, surprised: 0, angry: 0 },
      );

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
