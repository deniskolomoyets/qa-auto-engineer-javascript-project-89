import { screen } from '@testing-library/react'

async function getRegistrationTable() {
  return screen.findByRole('table')
}

export default getRegistrationTable
