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
        const bathhous = await this.bathhousRepository.findOne({
            where: {
                userId: createBathhousDto.userId,
                date: createBathhousDto.date,
            },
        })
        console.log('BathhousService', bathhous)
        if (!bathhous) {
            const bathhous = this.bathhousRepository.create({
                ...createBathhousDto,
            })
            const jobs = this.schedulerRegistry.getCronJobs()
            console.log('🟡 Все доступные cron-задачи:', [...jobs.keys()])
            const task = this.schedulerRegistry.getCronJob(bathhous.userId)
            task.stop()
            return this.bathhousRepository.save(bathhous)
        }
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
