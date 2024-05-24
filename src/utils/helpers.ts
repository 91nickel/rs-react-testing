import { screen } from '@testing-library/react'

export const MAX_HEADER_LENGTH = 32
export const MIN_HEADER_LENGTH = 1
export const HEADER_MAX_LENGTH_ERROR_MESSAGE = 'Длина заголовка не должна превышать 32 символа'
export const HEADER_MIN_LENGTH_ERROR_MESSAGE = 'Введите заголовок'

export const validateHeaderMax = (text: string): true | string => {
    return text.length <= MAX_HEADER_LENGTH || HEADER_MAX_LENGTH_ERROR_MESSAGE
}

export const validateHeaderMin = (text: string): true | string => {
    return text.length >= MIN_HEADER_LENGTH || HEADER_MIN_LENGTH_ERROR_MESSAGE
}

export const sayHi = () => 'Hello!'

export const headerFieldOptions = {
    maxLength: MAX_HEADER_LENGTH,
    message: HEADER_MAX_LENGTH_ERROR_MESSAGE,
}
