export const emptyMessages = [
  {
    id: 'welcome',
    messages: [],
    buttons: [
      {
        text: 'Начать разговор',
        nextStepId: 'start',
        type: 'button',
      },
      {
        text: 'Открыть Чат',
      },
    ],
  },
  {
    id: 'start',
    messages: [],
    buttons: [
      {
        text: 'Сменить профессию или трудоустроиться',
        nextStepId: 'switch',
        type: 'button',
      },
      {
        text: 'Попробовать себя в IT',
        nextStepId: 'try',
        type: 'button',
      },
      {
        text: 'Я разработчик, хочу углубить свои знания',
        nextStepId: 'advanced',
        type: 'button',
      },
    ],
  },
  {
    id: 'switch',
    messages: [],
    buttons: [
      {
        text: 'Расскажи подробнее',
        nextStepId: 'details',
        type: 'button',
      },
      {
        text: 'А есть что-нибудь попроще',
        nextStepId: 'try',
        type: 'button',
      },
      {
        text: 'Вернуться в начало',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'try',
    messages: [],
    buttons: [
      {
        text: 'Интересно',
        nextStepId: 'details',
        type: 'button',
      },
      {
        text: 'А что по поводу смены профессии?',
        nextStepId: 'switch',
        type: 'button',
      },
      {
        text: 'Вернуться назад',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },

  {
    id: 'details',
    messages: [],
    buttons: [
      {
        text: 'Останусь здесь, запишусь на курс',
        nextStepId: 'subscribe',
        type: 'button',
      },
      {
        text: 'Вернуться в начало',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'advanced',
    messages: [],
    buttons: [
      {
        text: 'Расскажи подробнее',
        nextStepId: 'welcome',
        type: 'button',
      },
      {
        text: 'Верни меня в начало',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'subscribe',
    messages: [],
    buttons: [
      {
        text: 'Останусь здесь, запишусь на курс',
        nextStepId: 'details',
        type: 'button',
      },
      {
        text: 'Верни меня в начало',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
];
