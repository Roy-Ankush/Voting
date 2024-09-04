// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function User() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/user/info');
//                 console.log("user is",response.data[0].email)
//                 console.log("user is",response.data[1].email)
//                 setUsers(response.data); // Store the data in the state
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const userList = (
//         <ul>
//             {users.map(user => (
//                 <li key={user._id}>{user.email} - {user.idNumber}</li>                
//             ))}
//         </ul>
//     );

//     return (
//         <div>
//             <h1>User Info</h1>
//            <h1 className='bg-red-500'>{users.length > 0 ? (userList) : (<p>No users found</p>)}</h1> 
//         </div>
//     );
// }

// export default User;
