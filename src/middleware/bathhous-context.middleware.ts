import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { BathhousContext } from 'src/types/bathhous-context.inteface'
import { getBathhousDay } from 'src/utilits/get-bathhousday.utils'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class BathhousContextMiddlewaer {
    constructor(private schedulerRegistry: SchedulerRegistry) { }
    getMiddleware(): MiddlewareFn<BathhousContext> {
        const jobs = this.schedulerRegistry.getCronJobs()
        console.log('🟡 Все доступные cron-задачи:', [...jobs.keys()])
        return async (ctx: Context, next) => {
            if ('callback_query' in ctx.update) {
                const user = ctx.update.callback_query.from
                const date = getBathhousDay()
                if ('text' in ctx.callbackQuery.message) {
                    const textMessage = ctx.callbackQuery.message?.text
                        .split(' ')
                        .slice(-1)
                    const [day, month, year] = textMessage[0].split('.')
                    const dateTextMessage = new Date(`${year}-${month}-${day}`)
                    const today = new Date()
                    console.log('dateMessage', today > dateTextMessage)
                    if (today > dateTextMessage) return // просроченные вопросы надо удалять, что бы не отслеживать в будущем ответы на неактуальные вопросы
                }

                const bathhous = {
                    userId: user.id.toString(),
                    date,
                    is_Active: true,
                }
                console.log('middle yes', ctx.update)

                Object.assign(ctx.state, bathhous) // ctx.state = bathhous выкидывает ошибку: ctx.state защищен от записи
                await next()
            } else {
                await next()
            }
        }
    }
}
