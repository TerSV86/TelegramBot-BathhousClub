import { Get, Post, Body, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Ctx, Hears, InjectBot, On, Start, Update } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'
import { button } from '../buttons/app.buttons'
import { sendMsg } from 'src/utilits/sendMsg.utels'
import { msgCreatUser, msgDeleteUser, msgInitUser } from 'src/data/constants'
import { UserJoinContext } from 'src/types/user-join-context.interface'
import { UserContext } from 'src/types/user-context.interface'
import { UserDeleteContext } from 'src/types/user-delete.interface'

@Update()
export class UsersUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly usersService: UsersService,
    ) { }

    @Start()
    async startBot(@Ctx() ctx: UserJoinContext) {
        await sendMsg(ctx, msgInitUser)
        this.usersService.updateUserIsActive(ctx.state.user)
    }

    @On('new_chat_members')
    async onCreateUsers(@Ctx() ctx: UserContext) {
        // если в апдейте есть новые участники
        if (ctx.state) {
            const arrUsers = ctx.state.users
            arrUsers.forEach(async (user: CreateUserDto) => {
                if (user.is_bot) return ctx.banChatMember(+user.id) // ботов кикаем
                this.usersService.create(user)
                await sendMsg(ctx, msgCreatUser, user.first_name, button)
            })
        }
    }

    @On('left_chat_member')
    async onLeftChatMember(@Ctx() ctx: UserDeleteContext) {
        const id: string = ctx.state.user.id
        this.usersService.remove(id)
        await sendMsg(ctx, msgDeleteUser)
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
