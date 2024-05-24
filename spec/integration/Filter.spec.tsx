import { act, prettyDOM, render, screen } from '@testing-library/react'
import ue from '@testing-library/user-event'
import { App } from 'src/App'
import { FILTER_LABEL_TEXT_ACTIVE, FILTER_LABEL_TEXT_INACTIVE } from 'src/components/Filter'
import { store } from 'src/store/configureStore'
import { setTasks, tasksSelector } from 'src/store/taskSlice'
import { createTasksMock } from '../utils/createTasksMock'
import { getTasksHtml } from '../utils/getTasksHtml'

const userEvent = ue.setup({
    // delay: 200,
    advanceTimers: jest.advanceTimersByTime,
})

function getFilterCheckbox(): HTMLInputElement {
    const regexp = new RegExp(FILTER_LABEL_TEXT_ACTIVE + '|' + FILTER_LABEL_TEXT_INACTIVE)
    return screen.getByLabelText(regexp)
}

const activeMockTasks = createTasksMock(5, true)
const inactiveMockTasks = createTasksMock(5, false)
const allMockTasks = [...activeMockTasks, ...inactiveMockTasks]

describe('Список задач', () => {
    // заполнить задачи моками
    act(() => {
        store.dispatch(setTasks(allMockTasks))
    })

    it('Изменяется значение фильтра при клике', async () => {
        render(<App/>)
        const checkbox = getFilterCheckbox()
        await userEvent.click(checkbox)
        // console.log('Value after click:', checkbox.checked)
        expect(checkbox).toBeChecked()

        await userEvent.click(checkbox)
        // console.log('Value after click:', checkbox.checked)
        expect(checkbox).not.toBeChecked()
    })

    // не содержит выполненные задачи
    // после нажатия на кнопку фильтрации
    it('с включенным фильтром', async () => {
        render(<App/>)
        const checkbox = getFilterCheckbox()
        // Ожидаем что фильтр неактивен
        expect(store.getState().taskList.showActiveOnly).toBe(false)
        expect(checkbox).not.toBeChecked()
        // Активируем фильтр
        await userEvent.click(checkbox)
        // Проверяем, что в store появился флаг showActiveOnly=true
        expect(store.getState().taskList.showActiveOnly).toBe(true)

        // Проверяем, что tasksSelector отдает только все активные задачи
        expect(tasksSelector(store.getState())).toHaveLength(activeMockTasks.length)
        tasksSelector(store.getState()).forEach(task => expect(task.done === false))

        // Проверяем, что на экране только активные задачи
        const tasksList = getTasksHtml()
        expect(tasksList).toHaveLength(activeMockTasks.length)
        tasksList.forEach((item) => {
            const checkbox = item.querySelector('[type=checkbox]') as HTMLInputElement
            const removeButton = item.querySelector('button') as HTMLButtonElement

            expect(item).toBeVisible()
            // input = checked
            expect(checkbox).toBeInTheDocument()
            expect(checkbox).not.toBeChecked()
            // remove = inactive
            expect(removeButton).toBeInTheDocument()
            expect(removeButton).toBeDisabled()
        })

        // console.log(prettyDOM(tasksList))
        // screen.debug()
    })

    // показывает как выполненные, так и не выполненные задачи
    // после повторного нажатия на кнопку фильтрации
    it('с выключенным фильтром', async () => {
        render(<App/>)
        const checkbox = getFilterCheckbox()
        // Ожидаем что фильтр активен после предыдущего теста
        expect(store.getState().taskList.showActiveOnly).toBe(true)

        // Деактивируем фильтр
        await userEvent.click(checkbox)
        expect(store.getState().taskList.showActiveOnly).toBe(false)

        // Проверяем, что tasksSelector отдает все задачи
        expect(tasksSelector(store.getState())).toHaveLength(allMockTasks.length)
        allMockTasks.forEach((item, i, items) => {
            expect(tasksSelector(store.getState())).toContain(item)
        })

        // Проверяем, что на экране все задачи
        let activeCnt = 0, inactiveCnt = 0
        const tasksList = getTasksHtml()
        expect(tasksList).toHaveLength(allMockTasks.length)
        tasksList.forEach((item) => {
            const checkbox = item.querySelector('[type=checkbox]') as HTMLInputElement
            const removeButton = item.querySelector('button') as HTMLButtonElement
            checkbox && checkbox.checked ? inactiveCnt++ : activeCnt++

            expect(item).toBeVisible()
            expect(checkbox).toBeInTheDocument()
            expect(removeButton).toBeInTheDocument()
        })
        expect(activeCnt).toBe(activeMockTasks.length)
        expect(inactiveCnt).toBe(inactiveMockTasks.length)
    })

})
