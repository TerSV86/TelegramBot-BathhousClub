import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons } from 'src/app.buttons';
import { AppService } from 'src/app.service';

@Update()
export class BotUpdate {
  constructor(
    //Инжектим бота, чтобы им было удобно пользоваться
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    // console.log('bot.update');
    const bot = await this.bot.telegram.getMe();
    // console.log('bot.update', bot);
    await ctx.reply('Hi! Friend');
    await ctx.reply('Пойдешь в баню DATE', actionButtons());
  }
}
