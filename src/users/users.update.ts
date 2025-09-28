import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Action, Ctx, InjectBot, On, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons } from '../app.buttons';

@Update()
export class UsersUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly usersService: UsersService,
  ) {}

  //Сохраняем новых пользователей в БД

  @On('new_chat_members')
  async onNewChatMembers(@Ctx() ctx: Context) {
    // console.log(ctx.message);
    // если в апдейте есть новые участники
    if ('new_chat_member' in ctx.message) {
      const newMember = ctx.message.new_chat_member as CreateUserDto & {
        is_bot?: boolean;
      };

      if (newMember.is_bot) return ctx.banChatMember(newMember.id);

      this.usersService.create(ctx.message.new_chat_member as CreateUserDto);
      await ctx.reply(
        'Для участия в опросах необходимо твое согласие на открытие чата с ботом',
        actionButtons(),
      );
      // console.log(
      //   'Новые участники из UsersUpdate:',
      //   ctx.message.new_chat_member,
      // );
      // Нужно учесть полу isBot: true. Ботов в БД не сохраняем. Возможно стоит сразу кикать
      await ctx.reply('Добро пожаловать!');
    }
  }

  @On('left_chat_member')
  async onLeftChatMember(@Ctx() ctx: Context) {
    if ('left_chat_member' in ctx.message) {
      const leftMember = ctx.message.left_chat_member as CreateUserDto & {
        is_bot: true;
      };
      if (leftMember.is_bot) return;
      // Сюда написать логику удаления пользователя из бд
      this.usersService.remove(leftMember.id);
      await ctx.reply('Нам будет тебя не хватать');
    }
  }

  @Action('Yes')
  async openChat(ctx: Context) {
    await ctx.reply('Yes Yes');
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
