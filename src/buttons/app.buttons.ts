import { Markup } from 'telegraf'
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram'

export function actionButtons(): Markup.Markup<InlineKeyboardMarkup> {
    return Markup.inlineKeyboard(
        [
            Markup.button.callback('Да', 'yes'),
            Markup.button.callback('Нет', 'no'),
            Markup.button.callback('Не определился', 'undecided'),
        ],
        {
            columns: 2,
        },
    )
}

export function button(): Markup.Markup<InlineKeyboardMarkup> {
    return Markup.inlineKeyboard([
        [Markup.button.url('Старт', 'https://t.me/BathHousTRG_Bot?start')],
    ])
}

// export function button(): any {
//     return Markup.keyboard([['Старт']])
//         .oneTime()
//         .resize()
//         .selective()
// }
