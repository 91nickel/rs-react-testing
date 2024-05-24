import { Item } from './Item'
import { ACTIVE_TASKS_LIMIT } from '../store/taskSlice'

type Props = {
    items: Task[];
    onDelete: (id: Task['id']) => void;
    onToggle: (id: Task['id']) => void;
};

function activeCount(tasks: Task[]): number {
    return tasks.filter(t => !t.done).length
}

export const List = ({items, onDelete, onToggle}: Props) => (
    <ul className="task-list tasks">
        {items
            .reduce((agr, item) => {
                    return item.done || activeCount(agr) < ACTIVE_TASKS_LIMIT
                        ? [...agr, item]
                        : agr
                },
                [] as Task[])
            .map((item) => (
                <Item
                    {...item}
                    key={item.id}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
    </ul>
)
