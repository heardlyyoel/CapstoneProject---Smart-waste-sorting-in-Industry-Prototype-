import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get('http://localhost:5000/api/employee');
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/employee/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/employee', form);
    }
    setForm({ name: '', email: '', password: '' });
    setEditId(null);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/employee/${id}`);
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setForm({ name: emp.name, email: emp.email, password: '' });
    setEditId(emp._id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Employees</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        {!editId && (
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        )}
        <button type="submit">{editId ? 'Update' : 'Add'} Employee</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;
