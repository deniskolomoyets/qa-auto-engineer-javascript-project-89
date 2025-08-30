const steps = [
  {
    id: 'welcome',
    messages: ['Привет! Я тестовый бот.'],
    buttons: [{ text: 'Начать', nextStepId: 'done', type: 'button' }],
  },
  {
    id: 'done',
    messages: ['Готово!'],
    buttons: [],
  },
];

export default steps;
