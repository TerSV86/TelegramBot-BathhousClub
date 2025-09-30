import { Module } from '@nestjs/common'
import { BathhousService } from './bathhous.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bathhous } from './entities/bathhous.entity'
import { BathhousUpdate } from './bathhous.update'

@Module({
    imports: [TypeOrmModule.forFeature([Bathhous])],
    providers: [BathhousService, BathhousUpdate],
    exports: [BathhousService],
})
export class BathhousModule {}
