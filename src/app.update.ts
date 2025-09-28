import { AppService } from './app.service';
import { Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { actionButtons } from './app.buttons';
import { log } from 'console';
import { login } from 'telegraf/typings/button';

//Следит за нашими обновлениями
//Будут хранится запросы к БД

@Update()
export class AppUpdate {
  constructor(
    //Инжектим бота, чтобы им было удобно пользоваться
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

 /*  @Start()
  async startCommand(ctx: Context) {
    console.log('app.update');
    await ctx.reply('Hi! Friend');
    await ctx.reply('Пойдешь в баню DATE', actionButtons());
  } */

  // @On('text')
  // async onText(ctx: Context) {
  //   console.log('Update @On', ctx.chat);
  // }

  //Сохраняем новых пользователей в БД
  // @On('message')
  // async onMessage(@Ctx() ctx: Context) {
  //   await ctx.reply(
  //     'Для участия в опросах необходимо твое согласие на открытие диалога с ботом',
  //     actionButtons(),
  //   );
  //   // если в апдейте есть новые участники
  //   if ('new_chat_members' in ctx.message) {
  //     console.log('Новые участники:', ctx.message.new_chat_members);
  //     // Нужно учесть полу isBot: true. Ботов в БД не сохраняем. Возможно стоит сразу кикать
  //     await ctx.reply('Добро пожаловать!');
  //   }
  // }

  // @Action('yes')
  // async getAll(ctx: Context) {
  //   await ctx.reply('Yes, Yes');
  //   console.log(await ctx.answerCbQuery('Мы будем тебя ждать'));
  //   await ctx.answerCbQuery('Мы будем тебя ждать'); // уберает часики с кнопки. Можно показать уведомление await ctx.answerCbQuery("");
  // }
}
