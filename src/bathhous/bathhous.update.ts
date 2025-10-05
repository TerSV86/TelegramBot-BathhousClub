import { Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { BathhousService } from './bathhous.service'
import { UpdateBathhousDto } from './dto/update-bathhous.dto'
import { Action, Ctx, InjectBot, Update } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'
import { Update as UpdateContext } from 'telegraf/typings/core/types/typegram'
import { getBathhousDay } from 'src/utilits/get-bathhousday.utils'
import { SchedulerRegistry } from '@nestjs/schedule'
import { BathhousContext } from 'src/types/bathhous-context.inteface'

@Update()
export class BathhousUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly bathhousService: BathhousService,
        private schedulerRegistry: SchedulerRegistry,
    ) { }

    @Action('yes')
    async yesAction(@Ctx() ctx: BathhousContext) {
        const bathhous = ctx.state
        await ctx.answerCbQuery('Мы будем рады тебя видеть')
        this.bathhousService.create(bathhous)
    }

    @Action('no')
    @Action('undecided')
    async noAction(@Ctx() ctx: BathhousContext) {
        const bathhous = ctx.state
        return this.bathhousService.create(bathhous)
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
