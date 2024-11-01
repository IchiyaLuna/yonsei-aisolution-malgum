import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('create')
  async createUser(@Body('name') name: string): Promise<User> {
    // FOR DEV ONLY
    return await this.usersService.create({
      username: '세연',
      password: 'yonsei',
    });
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findUserWithCredential(
      username,
      password,
    );

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    return res.status(200).json({ id: user.id });
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.findOne(id);
  }
}
