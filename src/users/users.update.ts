import { Get, Post, Body, Patch, Param, Delete, Header } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
    Action,
    Command,
    Ctx,
    Hears,
    InjectBot,
    On,
    Start,
    Update,
} from 'nestjs-telegraf'
import { Context, Markup, Telegraf } from 'telegraf'
import { actionButtons, button } from '../buttons/app.buttons'

@Update()
export class UsersUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly usersService: UsersService,
    ) {}

    @On('new_chat_members')
    async onNewChatMembers(@Ctx() ctx: Context) {
        // если в апдейте есть новые участники
        if ('new_chat_members' in ctx.message) {
            const arrNewMember = ctx.message.new_chat_members as [
                CreateUserDto & {
                    is_bot?: boolean
                },
            ]
            arrNewMember.forEach(async (newMember) => {
                if (newMember.is_bot) return ctx.banChatMember(newMember.id) // ботов кикаем

                this.usersService.create(newMember as CreateUserDto)
                await ctx.reply(
                    `${newMember.first_name} добро пожаловать в BathhousClub. Для участия в опросах нажми кнопку "Старт"`,
                    button(),
                )
                await ctx.telegram.sendMessage(
                    newMember.id,
                    `Привет, ${newMember.first_name}! Для участия в опросах нажми кнопку "Старт"`,
                    // {
                    //     reply_markup: Markup.inlineKeyboard([
                    //         [
                    //             Markup.button.url(
                    //                 'Старт',
                    //                 'https://t.me/BathHousTRG_Bot?start',
                    //             ),
                    //         ],
                    //     ]),
                    // },
                )
            })

            await ctx.reply('Добро пожаловать!')
        }
    }

    @On('left_chat_member')
    async onLeftChatMember(@Ctx() ctx: Context) {
        console.log('left')
        if ('left_chat_member' in ctx.message) {
            const leftMember = ctx.message.left_chat_member as CreateUserDto & {
                is_bot: true
            }
            if (leftMember.is_bot) return
            // Сюда написать логику удаления пользователя из бд
            this.usersService.remove(leftMember.id)
            await ctx.reply('Нам будет тебя не хватать')
        }
    }

    @Action('Yes')
    async openChat(ctx: Context) {
        await ctx.reply('Yes Yes')
    }

    @Hears('Старт')
    async messageStart(@Ctx() ctx: Context) {
        await ctx.reply('/start')
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }
}
