import PropTypes from 'prop-types';

import styles from './filter.module.scss'

const Filter = ({changeFilter, filter}) => {

    return (
        <div>
            <p className={styles.text}>Find contacts by name</p>
            <input className={styles.input} onChange={changeFilter} value={filter} type="text" name='filter'/>
        </div>
    )
};

Filter.propTypes = {
    changeFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
};

export default Filter;
