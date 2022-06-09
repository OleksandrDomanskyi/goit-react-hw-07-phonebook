import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { actions } from 'redux/contacts/contacts-slice';
import { getContacts, getFilter } from 'redux/contacts/contacts-selector';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import styles from './phone-book.module.scss';

const Phonebook = () => {

    const contacts = useSelector(getContacts, shallowEqual);
    const filter = useSelector(getFilter, shallowEqual);

    const dispatch = useDispatch();

    const addContact = (data) => {
        const action = actions.addContact(data);
        const dublicate = contacts.find(contact => contact.name === data.name);
        if (dublicate) {
            alert(`${data.name} is already in contacts.`);
            return;
        };
        dispatch(action);
    };

    const deleteContact = (id) => {
        dispatch(actions.removeContact(id));
    };

    const changeFilter = ({ target }) => {
        dispatch(actions.getFilter(target.value)) 
    };

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
            <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
        </div>
    );
};

export default Phonebook;