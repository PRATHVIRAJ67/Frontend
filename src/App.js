// src/App.js

import React, { useState, useEffect } from 'react';
import { fetchContacts } from './apiService';
import ContactForm from './ContactForm';
import ContactsTable from './ContactsTable';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');

  const fetchContactsData = async () => {
    try {
      const response = await fetchContacts();
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Failed to fetch contacts. Please try again.');
    }
  };

  useEffect(() => {
    fetchContactsData();
  }, []);

  return (
    <div>
      <ContactForm
        fetchContacts={fetchContactsData}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />
      <ContactsTable
        contacts={contacts}
        fetchContacts={fetchContactsData}
        setSelectedContact={setSelectedContact}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </div>
  );
};

export default App;
