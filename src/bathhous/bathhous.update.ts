import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BathhousService } from './bathhous.service'
import { CreateBathhousDto } from './dto/create-bathhous.dto'
import { UpdateBathhousDto } from './dto/update-bathhous.dto'
import { Action, Ctx, InjectBot, Update } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { Update as UpdateContext } from 'telegraf/typings/core/types/typegram'
import { getBathhousDay } from 'src/utilits/get-bathhousday.utils'

@Update()
export class BathhousUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly bathhousService: BathhousService,
    ) { }

    @Action('yes')
    async yesAction(@Ctx() ctx: Context) {
        if ('callback_query' in ctx.update) {
            const user = (ctx.update as UpdateContext.CallbackQueryUpdate)
                .callback_query.from
            const date = getBathhousDay()
            const bathhous = {
                userId: String(user.id),
                date,
                is_Active: true,
            }
            console.log(bathhous)
            return this.bathhousService.create(bathhous)
        }
    }

    @Action('no')
    @Action('undecided')
    async noAction(@Ctx() ctx: Context) {
        if ('callback_query' in ctx.update) {
            const user = (ctx.update as UpdateContext.CallbackQueryUpdate)
                .callback_query.from
            const date = getBathhousDay()
            const bathhous = {
                userId: String(user.id),
                date,
                is_Active: false,
            }
            return this.bathhousService.create(bathhous)
        }
    }

    @Get()
    findAll() {
        return this.bathhousService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bathhousService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBathhousDto: UpdateBathhousDto,
    ) {
        return this.bathhousService.update(+id, updateBathhousDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bathhousService.remove(+id)
    }
}
