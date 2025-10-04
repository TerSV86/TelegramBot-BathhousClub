import { Context, Markup } from 'telegraf'
import {
    InlineKeyboardMarkup,
    Message,
} from 'telegraf/typings/core/types/typegram'

export function sendMsg(
    ctx: Context,
    msg: string,
    name?: string,
    btn?: () => Markup.Markup<InlineKeyboardMarkup>,
): Promise<Message.TextMessage> {
    name ? name : (name = '')
    return ctx.reply(`${name} ${msg}`, btn ? btn() : null)
}
