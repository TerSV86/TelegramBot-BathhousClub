import { Injectable } from '@nestjs/common'
import { MyContext } from 'src/types/MyContext'
import { User } from 'src/types/User'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class CreateStateUsersInCtxMiddleware {
    getMiddleware(): MiddlewareFn<MyContext> {
        return async (ctx: Context, next) => {
            console.log('middle', ctx)
            if (ctx.message && 'new_chat_members' in ctx.message) {
                const users: User[] = ctx.message.new_chat_members.map(
                    (new_chat_member) => ({
                        id: String(new_chat_member.id),
                        is_bot: new_chat_member.is_bot,
                        first_name: new_chat_member.first_name,
                        last_name: new_chat_member.last_name ?? '',
                        is_Active: false,
                    }),
                )
                console.log(
                    'Middleware сработало, ctx.isActive:',
                    ctx.message,
                    users,
                )
                ctx.state.users = users
                await next()
            } else {
                await next() // Внимание!!! Если не передать, то update дальше не идет. ВСЕ ПЕРЕСТАЕТ РАБОТАТЬ.
            }
        }
    }
}
