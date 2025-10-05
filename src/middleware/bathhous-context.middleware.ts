import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { BathhousContext } from 'src/types/bathhous-context.inteface'
import { getBathhousDay } from 'src/utilits/get-bathhousday.utils'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class BathhousContextMiddlewaer {
    constructor(private schedulerRegistry: SchedulerRegistry) {}
    getMiddleware(): MiddlewareFn<BathhousContext> {
        const jobs = this.schedulerRegistry.getCronJobs()
        console.log('🟡 Все доступные cron-задачи:', [...jobs.keys()])
        return async (ctx: Context, next) => {
            if ('callback_query' in ctx.update) {
                const user = ctx.update.callback_query.from
                const date = getBathhousDay()
                const bathhous = {
                    userId: user.id.toString(),
                    date,
                    is_Active: true,
                }
                if (
                    'data' in ctx.update.callback_query &&
                    'on' === ctx.update.callback_query.data
                ) {
                    const task = this.schedulerRegistry.getCronJob(
                        bathhous.userId,
                    )
                    task.stop()
                }
                console.log('Bathous', ctx.update)
                Object.assign(ctx.state, bathhous) // ctx.state = bathhous выкидывает ошибку: ctx.state защищен от записи
                const jobs = this.schedulerRegistry.getCronJobs()
                console.log('🟡 Все доступные cron-задачи:', [...jobs.keys()])
                const task = await this.schedulerRegistry.getCronJob(
                    bathhous.userId,
                )
                task.stop()
                await next()
            } else {
                await next()
            }
        }
    }
}
