import { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { getContacts, getError, getLoading } from 'redux/contacts/contacts-selector';
import * as operations from 'redux/contacts/contacts-operations';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import styles from './phone-book.module.scss';

const Phonebook = () => {

    const contacts = useSelector(getContacts, shallowEqual);
    const loading = useSelector(getLoading, shallowEqual);
    const error = useSelector(getError, shallowEqual);

    const [filter, setFilter] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(operations.fetchContacts());
    }, [dispatch]);

    const addContact = contacts => {
        dispatch(operations.addContact(contacts));
    };

    const deleteContact = (id) => {
        dispatch(operations.removeContact(id));
    };

    const changeFilter = useCallback(({ target }) => {
        setFilter(target.value)
    }, [setFilter]);

    const getFilteredContacts = () => {

        if (!filter) {
            return contacts;
        };
        const filterText = filter.toLowerCase();
        const filteredContacts = contacts.filter(({ name }) => name.toLowerCase().includes(filterText));
        return filteredContacts;
    };

    const filteredContacts = getFilteredContacts();

    return (
        <div className={styles.container}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addContact} />
            <h2>Contacts</h2>
            <Filter changeFilter={changeFilter} filter={filter} />
            {loading && <p>...Loading</p>}
            {error && <p>{error.message}</p>}
            {Boolean(filteredContacts.length) && <ContactList contacts={filteredContacts} deleteContact={deleteContact} />}
        </div>
    );
};

export default Phonebook;