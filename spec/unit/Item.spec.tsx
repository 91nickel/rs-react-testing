import { Item, TASK_HEADER_MAX_LENGTH, TASK_HEADER_DEFAULT_TEXT } from 'src/components/Item'
import { prettyDOM, render, screen } from '@testing-library/react'
import ue from '@testing-library/user-event'

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
})

const VALID_TASK_TITLE = 'Тестовое название задачи'
const INVALID_TASK_TITLE = `Тестовое название задачи длиннее ${TASK_HEADER_MAX_LENGTH} символов`

describe('Элемент списка задач', () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()

    const defaultProps = {
        id: '100500',
        header: VALID_TASK_TITLE,
        done: false,
        onDelete,
        onToggle,
    }

    it(`название не должно быть больше ${TASK_HEADER_MAX_LENGTH} символов`, () => {
        const props = {...defaultProps, header: INVALID_TASK_TITLE}
        render(<Item {...props} />)
        // Название должно обрезаться
        const item = screen.getByLabelText(INVALID_TASK_TITLE.slice(0, TASK_HEADER_MAX_LENGTH)).parentElement
        expect(item).toBeInTheDocument()
    })

    it('название не должно быть пустым', () => {
        const props = {...defaultProps, header: ''}
        render(<Item {...props} />)
        // Название должно подмениться на дефолтное
        const item = screen.getByLabelText(TASK_HEADER_DEFAULT_TEXT).parentElement
        expect(item).toBeInTheDocument()
    })

    it('нельзя удалять невыполненные задачи', async () => {
        const onDelete = jest.fn()

        const props = {...defaultProps, onDelete}
        render(<Item {...props} />)

        const checkbox = screen.getByRole('checkbox')
        const removeButton = screen.getByRole('button')
        await userEvent.click(removeButton)

        expect(checkbox).not.toBeChecked()
        expect(removeButton).toBeDisabled()
        expect(onDelete).not.toBeCalled()
    })

    it('можно закрыть задачу', async () => {
        const onToggle = jest.fn()

        const props = {...defaultProps, onToggle}
        render(<Item {...props} />)

        const checkbox = screen.getByRole('checkbox')
        const removeButton = screen.getByRole('button')

        expect(checkbox).not.toBeChecked()
        expect(removeButton).toBeDisabled()

        await userEvent.click(checkbox)

        expect(checkbox).toBeChecked()
        expect(onToggle).toBeCalled()
    })

    it('можно удалить закрытую задачу', async () => {
        const onDelete = jest.fn()

        const props = {...defaultProps, done: true, onDelete}
        render(<Item {...props} />)

        const checkbox = screen.getByRole('checkbox')
        const removeButton = screen.getByRole('button')

        expect(checkbox).toBeChecked()
        expect(removeButton).not.toBeDisabled()

        await userEvent.click(removeButton)

        expect(onDelete).toBeCalled()
    })
})