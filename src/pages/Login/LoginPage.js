import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai';

import './LoginPage.css'
import { ThemeContext } from '../../contexts/ThemeContext';
import {loginData} from '../../data/loginData'

function LoginPage() {    
    
    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles((t) => ({

      search: {
        fontSize: '2.5rem',
        color: theme.tertiary,
        cursor: 'pointer',
        transform: 'translateY(-10px)',
        transition: 'color 0.3s',
        '&:hover': {
            color: theme.primary,
        },
        [t.breakpoints.down('sm')]: {
            fontSize: '2.5rem',
        },
        [t.breakpoints.down('xs')]: {
            fontSize: '2rem',
        },
    },
        input: {
          border: `4px solid ${theme.primary80}`,
          backgroundColor: `${theme.secondary}`,
          color: `${theme.tertiary}`,
          fontFamily: 'var(--primaryFont)',
          fontWeight: 500,
          transition: 'border 0.2s ease-in-out',
          '&:focus': {
              border: `4px solid ${theme.primary600}`,
          },
      },
      label: {
        backgroundColor: `${theme.secondary}`,
        color: `${theme.primary}`,
        fontFamily: 'var(--primaryFont)',
        fontWeight: 600,
        fontSize: '0.9rem',
        padding: '0 5px',
        transform: 'translate(25px,50%)',
        display: 'inline-flex',
    },
        home: {
            color: theme.secondary,
            position: 'absolute',
            top: 25,
            left: 25,
            padding: '7px',
            borderRadius: '50%',
            boxSizing: 'content-box',
            fontSize: '2rem',
            cursor: 'pointer',
            boxShadow: theme.type === 'dark' ? '3px 3px 6px #ffffff40, -3px -3px 6px #00000050' : '3px 3px 6px #ffffff40, -3px -3px 6px #00000050',
            transition: 'all 0.3s ease-in-out',
            "&:hover": 
            {
                color: theme.tertiary,
                transform: 'scale(1.1)',
            },
            [t.breakpoints.down('sm')]: {
                fontSize: '1.8rem',
            },
        },
    }));

    const classes = useStyles();

   // React States
   const [errorMessages, setErrorMessages] = useState({});
   const [isSubmitted, setIsSubmitted] = useState(false);   
 
   // User Login info
   const database = loginData;
 
   const errors = {
     uname: "Usuario invalido",
     pass: "Contraseña invalida"
   };
 
   const handleSubmit = (event) => {
     //Prevent page reload
     event.preventDefault();
 
     var { uname, pass } = document.forms[0];
 
     // Find user login info
     const userData = database.find((user) => user.username === uname.value);
 
     // Compare user info
     if (userData) {
       if (userData.password !== pass.value) {
         // Invalid password         
         localStorage.setItem("auth", JSON.stringify(false));
         setErrorMessages({ name: "pass", message: errors.pass });
       } else {        
        localStorage.setItem("auth", JSON.stringify(true));
         setIsSubmitted(true);
       }
     } else {        
        localStorage.setItem("auth", JSON.stringify(false));
       // Username not found
       setErrorMessages({ name: "uname", message: errors.uname });
     }
   };

 
   // Generate JSX code for error message
   const renderErrorMessage = (name) =>
     name === errorMessages.name && (
       <div className="error">{errorMessages.message}</div>
     );
 
   // JSX code for login form
   const renderForm = (
    <div className='login-form'>
    <form onSubmit={handleSubmit}>
        <div className='input-container'>
          
            <label htmlFor='Name' className={classes.label}>
                Usuario
            </label>           
            <input
                placeholder='Nombre'
                value={'gaston.alejandro.gmz@gmail.com'}
               
                type='text'
                name='uname'
                className={`form-input ${classes.input}`}
            />
             {renderErrorMessage("uname")}
        </div>
        <div className='input-container'>
            <label htmlFor='Surname' className={classes.label}>
                Contraseña
            </label>            
            <input
                placeholder='Apellido'
                required  
                value={'pass1'}
              
                type='password'
                name='pass'
                className={`form-input ${classes.input}`}
            />
            {renderErrorMessage("pass")}
        </div>
      
 

        <div className='submit-btn'>
            <button
                type='submit'
                className={classes.submitBtn}
            >
                <p>{!isSubmitted  ? 'Login' : 'Login'}</p>
                <div className='submit-icon'>
                    <AiOutlineSend
                        className='send-icon'
                        style={{
                            animation: !isSubmitted 
                                ? 'initial'
                                : 'fly 0.8s linear both',
                            position: isSubmitted 
                                ? 'absolute'
                                : 'initial',
                        }}
                    />
                    <AiOutlineCheckCircle
                        className='success-icon'
                        style={{
                            display: !isSubmitted 
                                ? 'none'
                                : 'inline-flex',
                            opacity: !isSubmitted  ? '0' : '1',
                        }}
                    />
                </div>
            </button>
        </div>
    </form>
    </div>
  
  
   

   );
    return (
      <div
      className='loginPage'
      id='login'
      style={{ backgroundColor: theme.secondary }}
  >
            <Helmet>
                <title> Login </title>
            </Helmet>
            <div className="loginPage--header" style={{backgroundColor: theme.primary}}>
                <Link to="/">
                    <AiOutlineHome className={classes.home}/>
                </Link>            
            </div>
      <h1 style={{ color: theme.primary }}>Login</h1>
        {isSubmitted ? <Redirect to="/grid" /> 
                 : renderForm}
     
        </div>
    )
}

export default LoginPage
