import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import contactData from './components/data/contactData.json';
import { nanoid } from 'nanoid';

function App() {
  const [userContacts, setUserContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contactUser')) ?? contactData
    );
  });
  const [serchUser, setSerchUser] = useState('');

  const filteredContacts = userContacts.filter(item =>
    item.name.toLowerCase().includes(serchUser)
  );

  useEffect(() => {
    window.localStorage.setItem('contactUser', JSON.stringify(userContacts));
  }, [userContacts]);

  const addContact = ({ values }) => {
    setUserContacts(prev => [...prev, { id: nanoid(), ...values }]);
  };

  const handleDeleteContactUser = id => {
    setUserContacts(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <h1 className='pageTitle'>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox serchUser={serchUser} setSerchUser={setSerchUser} />
      <ContactList
        userContacts={filteredContacts}
        handleDeleteContactUser={handleDeleteContactUser}
      />
    </>
  );
}

export default App;