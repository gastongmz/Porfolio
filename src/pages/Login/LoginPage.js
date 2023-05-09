import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineAlignRight, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai';

import './LoginPage.css'
import { SingleBlog } from '../../components'
import { ThemeContext } from '../../contexts/ThemeContext';
import { blogData } from '../../data/blogData'
import { headerData } from '../../data/headerData'
import {loginData} from '../../data/loginData'

function LoginPage() {
    
    const [search, setSearch] = useState('')
    const { theme } = useContext(ThemeContext);

    const filteredArticles = blogData.filter((blog) => {
        const content = blog.title + blog.description + blog.date
        return content.toLowerCase().includes(search.toLowerCase())
    })


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
       /* search : {
            color: theme.tertiary, 
            width: '40%',
            height: '2.75rem',
            outline: 'none',
            border: 'none',
            borderRadius: '20px',
            padding: '0.95rem 1rem',
            fontFamily: "'Noto Sans TC', sans-serif",
            fontWeight: 500,
            fontSize: '0.9rem',  
            backgroundColor: theme.secondary, 
            boxShadow: theme.type === 'dark' ? 'inset 3px 3px 6px #ffffff10, inset -3px -3px 6px #00000060' : 'inset 3px 3px 6px #ffffffbd, inset -3px -3px 6px #00000030',
            "&::placeholder": {
                color: theme.tertiary80, 
            },
            [t.breakpoints.down('sm')]: {
                width:'350px',
            },
        },*/
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
   const [success, setSuccess] = useState(false);
 
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
         //localStorage.setItem('auth','false');
         localStorage.setItem("auth", JSON.stringify(false));
         setErrorMessages({ name: "pass", message: errors.pass });
       } else {
        //localStorage.setItem('auth','true');
        localStorage.setItem("auth", JSON.stringify(true));
         setIsSubmitted(true);
       }
     } else {
        //localStorage.setItem('auth','false');
        localStorage.setItem("auth", JSON.stringify(false));
       // Username not found
       setErrorMessages({ name: "uname", message: errors.uname });
     }
   };
/*
   const [isLoggedIn, setisLoggedIn] = useState(false);
   const logIn = () => {
   setisLoggedIn(true);   
   localStorage.setItem('auth','true');
   };
   const logOut = () => {    
   setisLoggedIn(false);   
   localStorage.setItem('auth','false');
   };  
*/
 
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
                <p>{!success ? 'Login' : 'Login'}</p>
                <div className='submit-icon'>
                    <AiOutlineSend
                        className='send-icon'
                        style={{
                            animation: !success
                                ? 'initial'
                                : 'fly 0.8s linear both',
                            position: success
                                ? 'absolute'
                                : 'initial',
                        }}
                    />
                    <AiOutlineCheckCircle
                        className='success-icon'
                        style={{
                            display: !success
                                ? 'none'
                                : 'inline-flex',
                            opacity: !success ? '0' : '1',
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
      className='blogPage'
      id='login'
      style={{ backgroundColor: theme.secondary }}
  >
            <Helmet>
                <title>{headerData.name} | Blog</title>
            </Helmet>
            <div className="blogPage--header" style={{backgroundColor: theme.primary}}>
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
