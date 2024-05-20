import { prettyDOM, render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { App } from 'src/App'
import { FILTER_LABEL_TEXT_ACTIVE, FILTER_LABEL_TEXT_INACTIVE } from 'src/components/Filter'

const userEvent = ue.setup({
    // delay: 200,
    advanceTimers: jest.advanceTimersByTime,
})

function getFilterCheckbox(): HTMLInputElement {
    const regexp = new RegExp(FILTER_LABEL_TEXT_ACTIVE + '|' + FILTER_LABEL_TEXT_INACTIVE);
    return screen.getByLabelText(regexp)
}

describe('Список задач', () => {
    it('Изменяется значение фильтра при клике', async () => {
        render(<App />)
        const checkbox = getFilterCheckbox();
        await userEvent.click(checkbox)
        // console.log('Value after click:', checkbox.checked)
        expect(checkbox).toBeChecked()

        await userEvent.click(checkbox)
        // console.log('Value after click:', checkbox.checked)
        expect(checkbox).not.toBeChecked()
    })

    // не содержит выполненные задачи
    // после нажатия на кнопку фильтрации
    it('с включенным фильтром', () => {
        render(<App />)
    });
    
    // показывает как выполненные, так и не выполненные задачи
    // после повторного нажатия на кнопку фильтрации
    it('с выключенным фильтром', () => {
        render(<App />)
    });

});
