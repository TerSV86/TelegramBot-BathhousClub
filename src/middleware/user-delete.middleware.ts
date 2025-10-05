import { Injectable } from '@nestjs/common'
import { UserContext } from 'src/types/user-context.interface'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class UserDeleteContextMiddleware {
    getMiddleware(): MiddlewareFn<UserContext> {
        return async (ctx: Context, next) => {
            if (ctx.message && 'left_chat_member' in ctx.message) {
                const { id, first_name } = ctx.message.left_chat_member
                const user = { id, first_name }
                ctx.state.user = user
                await next()
            } else {
                await next()
            }
        }
    }
}
