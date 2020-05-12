import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from '../actions/users'
import UsersList from './UsersList'
import NewUserForm from './NewUser'

// a function generator only returns the yield and has access to a next() to iterate through all the yields. It brings an object with 'value' (whatever we're returning in the yield) and 'done' (boolean). If we wrap it in a while(true) -- which would normally break the browser, but not on a yield generator -- it re-enters the iteration depending on the number of times it was called
// function* testing(){
//   while (true) {
//     yield 1;
//     yield 2;
//     yield 3;
//   }
// }

function App({ getUsersRequest, users, createUserRequest, deleteUserRequest }) {
  
  useEffect(() => {
    getUsersRequest()
  }, [getUsersRequest])  

  // const iterator = testing();
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());

  const handleSubmit = ({firstName, lastName}) => {
    createUserRequest({
      firstName,
      lastName
    })
  }

  const handleDeleteUserClick = (userId) => {
    deleteUserRequest(userId)
  }

  const handleCloseAlert = () => {
    usersError({
      error: ''
    })
  }
  
  return (
    <div 
      style={{ 
        margin: '0 auto', 
        padding: '20px', 
        maxWidth: '600px'}}
      >
      <Alert color='danger' isOpen={!!users.error} toggle={handleCloseAlert}>
        {users.error}
      </Alert>
      <NewUserForm onSubmit={handleSubmit}/>
      <UsersList onDeleteUser={handleDeleteUserClick} users={users.items}/>
    </div>
  );
}

export default connect(({ users }) => ({ users }), { 
  getUsersRequest, 
  createUserRequest, 
  deleteUserRequest, 
  usersError})(App);
