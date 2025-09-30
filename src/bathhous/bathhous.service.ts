import { Injectable } from '@nestjs/common'
import { CreateBathhousDto } from './dto/create-bathhous.dto'
import { UpdateBathhousDto } from './dto/update-bathhous.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Bathhous } from './entities/bathhous.entity'

@Injectable()
export class BathhousService {
    constructor(
        @InjectRepository(Bathhous)
        private readonly bathhousRepository: Repository<Bathhous>,
    ) {}
    create(createBathhousDto: CreateBathhousDto) {
        console.log('BathhousService', createBathhousDto)
        const bathhous = this.bathhousRepository.create({
            ...createBathhousDto,
        })
        return this.bathhousRepository.save(bathhous)
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
