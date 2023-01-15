import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)

    const formHeader = screen.queryByText(/contact form/i)
    expect(formHeader).toBeInTheDocument()
    expect(formHeader).toBeTruthy()
    expect(formHeader).toHaveTextContent(/contact form/i)
});


test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
   render(<ContactForm />)
   
   const firstNameInput = screen.getByLabelText(/first name/i)
   expect(firstNameInput).toBeInTheDocument()
   userEvent.type(firstNameInput, "abc")
   const errorMessages = await screen.findAllByTestId("error")
   expect(errorMessages).toHaveLength(1)
   
});
test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    
    const subBtn = screen.getByText(/submit/i)
    userEvent.click(subBtn)
    const errorMessages = screen.queryAllByTestId("error")
    expect(errorMessages).toHaveLength(3)
    
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)



    const firstNameInput = screen.getByLabelText(/first name/i)
    expect(firstNameInput).toBeInTheDocument()
    const lastNameInput = screen.getByLabelText(/last name/i)
    expect(lastNameInput).toBeInTheDocument()
    userEvent.type(firstNameInput, "abcdd")
    userEvent.type(lastNameInput, "abcdd")
    const btn = screen.getByText(/submit/i)
    expect(btn).toBeInTheDocument()
    userEvent.click(btn)
    const errorMessages = await screen.findAllByTestId('error')
    expect(errorMessages).toHaveLength(1)
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    expect(firstNameInput).toBeInTheDocument()
    const lastNameInput = screen.getByLabelText(/last name/i)
    expect(lastNameInput).toBeInTheDocument()
    userEvent.type(firstNameInput, "abcdd")
    userEvent.type(lastNameInput, "abcdd")
    const btn = screen.getByText(/submit/i)
    expect(btn).toBeInTheDocument()
    userEvent.click(btn)
    const errorMessage = screen.getByText(/email must be a valid email address/i)
    expect(errorMessage).toBeInTheDocument()
    
    
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    expect(firstNameInput).toBeInTheDocument()
    const lastNameInput = screen.getByLabelText(/last name/i)
    expect(lastNameInput).toBeInTheDocument()
    userEvent.type(firstNameInput, "abcdd")
    const btn = screen.getByText(/submit/i)
    expect(btn).toBeInTheDocument()
    userEvent.click(btn)
    const errorMessage = screen.getByText(/lastname is a required field/i)
    expect(errorMessage).toBeInTheDocument()
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    expect(firstNameInput).toBeInTheDocument()
    const lastNameInput = screen.getByLabelText(/last name/i)
    expect(lastNameInput).toBeInTheDocument()
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toBeInTheDocument()
    userEvent.type(firstNameInput, "tommy")
    userEvent.type(lastNameInput, "brits")
    userEvent.type(emailInput, "tommy@tommy.com")
    const messageInput = screen.getByLabelText(/message/i)
    expect(messageInput).toBeInTheDocument()
    
    const btn = screen.getByText(/submit/i)
    expect(btn).toBeInTheDocument()
    const errorMessages = screen.queryAllByTestId('error')
    expect(errorMessages).toHaveLength(0)
    userEvent.click(btn)
    const firstNameDisp = screen.getByTestId("firstnameDisplay")
    expect(firstNameDisp).toBeInTheDocument()
    const lastNameDisp = screen.getByTestId("lastnameDisplay")
    expect(lastNameDisp).toBeInTheDocument()
    const emailDisp = screen.getByTestId("emailDisplay")
    expect(emailDisp).toBeInTheDocument()
    const messageDisp = screen.queryAllByTestId("messageDisplay")
    expect(messageDisp).toHaveLength(0)
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    

    const firstNameInput = screen.getByLabelText(/first name/i)
    expect(firstNameInput).toBeInTheDocument()
    const lastNameInput = screen.getByLabelText(/last name/i)
    expect(lastNameInput).toBeInTheDocument()
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toBeInTheDocument()
    userEvent.type(firstNameInput, "tommy")
    userEvent.type(lastNameInput, "brits")
    userEvent.type(emailInput, "tommy@tommy.com")
    const messageInput = screen.getByLabelText(/message/i)
    expect(messageInput).toBeInTheDocument()
    userEvent.type(messageInput, "hello")
    const btn = screen.getByText(/submit/i)
    expect(btn).toBeInTheDocument()
    const errorMessages = screen.queryAllByTestId('error')
    expect(errorMessages).toHaveLength(0)
    userEvent.click(btn)
    const firstNameDisp = screen.getByTestId("firstnameDisplay")
    expect(firstNameDisp).toBeInTheDocument()
    expect(firstNameDisp).toHaveTextContent(/first name: tommy/i)
    const lastNameDisp = screen.getByTestId("lastnameDisplay")
    expect(lastNameDisp).toBeInTheDocument()
    expect(lastNameDisp).toHaveTextContent(/last name: brits/i)
    const emailDisp = screen.getByTestId("emailDisplay")
    expect(emailDisp).toBeInTheDocument()
    expect(emailDisp).toHaveTextContent(/tommy@tommy.com/i)
    const messageDisp = screen.getByTestId("messageDisplay")
    expect(messageDisp).toBeInTheDocument()
    expect(messageDisp).toHaveTextContent(/message: hello/i)
});
 