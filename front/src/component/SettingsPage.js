import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import "./SettingsPage.css";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/user/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'updateEmail', newEmail, oldPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Email updated successfully');
      } else {
        setMessage(data.error || 'Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      setMessage('Failed to update email');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/user/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'updatePassword', oldPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Password updated successfully');
      } else {
        setMessage(data.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Failed to update password');
    }
  };

  const handleLogout = () => {
    // Логика выхода из системы
    navigate('/signin');
  };

  return (
    <div className='page__settings'>
      <div className='header'>
        <BackButton onClick={() => navigate(-1)} />
        <h1 className='header__settings-title'>Settings</h1>
      </div>

      <form className='form__settings' onSubmit={handleEmailSubmit}>
        <div className='field__settings'>
          <h6 className='field__settings-title'>Change email</h6>
          <label className='field__settings-label' type="email" name="email">Email</label>
          <input className='field__input'
            type="email"
            placeholder='example@gmail.com'
            value={newEmail}
            onChange={handleNewEmailChange}
            required
          />
        </div>
        <div className='field__settings'>
          <label className='field__settings-label'>Old Password</label>
          <input className='field__input'
            type="password"
            placeholder='********'
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>

        <button className='form__button-white' type="submit">Save Email</button>
      </form>

      <hr className='divider' />

      <form className='form__settings' onSubmit={handlePasswordSubmit}>
        <div className='field'>
          <h6 className='field__settings-title'>Change password</h6>
          <label className='field__settings-label' type="password" name="password">Old Password</label>
          <input className='field__input'
            type="password"
            placeholder='********'
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
          />
        </div>
        <div className='field'>
          <label className='field__settings-label'>New Password</label>
          <input className='field__input'
            type="password"
            placeholder='********'
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        <button className='form__button-white' type="submit">Save Password</button>

        <hr className='divider' />

        <button className='form__button-red' onClick={handleLogout}>Log out</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default SettingsPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BackButton from './BackButton';
// import "./SettingsPage.css";


// const SettingsPage = () => {
//   const navigate = useNavigate();
//   // const [email, setEmail] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleNewEmailChange = (e) => {
//     setNewEmail(e.target.value);
//   };

//   const handleOldPasswordChange = (e) => {
//     setOldPassword(e.target.value);
//   };

//   const handleNewPasswordChange = (e) => {
//     setNewPassword(e.target.value);
//   };

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:4000/update-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ newEmail, oldPassword }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setNewEmail();
//         setMessage('Email updated successfully');
//       } else {
//         setMessage(data.error || 'Failed to update email');
//       }
//     } catch (error) {
//       console.error('Error updating email:', error);
//       setMessage('Failed to update email');
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:4000/update-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ oldPassword, newPassword }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setMessage('Password updated successfully');
//       } else {
//         setMessage(data.error || 'Failed to update password');
//       }
//     } catch (error) {
//       console.error('Error updating password:', error);
//       setMessage('Failed to update password');
//     }
//   };

//   const handleLogout = () => {
//     // Логика выхода из системы
//     navigate('/signin');
//   };

//   return (
//     <div className='page__settings'>

//       <div className='header'>
//         <BackButton onClick={() => navigate(-1)} />
//         <h1 className='header__settings-title'>Settings</h1>
//       </div>

//       <form className='form__settings' onSubmit={handleEmailSubmit}>
//         <div className='field__settings'>
//           <h6 className='field__settings-title'>Change email</h6>  
//           <label className='field__settings-label' type="email" name="email">Email</label>
//           <input className='field__input' 
//             type="email" 
//             placeholder='example@gmail.com'
//             value={newEmail} 
//             onChange={handleNewEmailChange} 
//             required
//           />
//         </div>
//         <div className='field__settings'>
//           <label className='field__settings-label'>Old Password</label>
//           <input className='field__input' 
//             type="password" 
//             placeholder='********'
//             value={oldPassword} 
//             onChange={handleOldPasswordChange} 
//           />
//         </div>

//         <button className='form__button-white' type="submit">Save Email</button>
//       </form> 

//       <hr className='divider'/> 
      
//       <form className='form__settings' onSubmit={handlePasswordSubmit}>
//         <div className='field'>
//           <h6 className='field__settings-title'>Change password</h6>  
//           <label className='field__settings-label' type="password" name="password">Old Password</label>
//           <input className='field__input' 
//             type="password" 
//             placeholder='example@gmail.com'
//             value={oldPassword}  
//             onChange={handleOldPasswordChange}
//             required
//           />
//         </div>
//         <div className='field'>
//           <label className='field__settings-label'>New Password</label>
//           <input className='field__input' 
//             type="password"
//             placeholder='********'
//             value={newPassword}  
//             onChange={handleNewPasswordChange} 
//             required
//           />
//         </div>

//         <button className='form__button-white' type="submit">Save Password</button>

//         <hr className='divider'/>

//         <button className='form__button-red' onClick={handleLogout}>Log out</button>

//         {message && <p className="message">{message}</p>}
        
//       </form>

//     </div>
//   );
// };

// export default SettingsPage;
