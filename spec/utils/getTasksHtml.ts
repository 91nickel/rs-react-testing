import { screen } from '@testing-library/react'

export function getTasksHtml(): NodeListOf<HTMLLIElement> {
    const tasksListWrapper = screen.getByRole('list')
    return tasksListWrapper.querySelectorAll('li')
}
