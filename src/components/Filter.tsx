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
                    <span>{!!value ? 'Все' : 'Активные'}</span>
                </label>
            </form>
        </>
    )
}

export default Filter
