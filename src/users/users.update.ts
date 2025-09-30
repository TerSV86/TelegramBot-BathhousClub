import { Get, Post, Body, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import {
    Action,
    Ctx,
    Hears,
    InjectBot,
    On,
    Start,
    Update,
} from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'
import { button } from '../buttons/app.buttons'

@Update()
export class UsersUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly usersService: UsersService,
    ) {}

    @Start()
    async startBot(@Ctx() ctx: Context) {
        console.log('start')
        if ('chat' in ctx) {
            const user = ctx.chat as unknown as CreateUserDto
            await this.bot.telegram.sendMessage(
                user.id,
                `Здорово что ты участвуешь в опросах. Опросы будут приходить в этот чат каждый Пн., Вт., Пт., Сб в 21:00`,
            )
            this.usersService.updateUserIsActive(user.id)
        }
    }

    @On('new_chat_members')
    async onNewChatMembers(@Ctx() ctx: Context) {
        console.log('new');
        
        // если в апдейте есть новые участники
        if (ctx.message && 'new_chat_members' in ctx.message) {
            const arrNewMember = ctx.message.new_chat_members as unknown as [
                CreateUserDto & {
                    is_bot?: boolean
                },
            ]
            arrNewMember.forEach(async (newMember) => {
                if (newMember.is_bot) return ctx.banChatMember(+newMember.id) // ботов кикаем

                this.usersService.create(newMember as CreateUserDto)
                await ctx.reply(
                    `${newMember.first_name} добро пожаловать в BathhousClub. Для участия в опросах нажми кнопку "Старт"`,
                    button(),
                )
            })

            await ctx.reply('Добро пожаловать!')
        }
    }

    @On('left_chat_member')
    async onLeftChatMember(@Ctx() ctx: Context) {
        console.log('left')
        if (ctx.message && 'left_chat_member' in ctx.message) {
            const leftMember = ctx.message
                .left_chat_member as unknown as CreateUserDto & {
                is_bot: true
            }
            if (leftMember.is_bot) return
            // Сюда написать логику удаления пользователя из бд
            this.usersService.remove(leftMember.id)
            await ctx.reply('Нам будет тебя не хватать')
        }
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

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }
}
