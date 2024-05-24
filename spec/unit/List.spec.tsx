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

    it('отображение списка задач', () => {
        const onDelete = jest.fn()
        const onToggle = jest.fn()

        const items: Task[] = mockItems

        const {rerender, asFragment} = render(
            <List items={items} onDelete={onDelete} onToggle={onToggle}/>,
        )
        const firstRender = asFragment()

        items.pop()

        rerender(<List items={items} onDelete={onDelete} onToggle={onToggle}/>)
        const secondRender = asFragment()

        expect(firstRender).toMatchDiffSnapshot(secondRender)
    })

    it('не больше 10 невыполненных задач в списке', () => {
        const onDelete = jest.fn()
        const onToggle = jest.fn()
        const items = createTasksMock(ACTIVE_TASKS_LIMIT + 1, true)
        const {rerender, asFragment} = render(
            <List items={items} onDelete={onDelete} onToggle={onToggle}/>,
        )
        const tasksList = getTasksHtml()

        // Отображаемое количество задач равно максимальному значению
        expect(tasksList).toHaveLength(ACTIVE_TASKS_LIMIT)
        const firstRender = asFragment()
        items.push(createTasksMock(1, true)[0])
        rerender(<List items={items} onDelete={onDelete} onToggle={onToggle}/>)
        const secondRender = asFragment()

        // Снимок не изменяется при добавлении задач
        expect(firstRender).toMatchDiffSnapshot(secondRender)
    })
})

