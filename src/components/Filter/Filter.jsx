import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
import css from './Filter.module.css';

export const Filter = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector(getFilter);

    const onFilterChange = (event) => dispatch(changeFilter(event.target.value))


    return <div className={css.filter__wrapper}>
                <label className={css.label}> Find contacts by name
                    <input
                        className={css.input}
                        type="text"
                        value={filter}
                        onChange={onFilterChange}
                        required
                    />
                </label>
            </div>
}