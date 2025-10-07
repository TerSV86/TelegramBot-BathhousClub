import { Injectable } from '@nestjs/common'
import { CreateBathhousDto } from './dto/create-bathhous.dto'
import { UpdateBathhousDto } from './dto/update-bathhous.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Bathhous } from './entities/bathhous.entity'
import { SchedulerRegistry } from '@nestjs/schedule'

@Injectable()
export class BathhousService {
    constructor(
        @InjectRepository(Bathhous)
        private readonly bathhousRepository: Repository<Bathhous>,
        private schedulerRegistry: SchedulerRegistry,
    ) {}
    async create(createBathhousDto: CreateBathhousDto) {
        const existingBathhous = await this.bathhousRepository.findOne({
            where: {
                userId: createBathhousDto.userId,
                date: createBathhousDto.date,
            },
        })
        if (existingBathhous) {
            throw new Error('Пользователь уже дал согласие на участие')
        }

        const newBathhous = this.bathhousRepository.create({
            ...createBathhousDto,
        })

        const jobs = this.schedulerRegistry.getCronJobs()
        console.log('🟡 Все доступные cron-задачи:', [...jobs.keys()])

        try {
            const task = this.schedulerRegistry.getCronJob(newBathhous.userId)
            task.stop()
            return this.bathhousRepository.save(newBathhous)
        } catch (error) {
            console.warn(
                `Cron задача для пользователя ${createBathhousDto.userId} не найдена`,
            )
        }
        return this.bathhousRepository.save(newBathhous)
    }

    findAll() {
        return `This action returns all bathhous`
    }

    findOne(id: number) {
        return `This action returns a #${id} bathhous`
    }

    update(id: number, updateBathhousDto: UpdateBathhousDto) {
        return `This action updates a #${id} bathhous`
    }

    remove(id: number) {
        return `This action removes a #${id} bathhous`
    }
}
