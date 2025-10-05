import { Injectable } from '@nestjs/common'
import { UserJoinContext } from 'src/types/user-join-context.interface'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class UserJoinMiddleware {
    getMiddleware(): MiddlewareFn<UserJoinContext> {
        return async (ctx: Context, next) => {
            if (ctx.chat) {
                const userId = ctx.chat.id
                const strUserId = userId.toString()
                ctx.state.user = strUserId
                next()
            } else {
                next()
            }
        }
    }
}
