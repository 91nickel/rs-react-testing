export const MAX_HEADER_LENGTH = 32;
export const HEADER_LENGTH_ERROR_MESSAGE =
  "Длина заголовка не должна превышать 32 символа";

export const validateHeader = (text: string) => {
  return text.length <= MAX_HEADER_LENGTH ? true : false;
};

export const sayHi = () => 'Hello!';

export const headerFieldOptions = {
  maxLength: MAX_HEADER_LENGTH,
  message: HEADER_LENGTH_ERROR_MESSAGE,
}
