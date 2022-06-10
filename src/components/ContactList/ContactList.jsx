import { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './contact-list.module.scss'

const ContactList = ({contacts, deleteContact}) => {

    const elements = contacts.map(({ id, name, phone }) => (
            <li key={id}>{name}: {phone}
                <button className={styles.btn} onClick={() => deleteContact(id)}>Delete</button>
            </li>
        ));
    return (
        <ul className={styles.list}>
            {elements}
        </ul>
    )
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
        }).isRequired
    ),
    deleteContact: PropTypes.func.isRequired,
};

export default memo(ContactList);