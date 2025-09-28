import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { Context, Markup, Telegraf } from 'telegraf';

@Injectable()
export class BotActionsService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly usersService: UsersService,
  ) {}

  async handleYes(ctx: Context) {
    const botInfo = await this.bot.telegram.getMe();
    const botUsername = botInfo.username;
    const link = `https://t.me/${botUsername}?start=conset`;
    const keyboard = Markup.inlineKeyboard([
      Markup.button.url('Открыть чат с ботом', link),
    ]);
    await ctx.reply(`Вы выбрали Да`, { reply_markup: keyboard.reply_markup });
  }

  async handleNo(ctx: Context) {
    await ctx.reply('Вы выбрали Нет');
  }

  async hendleUndecided(ctx: Context) {
    await ctx.reply('Вы еще не определились');
  }
}
