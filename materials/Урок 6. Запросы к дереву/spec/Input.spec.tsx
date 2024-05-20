import { render, screen, prettyDOM, fireEvent } from '@testing-library/react';
import { Input } from '../src/components/Input';

describe('Поле ввода', () => {
    it.todo('Ограничение на ввод более 32 символов');

    it('Поле доступно для ввода', async () => {
        const fn = jest.fn();

        render(<Input value="Greetings!" onChange={fn} />);

        const input = screen.getByRole("textbox");
        
    });
});
