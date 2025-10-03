import { Injectable } from '@nestjs/common'
import { MyContext } from 'src/types/MyContext'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { Context, MiddlewareFn } from 'telegraf'

@Injectable()
export class AddIsActiveMiddleware {
    getMiddleware(): MiddlewareFn<MyContext> {
        return async (ctx: Context, next) => {
            console.log('middle', ctx)
            if (ctx.message && 'new_chat_members' in ctx.message) {
                const dtos: CreateUserDto[] = ctx.message.new_chat_members.map(
                    (new_chat_member) => ({
                        id: String(new_chat_member.id),
                        is_bot: new_chat_member.is_bot,
                        first_name: new_chat_member.first_name,
                        last_name: new_chat_member.last_name ?? '',
                        is_Active: false,
                    }),
                )
                console.log('Middleware сработало, ctx.isActive:', ctx.message)
                ctx.state.createUserDto = dtos
                await next()
            } else {
                await next() // Внимание!!! Если не передать, то update дальше не идет. ВСЕ ПЕРЕСТАЕТ РАБОТАТЬ.
            }
        }
    }
}
