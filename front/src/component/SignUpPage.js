import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import BackButton from './BackButton';
import './SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupComplete, setSignupComplete] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setConfirmationCode(data.confirmationCode);
        setSignupComplete(true);
      } else {
        console.error('Signup failed:', data.error);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  if (signupComplete) {
    return <Navigate to="/signup-confirm" state={{ email, confirmationCode }} />;
  }

  return (
    <div className="page">
      <header>
        <BackButton onClick={() => window.history.back()} />
      </header>
      <form className="form">
        <h1 className="form__title">Sign up</h1>
        <p className="form__subtitle">Create your account</p>
        <div className="field">
          <label className="field__label">Email</label>
          <input
            className="field__input"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="field">
          <label className="field__label">Password</label>
          <input
            className="field__input"
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="button" onClick={handleSignup} className="form__button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BackButton from './BackButton';
// import "./SignupPage.css";


// // import SigninPage from './SigninPage';
// // import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from './script/form';
// // import { saveSession } from './script/session';

// const SignupPage = ({ setEmailForConfirmation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailDirty, setEmailDirty] = useState(false);
//   const [passwordDirty, setPasswordDirty] = useState(false);
//   const [emailError, setEmailError] = useState('Email cannot be empty');
//   const [passwordError, setPasswordError] = useState('');
//   const [formValid, setFormValid] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleBackButtonClick = () => {
//     // Handle back button click logic here
//     window.history.back(); 
//     console.log('Back button clicked!');
//   };
  
//   useEffect(() => {
//     setFormValid(!emailError && !passwordError);
//   }, [emailError, passwordError]);

//   const blurHandler = (e) => {
//     switch (e.target.name) {
//       case 'email':
//         setEmailDirty(true);
//         break;
//       case 'password':
//         setPasswordDirty(true);
//         break;
//       default:
//         break;
//     }
//   }
  
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
//     if (!re.test(String(e.target.value).toLowerCase())) {
//       setEmailError('Invalid email')
//     } else {
//       setEmailError('')
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     if (e.target.value.length < 3 || e.target.value.length > 8) {
//       setPasswordError('Password should be longer than 3 and less than 8 characters')
//     } else {
//       setPasswordError('')
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:4000/signup", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({email, password}),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to sign up');
//       }

//       const data = await response.json();

//       if (data.success) {
//         setEmailForConfirmation(email);
//         navigate('/signup-confirm', { replace: true });
//       } else {
//         console.error('Signup failed:', data.error);
//       }
//     } catch (error) {
//       console.error('Error during signup:', error.message);
//     } 
//     setIsLoading(false); 
        
//     console.log('Email:', email);
//     console.log('Password:', password);
//     // Clear form fields
//     setEmail('');
//     setPassword('');
//   };

//   // if (signupComplete) {
//   //   return <SignupConfirmationPage email={email} />;
//   // }

//   return (
//     <div className='page'>
//       <header>
//         <BackButton onClick={handleBackButtonClick}/>
//       </header>

//       <form onSubmit={handleSignup} className='form'>
//         <h1 className='form__title'>Sign up</h1>
//         <p className='form__subtitle'>Choose a registration method</p>

//         <div className='field'>
//           <label className='field__label'>Email</label>
//           <input className='field__input' 
//             name="email"
//             type="email" 
//             id='email'
//             placeholder='example@gmail.com'
//             value={email} 
//             onBlur={blurHandler}
//             onChange={handleEmailChange}
//             required
//           />
//           {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}

//           <span name="email" className='form__error'>Помилка</span>
//         </div>
//         <div className='field'>
//           <label className='field__label'>Password</label>
//           <input className='field__input' 
//             name="password"
//             type="password" 
//             id='password'
//             placeholder='Pass2000ID'
//             value={password} 
//             onBlur={blurHandler}
//             onChange={handlePasswordChange}
//             required
//           />
//           {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
//         </div>

//         <span className='link__prefix'>Already have an account? <a href='/signin' className='link'>Sign In</a></span>
        
//         <button type="submit" className='form__button' disabled={!formValid}>
//         {/* {emailError && passwordError && <button className="form__button--disabled">Continue</button>} */}
//           {isLoading ? 'Signing up...' : 'Continue'}
//         </button>
        
//       </form>
//     </div>
//   );
// };

// export default SignupPage;
