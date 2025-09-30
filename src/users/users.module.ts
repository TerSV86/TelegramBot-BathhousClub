import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersUpdate } from './users.update'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersUpdate],
    exports: [UsersService],
})
export class UsersModule {}
