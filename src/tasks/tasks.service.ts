import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron } from '@nestjs/schedule'
import { InjectBot } from 'nestjs-telegraf'
import { actionButtons } from 'src/buttons/app.buttons'
import { UsersService } from 'src/users/users.service'
import { Context, Telegraf } from 'telegraf'

@Injectable()
export class TasksService {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private configService: ConfigService,
        private readonly usersService: UsersService,
    ) {}

    // '* * * * * *'
    // '0 21 * * 1,3,5,6'
    @Cron('0 21 * * 1,3,5,6')
    async handleCron() {
        // ответ: [ User { id: '688398003' }, User { id: '99033192' } ]
        const arrUserId = await this.usersService.findAllUserIds()
        arrUserId.forEach(async (user) => {
            await this.bot.telegram.sendMessage(
                user.id,
                'Нужна функция для определения даты',
                actionButtons(),
            )
        })
    }
}

