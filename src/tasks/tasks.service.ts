import { Injectable } from '@nestjs/common'
import { Cron, SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import { InjectBot } from 'nestjs-telegraf'
import { actionButtons } from 'src/buttons/app.buttons'
import { taskTime, testTime } from 'src/data/constants'
import { UsersService } from 'src/users/users.service'
import { getBathhousDay } from 'src/utilits/get-bathhousday.utils'
import { Context, Telegraf } from 'telegraf'

@Injectable()
export class TasksService {
    logger: any
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly usersService: UsersService,
        private schedulerRegistry: SchedulerRegistry,
    ) { }

    // '* * * * * *'
    // "10 * * * * *"
    // '0 21 * * 1,3,5,6'
    // '0 21 * * 7'
    @Cron('10 * * * * *')
    async handleCron() {
        // ответ: [ User { id: '688398003' }, User { id: '99033192' } ]
        const arrUserId = await this.usersService.findAllUserIds()
        console.log('task', arrUserId)
        if (!arrUserId) return
        const tasks = this.schedulerRegistry.getCronJobs()
        console.log('task', tasks)
        arrUserId.forEach(async (user) => {
            const userId = user.id.toString()
            if (!tasks.has(userId)) {
                this.addCronJob(userId, testTime)
            }
        })
        console.log('reboot')
    }

    async addCronJob(name: string, time: string) {
        const task = new CronJob(`${time}`, async () => {
            const user = await this.usersService.findUser(name)
            if (!user) return
            const bathhousDay = getBathhousDay()
            if (user.is_Active) {
                await this.bot.telegram.sendMessage(
                    user.id,
                    `Ты пойдешь в баню ${bathhousDay}`,
                    actionButtons(),
                )
            }
        })

        this.schedulerRegistry.addCronJob(name, task)
        task.start()
        console.log('Task')
    }
}
