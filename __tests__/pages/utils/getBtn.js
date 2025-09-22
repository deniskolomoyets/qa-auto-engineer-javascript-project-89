import { screen } from '@testing-library/react';

async function getBtn(button) {
  return screen.getByRole('button', { name: button.name });
}

export default getBtn;
