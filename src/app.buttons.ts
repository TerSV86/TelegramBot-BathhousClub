import { Markup } from 'telegraf';

export function actionButtons(): any {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Да', 'yes'),
      Markup.button.callback('Нет', 'no'),
      Markup.button.callback('Не определился', 'undecided'),
    ],
    {
      columns: 2,
    },
  );
}
