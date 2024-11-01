import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(new_user: DeepPartial<User>): Promise<User> {
    const user = this.usersRepository.create(new_user);
    return await this.usersRepository.save(user);
  }

  async findUserWithCredential(
    username: string,
    password: string,
  ): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username, password });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
