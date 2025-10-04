import { Injectable } from '@nestjs/common'
import { MyContext } from 'src/types/MyContext'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class CreateStateInitUserCtx {
    getMiddleware(): MiddlewareFn<MyContext> {
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
