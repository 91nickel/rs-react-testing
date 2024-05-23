import { render, screen } from "@testing-library/react";
import { Notifier } from "src/components/Notifier";

describe('Окно оповещения', () => {
    it.todo('При выполении задачи должно появляться оповещение');
    it.todo('На экране одновременно может быть только одно оповещение');
    
    it('Автоматически исчезать с экрана через 2 секунды', async () => {
        const fn = jest.fn();

        render(<Notifier open={true} task="Любая задача" onClose={fn} />);

        jest.runAllTimers();
        
        expect(fn).toBeCalled();
    });
});