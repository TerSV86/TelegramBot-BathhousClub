import { Injectable } from '@nestjs/common'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class CreateStateUserInCtxForDelete {
    getMiddleware(): MiddlewareFn<Context> {
        return async (ctx: Context, next) => {
            if (ctx.message && 'left_chat_member' in ctx.message) {
                const { id, first_name } = ctx.message.left_chat_member
                const user = { id, first_name }
                ctx.state.user = user
                console.log('del middleware', ctx.state.user)

                await next()
            } else {
                await next()
            }
        }
    }
}
