import { useDispatch, useSelector } from 'react-redux'
import { getShowActiveOnly, toggleActiveOnly } from '../store/taskSlice'

export const Filter = () => {
    const dispatch = useDispatch()
    const value = useSelector(getShowActiveOnly)
    return (
        <>
            <form className="filter" onChange={() => dispatch(toggleActiveOnly())}>
                <label>
                    <input type="checkbox" name="active" defaultChecked={!!value} />
                    {!!value ? FILTER_LABEL_TEXT_ACTIVE : FILTER_LABEL_TEXT_INACTIVE}
                </label>
            </form>
        </>
    )
}

export default Filter

export const FILTER_LABEL_TEXT_ACTIVE = 'Все'
export const FILTER_LABEL_TEXT_INACTIVE = 'Активные'
