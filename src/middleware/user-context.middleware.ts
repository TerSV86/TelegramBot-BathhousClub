import { Injectable } from '@nestjs/common'
import { UserContext } from 'src/types/user-context.interface'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class UserContextMiddleware {
    getMiddleware(): MiddlewareFn<UserContext> {
        return async (ctx: Context, next) => {
            console.log('middle', ctx)
            if (ctx.message && 'new_chat_members' in ctx.message) {
                const newChatMember = [...ctx.message.new_chat_members]
                const users = newChatMember.map((new_chat_member) => ({
                    id: String(new_chat_member.id),
                    is_bot: new_chat_member.is_bot,
                    first_name: new_chat_member.first_name,
                    last_name: new_chat_member.last_name ?? '',
                    is_Active: false,
                }))
                ctx.state.users = users
                await next()
            } else {
                await next() // Внимание!!! Если не передать, то update дальше не идет. ВСЕ ПЕРЕСТАЕТ РАБОТАТЬ.
            }
        }
    }
}
