import { act, prettyDOM, render, screen } from '@testing-library/react'
import { List } from 'src/components/List'
import { ACTIVE_TASKS_LIMIT, addTask, setTasks, tasksSelector } from 'src/store/taskSlice'
import { getTasksHtml } from '../utils/getTasksHtml'
import { createTasksMock } from '../utils/createTasksMock'
import { App } from 'src/App'
import { store } from 'src/store/configureStore'
import ue from '@testing-library/user-event'

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
})

const mockItems = [
    {
        id: '1',
        header: 'купить хлеб',
        done: false,
    },
    {
        id: '2',
        header: 'купить молоко',
        done: false,
    },
    {
        id: '3',
        header: 'выгулять собаку',
        done: true,
    },
]

describe('Список задач', () => {

    it('не больше 10 открытых задач в state', () => {
        const tasks = new Array(ACTIVE_TASKS_LIMIT + 5)
            .fill('')
            .map((a, i) => `Задача - ${i + 1}`)

        tasks.forEach(title => {
            act(() => {
                store.dispatch(addTask(title))
            })
        })

        // Селектор возвращает не больше 10
        const tasksBySelector = tasksSelector(store.getState())
        expect(tasksBySelector).toHaveLength(ACTIVE_TASKS_LIMIT)

        // Первые 10 задач будут в state, а все последующие - нет
        tasks.forEach((title, i) => {
            if (i < ACTIVE_TASKS_LIMIT) {
                expect(tasksBySelector[i]).toEqual({header: title, done: false, id: expect.anything()})
            } else {
                expect(tasksBySelector[i]).toBeUndefined()
            }
        })
    })

    it('не больше 10 открытых задач в App', async () => {
        const tasks = new Array(ACTIVE_TASKS_LIMIT - 1)
            .fill('')
            .map((a, i) => `Задача - ${i + 1}`)

        act(() => {
            store.dispatch(setTasks([]))
        })

        tasks.forEach(title => {
            act(() => {
                store.dispatch(addTask(title))
            })
        })

        render(<App/>)

        const inputEl = screen.getByRole('textbox') as HTMLInputElement
        const addBtnEl = screen.getByAltText('Добавить').parentElement as HTMLButtonElement

        expect(inputEl).not.toBeDisabled()

        const LAST_TASK_TITLE = 'Последняя задача'
        // Одна задача должна добавиться
        await userEvent.type(inputEl, LAST_TASK_TITLE)
        expect(addBtnEl).not.toBeDisabled()
        await userEvent.click(addBtnEl)

        // Дальше поля ввода становится disabled
        expect(screen.getByLabelText(LAST_TASK_TITLE)).toBeInTheDocument()
        expect(inputEl).toBeDisabled()
        // На всякий случай
        await userEvent.type(inputEl, LAST_TASK_TITLE)
        expect(inputEl).toHaveValue('')
    })
})

