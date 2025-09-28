import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectBot } from 'nestjs-telegraf';
import { actionButtons } from 'src/app.buttons';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TasksService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private configService: ConfigService,
  ) {}

  // '* * * * * *'
  @Cron('0 21 * * 5-6')
  async handleCron() {
    const chatId = this.configService.get<number>('CHATID'); // взял из ctx нужно сохранить в переменную при заходе пользователя
    await this.bot.telegram.sendMessage(
      chatId,
      'Нужна функция для определения даты',
      actionButtons(),
    );
    // console.log('tert');
  }
}
