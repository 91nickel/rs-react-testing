import { DeleteButton } from './DeleteButton'

export const TASK_HEADER_MAX_LENGTH = 32
export const TASK_HEADER_DEFAULT_TEXT = 'Здесь должно быть название'

type Props = Task & {
    onDelete: (id: Task['id']) => void;
    onToggle: (id: Task['id']) => void;
};

export const Item = (props: Props) => {

    const header = props.header
        ? props.header.slice(0, TASK_HEADER_MAX_LENGTH)
        : TASK_HEADER_DEFAULT_TEXT

    return (
        <li className="item-wrapper">
            <input
                type="checkbox"
                id={props.id}
                defaultChecked={props.done}
                onChange={() => props.onToggle(props.id)}
            />
            <label htmlFor={props.id} onClick={() => props.onToggle(props.id)}>
                {props.done ? <s>{header}</s> : header}
            </label>
            <DeleteButton
                disabled={!props.done}
                onClick={() => props.onDelete(props.id)}
            />
        </li>
    )
}
