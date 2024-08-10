import React, { useEffect, useState } from 'react';
import './UserList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='user-list-container'>
      <h1>Registered Users</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;


// import React, { useState, useEffect } from 'react';
// import './UserList.css';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from backend when component mounts
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/users');
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="user-list-container">
//       <h2>Registered users</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : (
//         <ul className="user-list">
//           {users.map((user) => (
//             <li key={user.id} className="user-item">
//               <span className="user-name">{user.name}</span>
//               <span className="user-email">{user.email}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserList;
