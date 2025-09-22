function convertKeyToLabel(key) {
  const labels = {
    email: 'Email',
    password: 'Пароль',
    address: 'Адрес',
    city: 'Город',
    country: 'Страна',
    rulesCheckBox: 'Принять правила',
  }
  return labels[key]
}

export default convertKeyToLabel
