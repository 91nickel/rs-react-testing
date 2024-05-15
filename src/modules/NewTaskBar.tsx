import { useState } from 'react'
import { AddButton } from 'src/components/AddButton'
import { Input } from 'src/components/Input'
import { validateHeaderMax, validateHeaderMin } from 'src/utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, uncompleteCount } from 'src/store/taskSlice'

import './styles.css'
import { clearNotification, setNotification } from '../store/taskSlice'

export const NewTaskBar = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const uncomplete = useSelector(uncompleteCount)

    function validate(): { status: boolean, message: string } {
        const validation = [
            validateHeaderMin(value),
            validateHeaderMax(value),
            uncomplete < 10 || 'Нельзя завести больше 10 невыполненных задач',
        ]
        const validationResult = validation.find(result => result !== true) || true

        if (validationResult !== true) {
            return {status: false, message: validationResult}
        }

        return {status: true, message: ''}
    }

    function handleAdd() {
        const validation = validate()
        if (validation.status) {
            dispatch(addTask(value))
            return setValue('')
        }
        return dispatch(setNotification(validation.message))
    }

    const validation = validate()

    const disabled = !validation.status

    const disabledMessage = (disabled && validation.message) || ''

    return (
        <div className="new-task-bar">
            <Input
                value={value}
                onChange={(val) => setValue(val)}
                disabled={uncomplete >= 10}
                disabledMessage={disabledMessage}
            />
            <AddButton onClick={handleAdd} disabled={disabled}/>
        </div>
    )
}
