import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import type { Action, Contact } from '../reducer/contactReducer';

interface ContactFormProps {
    dispatch: React.Dispatch<Action>;
    dataToEdit: Contact | undefined;
    toggleModal: () => void;
}

const ContactForm = ({ dispatch, dataToEdit, toggleModal }: ContactFormProps) => {

    const [contact, setContact] = useState({
        firstName: dataToEdit?.firstName ? dataToEdit.firstName : '',
        lastName: dataToEdit?.lastName ? dataToEdit.lastName : '',
        phone: dataToEdit?.phone ? dataToEdit.phone : '',
    })

    const [errorMsg, setErrorMsg] = useState('')

    // console.log(contact.firstName)

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setContact((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })

    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { firstName, lastName, phone } = contact;

        if (firstName.trim() === '' || lastName.trim() === '' || phone.trim() === '') {
            setErrorMsg("กรุณากรอกข้อมูลให้");
            return;
        } else if (!phone.trim().match(/^\d{10}$/g)) {
            setErrorMsg("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก")
            return;
        }

            if (!dataToEdit) {
                dispatch({
                    type: "ADD_CONTACT",
                    payload: {
                        id: Date.now(),
                        ...contact
                    }
                })
                setContact({
                    firstName: '',
                    lastName: '',
                    phone: ''
                })
            } else {
                dispatch({
                    type: "UPDATE_CONTACT",
                    payload: {
                        id: dataToEdit.id,
                        updates: {
                            id: Date.now(),
                            ...contact
                        }
                    }
                })
                toggleModal();
            }

    }

    return (
        <Form className='contact-form' onSubmit={handleOnSubmit}>
            {errorMsg && <p className='alert alert-danger'>{errorMsg}</p>}
            <Form.Group controlId='firstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    className='firstName'
                    name='firstName'
                    value={contact.firstName}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='lastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    className='lastName'
                    name='lastName'
                    value={contact.lastName}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='phone'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    className='phone'
                    name='phone'
                    value={contact.phone}
                    type='number'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='submit' className='mt-4'>
                <Button variant='primary' type='submit' className='submit'>
                    {dataToEdit ? 'Update Contact' : 'Add Contact'}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default ContactForm