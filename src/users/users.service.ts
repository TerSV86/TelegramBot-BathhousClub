import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { id } = createUserDto
        const existingId = await this.userRepository.findOne({
            where: { id },
        })
        const user = await this.userRepository.create({ ...createUserDto })
        if (!existingId) {
            return this.userRepository.save(user)
        }
    }

    findAll() {
        return 'kjlkj'
    }

    findAllUserIds() {
        return this.userRepository.find({ select: ['id'] })
    }

    findUser(id: string) {
        return this.userRepository.findOne({ where: { id } })
    }

    findOne(id: number) {
        return `This action returns a #${id} user`
    }

    async updateUserIsActive(id: string) {
        const user = await this.userRepository.findOne({ where: { id } })
        user.is_Active = !user.is_Active
        return this.userRepository.save(user)
    }

    async remove(id: string) {
        const existingId = await this.userRepository.findOne({
            where: { id },
        })
        if (existingId) {
            return this.userRepository.remove(existingId)
        }
    }
}
