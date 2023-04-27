import React, { useState } from 'react';
import './App.css';

const UserTable = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Serhiy', email: 'serhiy@gmail.com', age: 53 },
    { id: 2, name: 'Natalya', email: 'natalya@gmail.com', age: 45 },
    { id: 3, name: 'Nazar', email: 'nazar@gmail.com', age: 20 },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [editingId, setEditingId] = useState(null);
  const [newUser, setNewUser] = useState({ id: null, name: '', email: '', age: null });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortData = () => {
    let sortedData = [...data];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (user) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === user.id ? { ...item, ...user } : item))
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.age > 0) {
      setData((prevData) => [
        ...prevData,
        { ...newUser, id: Math.max(...prevData.map((item) => item.id)) + 1 },
      ]);
      setNewUser({ id: null, name: '', email: '', age: null });
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>
              ID {sortConfig && sortConfig.key === 'id' && sortConfig.direction === 'asc' && '▲'}
              {sortConfig && sortConfig.key === 'id' && sortConfig.direction === 'desc' && '▼'}
        </th>
        <th onClick={() => requestSort('name')}>
          Name{' '}
          {sortConfig && sortConfig.key === 'name' && sortConfig.direction === 'asc' && '▲'}
          {sortConfig && sortConfig.key === 'name' && sortConfig.direction === 'desc' && '▼'}
        </th>
        <th onClick={() => requestSort('email')}>
          Email{' '}
          {sortConfig && sortConfig.key === 'email' && sortConfig.direction === 'asc' && '▲'}
          {sortConfig && sortConfig.key === 'email' && sortConfig.direction === 'desc' && '▼'}
        </th>
        <th onClick={() => requestSort('age')}>
          Age {sortConfig && sortConfig.key === 'age' && sortConfig.direction === 'asc' && '▲'}
          {sortConfig && sortConfig.key === 'age' && sortConfig.direction === 'desc' && '▼'}
        </th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {sortData().map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{editingId === user.id ? <input type="text" value={user.name} onChange={(event) => handleSave({ ...user, name: event.target.value })} /> : user.name}</td>
          <td>{editingId === user.id ? <input type="text" value={user.email} onChange={(event) => handleSave({ ...user, email: event.target.value })} /> : user.email}</td>
          <td>{editingId === user.id ? <input type="number" value={user.age} onChange={(event) => handleSave({ ...user, age: event.target.value })} /> : user.age}</td>
          <td>
            {editingId === user.id ? (
              <button onClick={() => handleSave(user)}>Save</button>
            ) : (
              <button onClick={() => handleEdit(user.id)}>Edit</button>
            )}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div>
    <h3>Add new user</h3>
    <label>
      Name:
      <input type="text" name="name" value={newUser.name} onChange={handleNewUserChange} />
    </label>
    <label>
      Email:
      <input type="email" name="email" value={newUser.email} onChange={handleNewUserChange} />
    </label>
    <label>
      Age:
      <input type="number" name="age" value={newUser.age} onChange={handleNewUserChange} />
    </label>
    <button onClick={handleAddUser}>Add user</button>
  </div>
</div>);
};

export default UserTable;

