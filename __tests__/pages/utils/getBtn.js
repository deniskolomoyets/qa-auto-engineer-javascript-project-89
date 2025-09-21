import { screen } from '@testing-library/react';

async function getBtn(button) {
  return screen.getByRole('button', button);
}

export default getBtn;
