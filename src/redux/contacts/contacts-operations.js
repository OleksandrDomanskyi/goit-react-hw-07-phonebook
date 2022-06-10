import { createAsyncThunk } from '@reduxjs/toolkit';

import * as API from '../../shared/services/contacts';

export const fetchContacts = createAsyncThunk(
    'contacts/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const data = await API.getContacts();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/add',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { contacts } = getState();
            const dublicate = contacts.items.find(item => item.name === data.name);
            if (dublicate) {
                alert(`${data.name} is already in contacts.`);
                return;
            }
            const newContact = await API.addContact(data);
            return newContact;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const removeContact = createAsyncThunk(
    'contacts/remove',
    async (id, { rejectWithValue }) => {
        try {
            const { id: deleteId } = await API.removeContact(id);
            return deleteId
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);