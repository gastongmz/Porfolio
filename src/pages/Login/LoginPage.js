import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineAlignRight, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";

import './LoginPage.css'
import { SingleBlog } from '../../components'
import { ThemeContext } from '../../contexts/ThemeContext';
import { blogData } from '../../data/blogData'
import { headerData } from '../../data/headerData'

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
   const database = [
     {
       username: "gaston.alejandro.gmz@gmail.com",
       password: "pass1"
     },
     {
       username: "user2",
       password: "pass2"
     }
   ];
 
   const errors = {
     uname: "invalid username",
     pass: "invalid password"
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
     <div className="form">
       <form onSubmit={handleSubmit}>
         <div className="input-container">
           <label>Username </label>
           <input type="text" name="uname" required  value={'gaston.alejandro.gmz@gmail.com'}/>
           {renderErrorMessage("uname")}
         </div>
         <div className="input-container">
           <label>Password </label>
           <input type="password" name="pass" required  value={'pass1'}/>
           {renderErrorMessage("pass")}
         </div>
         <div className="button-container">
           <input type="submit" />
         </div>
       </form>
     </div>
   );
    return (
        <div className="blogPage" style={{backgroundColor: theme.secondary}}>
            <Helmet>
                <title>{headerData.name} | Blog</title>
            </Helmet>
            <div className="blogPage--header" style={{backgroundColor: theme.primary}}>
                <Link to="/">
                    <AiOutlineHome className={classes.home}/>
                </Link>            
            </div>
            <div className="login-form">           
      <div className="title">Sign In</div>
        {isSubmitted ? <Redirect to="/grid" /> 
                 : renderForm}
      </div>
            <div className="blogPage--container">
          
            </div>
        </div>
    )
}

export default LoginPage
