import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const NewUserForm = ({onSubmit}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      firstName,
      lastName
    })
    setFirstName('')
    setLastName('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First Name</Label>
        <Input 
          required
          placeholder='First name' 
          onChange={e => setFirstName(e.target.value)} 
          value={firstName}/>
      </FormGroup>
      <FormGroup>
        <Label>Last Name</Label>
        <Input 
          required
          placeholder='Last name' 
          onChange={e => setLastName(e.target.value)} 
          value={lastName}/>
      </FormGroup>
      <FormGroup>
        <Button block outline type='submit' color='primary'>Create</Button>
      </FormGroup>
    </Form>
  )
}

export default NewUserForm