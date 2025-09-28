import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { id } = createUserDto;
    const existingId = await this.userRepository.findOne({
      where: { id },
    });
    const user = await this.userRepository.create({ ...createUserDto });
    if (!existingId) {
      return this.userRepository.save(user);
    } else {
      throw new HttpException('Пользователь с таким id уже существует', 409);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const existingId = await this.userRepository.findOne({
      where: { id },
    });
    if (existingId) {
      return this.userRepository.remove(existingId);
    }
  }
}
