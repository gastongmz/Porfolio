import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai';
//import usuario from '../../api/usuario.api';

import './UsuarioPage.css'
import { ThemeContext } from '../../contexts/ThemeContext';
//import {usuarioData} from '../../data/usuarioData'

function UsuarioPage() {    
    
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
        /*display: 'flow-root',*/
    },
    error: {
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
   
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Validar que las contraseñas coincidan
      if (password !== repetirPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
  
      // Crear objeto con los datos del formulario
      const formData = {
        nombre,
        apellido,
        email,
        password
      };
  
      // Realizar llamada a la API
      fetch('URL_DE_TU_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta de la API
          console.log(data);
          // Aquí puedes realizar cualquier acción adicional con la respuesta de la API
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  
    return (
        <div className='UsuarioPage' id='usuario' style={{ backgroundColor: theme.secondary }} >
            <Helmet>
                <title> Registro Usuario </title>
            </Helmet>
            <div className="usuarioPage--header" style={{backgroundColor: theme.primary}}>
                <Link to="/">
                    <AiOutlineHome className={classes.home}/>
                </Link>            
            </div>              
            <div className='usuarioPage--container'>
    <div className='usuarioPage-form'>
      <form onSubmit={handleSubmit}>
      <div className='input-container'>
        <label className={classes.label}>
          Nombre:
          <input
            type="text"
            value={nombre}
            className={`form-input ${classes.input}`}
            onChange={(event) => setNombre(event.target.value)}
          />
        </label >
        </div>
        <br />
        <div className='input-container'>
        <label className={classes.label}>
          Apellido:
          <input
            type="text"
            value={apellido}
            className={`form-input ${classes.input}`}
            onChange={(event) => setApellido(event.target.value)}
          />
        </label>
        </div>
        <br />
        <div className='input-container'>
        <label className={classes.label}>
          Email:
          <input
            type="email"
            value={email}
            className={`form-input ${classes.input}`}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        </div>
        <br />
        <div className='input-container'>
        <label className={classes.label}>
          Contraseña:
          <input
            type="password"
            value={password}
            className={`form-input ${classes.input}`}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        </div>
        <br />
        <div className='input-container'>
        <label className={classes.label}>
          Repetir Contraseña:
          <input
            type="password"
            value={repetirPassword}
            className={`form-input ${classes.input}`}
            onChange={(event) => setRepetirPassword(event.target.value)}
          />
        </label>
        </div>
        <br />
        <br />
        <div className='submit-btn'>
        <button type="submit" className={classes.submitBtn} >Registrar</button>
        </div>
      </form>
      </div>
      </div>
      </div>
    );
  };



export default UsuarioPage
