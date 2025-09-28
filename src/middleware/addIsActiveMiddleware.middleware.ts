import { Injectable } from '@nestjs/common';
import { Context, MiddlewareFn } from 'telegraf';

type TNewChatMember = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  is_Active: boolean;
  language_code: string;
};

@Injectable()
export class AddIsActiveMiddleware {
  getMiddleware(): MiddlewareFn<Context> {
    return async (ctx: Context, next) => {
      if ('new_chat_member' in ctx.message) {
        (ctx.message.new_chat_member as TNewChatMember).is_Active = false;
      }
      console.log('Middleware сработало, ctx.isActive:', ctx.message);
      await next();
    };
  }
}
