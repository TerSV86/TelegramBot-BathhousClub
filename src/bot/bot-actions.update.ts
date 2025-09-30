import { Action, Ctx, Update } from 'nestjs-telegraf'
import { BotActionsService } from './bot.update'
import { Context } from 'telegraf'

@Update()
export class BotActionsUpdate {
    constructor(private readonly actionsService: BotActionsService) {}

   /*  @Action('yes')
    async handleYes(@Ctx() ctx: Context) {
        await this.actionsService.handleYes(ctx)
        await ctx.answerCbQuery('Мы будем рады тебя видеть')
    }

    @Action('no')
    async handleNo(@Ctx() ctx: Context) {
        await this.actionsService.handleNo(ctx)
        await ctx.answerCbQuery('Нам будет очень тебя не хватать')
    }

    @Action('undecided')
    async handleUndecided(@Ctx() ctx: Context) {
        await this.actionsService.hendleUndecided(ctx)
        await ctx.answerCbQuery('Почему ты такой не решительный?')
    } */
}
