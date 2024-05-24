import { act, prettyDOM, render, screen } from '@testing-library/react'
import { Notifier } from "src/components/Notifier";
import { App } from 'src/App'
import ue from '@testing-library/user-event'
import { store } from 'src/store/configureStore'
import { addTask, createTaskCloseMessage, setTasks } from 'src/store/taskSlice'

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
})

const FIRST_TASK_NAME = 'Первая задача'
const SECOND_TASK_NAME = 'Вторая задача'

describe('Оповещение при выполнении задачи', () => {
    act(() => {
        store.dispatch(addTask(FIRST_TASK_NAME))
    })

    it('появляется и содержит заголовок задачи', async () => {
        render(<App />)
        const firstTaskCheckbox = screen.getByLabelText(FIRST_TASK_NAME)
        await userEvent.click(firstTaskCheckbox)
        const notifierWrapper = screen.getByText(createTaskCloseMessage(FIRST_TASK_NAME))
        expect(notifierWrapper).toBeInTheDocument()
    });

    it('одновременно может отображаться только одно', async () => {
        act(() => {
            store.dispatch(setTasks([]))
            store.dispatch(addTask(FIRST_TASK_NAME))
            store.dispatch(addTask(SECOND_TASK_NAME))
        })

        render(<App />)

        const firstTaskCheckbox = screen.getByLabelText(FIRST_TASK_NAME)
        const secondTaskCheckbox = screen.getByLabelText(SECOND_TASK_NAME)

        await userEvent.click(firstTaskCheckbox)
        const firstNotifierWrapper = screen.getByText(createTaskCloseMessage(FIRST_TASK_NAME))

        await userEvent.click(secondTaskCheckbox)
        const secondNotifierWrapper = screen.getByText(createTaskCloseMessage(SECOND_TASK_NAME))

        expect(secondNotifierWrapper).toBeInTheDocument()
        expect(firstNotifierWrapper).toBe(secondNotifierWrapper)
        expect(secondNotifierWrapper).not.toHaveTextContent(createTaskCloseMessage(FIRST_TASK_NAME))
        expect(secondNotifierWrapper).toHaveTextContent(createTaskCloseMessage(SECOND_TASK_NAME))
    });
});