// welcome отсутствует — виджет не должен падать
export const stepsNoWelcome = [
  { id: 'first', type: 'text', message: 'Я без welcome', buttons: [] },
];

// welcome есть, но пустой текст — и КНОПОК НЕТ, но укажем пустой массив
export const stepsEmptyWelcome = [
  { id: 'welcome', type: 'text', message: '', buttons: [] },
];

// кнопка ведёт на несуществующий шаг
export const stepsBrokenNext = [
  {
    id: 'welcome',
    type: 'text',
    message: 'Старт',
    buttons: [{ text: 'Дальше', next: 'missing' }],
  },
];

// очень длинное сообщение
export const stepsLongMessage = [
  {
    id: 'welcome',
    type: 'text',
    message: 'Очень длинное сообщение '.repeat(200),
    buttons: [],
  },
];

// welcome «без кнопок», но чтобы не падало — явно buttons: []
export const stepsNoButtons = [
  {
    id: 'welcome',
    type: 'text',
    message: 'Стартовый шаг без кнопок',
    buttons: [],
  },
];
