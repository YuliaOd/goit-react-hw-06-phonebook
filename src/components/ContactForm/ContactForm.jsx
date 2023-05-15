import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';
import { getContacts } from "redux/selectors";
import css from './ContactForm.module.css';

export const ContactForm = () => {
    const dispatch = useDispatch();
    const { contacts } = useSelector(getContacts);

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case 'name':
                setName(value)
                break;
            
            case 'number':
                setNumber(value)
                break;
        
            default:
                return;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        
        const addedContacts = getAddedContacts(name);
        (addedContacts) ?
            alert(`${name} is already in contacts`) :
            dispatch(addContacts(form.elements.name.value, form.elements.number.value));

        setName('');
        setNumber('');
    }

    const getAddedContacts = (name) => {
        return contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    }


        return (
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.form__wrapper}>
                    <label className={css.label}> Name
                        <input
                            className={css.input} 
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className={css.form__wrapper}>
                    <label className={css.label}> Number
                        <input
                            className={css.input}
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            value={number}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type='submit' className={css.button}>Add contact</button>
            </form>
        )
}