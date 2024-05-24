import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './configureStore'

export const ACTIVE_TASKS_LIMIT = 10

export interface taskListState {
    list: Task[];
    notification: string;
    showActiveOnly: boolean;
}

export const initialState: taskListState = {
    list: [],
    notification: '',
    showActiveOnly: false,
}

export function createTaskCloseMessage (header: string) {
    return `Задача "${header}" завершена`
}

export const taskListSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.list = action.payload
        },
        addTask: (state, action: PayloadAction<Task['header']>) => {
            if (state.list.filter(task => !task.done).length < ACTIVE_TASKS_LIMIT) {
                state.list.push({
                    id: crypto.randomUUID(),
                    header: action.payload,
                    done: false,
                })
            }
        },
        completeTask: (state, action: PayloadAction<Task['id']>) => {
            const task = state.list.find((x) => x.id === action.payload)

            if (task) {
                task.done = true
            }
        },
        toggleTask: (state, action: PayloadAction<Task['id']>) => {
            const task = state.list.find((x) => x.id === action.payload)

            if (task) {
                task.done = !task.done

                if (task.done) {
                    state.notification = createTaskCloseMessage(task.header)
                }
            }
        },
        deleteTask: (state, action: PayloadAction<Task['id']>) => {
            state.list = state.list.filter((x) => x.id !== action.payload)
        },
        setNotification: (state, action: PayloadAction<Task['header']>) => {
            state.notification = `Задача "${action.payload}" завершена`
        },
        clearNotification: (state) => {
            state.notification = ''
        },
        toggleActiveOnly: (state) => {
            state.showActiveOnly = !state.showActiveOnly
        },
    },
})

export const {
    addTask,
    completeTask,
    deleteTask,
    toggleTask,
    setTasks,
    setNotification,
    clearNotification,
    toggleActiveOnly,
} = taskListSlice.actions

export default taskListSlice.reducer

export const tasksSelector = (state: RootState) => state.taskList.showActiveOnly
    ? state.taskList.list
        .filter(item => !item.done)
        .slice(0, ACTIVE_TASKS_LIMIT)
    : state.taskList.list
        .filter(item => !item.done)
        .slice(0, ACTIVE_TASKS_LIMIT)
        .concat(state.taskList.list.filter(item => item.done))

export const fullCount = (state: RootState) => state.taskList.list.length

export const completeCount = (state: RootState) =>
    state.taskList.list.filter((x) => x.done).length

export const uncompleteCount = (state: RootState) =>
    state.taskList.list.filter((x) => !x.done).length

export const getNotification = (state: RootState) =>
    state.taskList.notification

export const getShowActiveOnly = (state: RootState) =>
    state.taskList.showActiveOnly
