import { Injectable } from '@nestjs/common'
import { Context, MiddlewareFn } from 'telegraf'

type TNewChatMember = {
    id: number
    is_bot: boolean
    first_name: string
    last_name: string
    is_Active: boolean
    language_code: string
}

@Injectable()
export class AddIsActiveMiddleware {
    getMiddleware(): MiddlewareFn<Context> {
        return async (ctx: Context, next) => {
            let count: number = 0
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            count++
            console.log('middle', count, ctx.message)
            if ('new_chat_members' in ctx.message) {
                ctx.message.new_chat_members.map(
                    (ncm) => ((ncm as TNewChatMember).is_Active = false),
                )
                console.log('Middleware сработало, ctx.isActive:', ctx.message)
                await next()
            } else {
                await next() // Внимание!!! Если не перезать, то update дальше не идет. ВСЕ ПЕРЕСТАЕТ РАБОТАТЬ.
            }
        }
    }
}
