import { Global, Module } from '@nestjs/common'
import { TasksService } from 'src/tasks/tasks.service'
import { UsersModule } from 'src/users/users.module'

@Global()
@Module({
    imports: [UsersModule],
    providers: [TasksService],
    exports: [TasksService],
})
export class TaskModule {}
