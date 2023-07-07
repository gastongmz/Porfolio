import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
//import { DataGrid } from '@material-ui/core'
//import {  DataGrid } from '@material-ui/data-grid'
import {  DataGrid, GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';


import { AiOutlineHome, AiOutlineLogout, AiFillDelete, AiFillStar } from "react-icons/ai";

import './GridPage.css'
import { ThemeContext } from '../../contexts/ThemeContext';
import { gridData } from '../../data/gridData'
import { headerData } from '../../data/headerData'
import {getSolicitudByEmail, borrarSolicitud} from '../../api/solicitudes.api';
import { useEffect, useState, useRef } from 'react';
import {  Redirect } from "react-router-dom";
import moment from 'moment';


function GridPage() {
   
    const { theme } = useContext(ThemeContext);

    //const rows = gridData;
    const pageSize = 5;
    const setPageSize = 1;

  
    const columns = [
        { field: '_id', minWidth: 100, headerClassName: 'customheadercell' , headerAlign: 'center', hide: true},
        { field: 'fechaAlta', headerName: 'Fecha', width:120, headerAlign: 'center', valueFormatter: params => 
        moment(params?.value).format("DD/MM/YYYY"), headerClassName:'customheadercell' },
        { field: 'nombre', headerName: 'Nombre', width:140, headerAlign: 'center', headerClassName:'customheadercell'},
        { field: 'apellido', headerName: 'Apellido', width:130,headerAlign: 'center', headerClassName: 'customheadercell' },
       { field: 'empresa', headerName: 'Empresa', minWidth:50,headerAlign: 'center',  headerClassName: 'customheadercell' ,flex:1},
        { field: 'email', headerName: 'Email', minWidth:250, headerAlign: 'center',headerClassName:'customheadercell'},
        { field: 'telefono', headerName: 'Telefono', minWidth:150, headerAlign: 'center', headerClassName: 'customheadercell',flex:1 },
        { field: 'mensaje', headerName: 'Mensaje',headerAlign: 'center', minWidth:350 , headerClassName: 'customheadercell'},
      /*  {field: ' ', headerName:'',  minWidth:15,
        renderCell: ({ id }) => {   
      return [        
          <AiFillStar className={classes.acction}  onClick={handleDeleteClick(id)}/>     
        
        ]
    }}*/,
        {field: '  ', headerName:'',  minWidth:15,
        renderCell: ({ id }) => {   
      return [
        
          <AiFillDelete className={classes.acction}  onClick={handleDeleteClick(id)}/>
        
        ]
    }}]
   

    const handleDeleteClick = (id) => () => {        
        ///setRows(rows.filter((row) => row.id !== id));
        //setData(data.filter((f)=>f.id !==id));      
        borrarSolicitud(accessToken, id);   
        window.location.reload();          
      };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        
    };


    
    const useStyles = makeStyles((t) => ({   
        customheadercell:{
            color: theme.primary,  
        },

        acction: {
            color: theme.secondary,         
            padding: '7px',
            borderRadius: '50%',
            boxSizing: 'content-box',
            fontSize: '1rem',
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

        search: {
            color: theme.secondary,
            position: 'absolute',
            top: 25,
            right: 45,
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


    const getRowClassName = (params) => {
        return params.rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
    };

    const logOut = event =>{
        localStorage.setItem("auth", JSON.stringify(false));
    }

    const [data, setData] = useState([]);

    const accessToken = sessionStorage.getItem('access-token')
    const loadingDatosGrid = async()  => {
        try{
                const response = await getSolicitudByEmail(accessToken);
                if (response.status == 401){
                    localStorage.setItem("auth", JSON.stringify(false));
                    window.location.replace('/');
                } else{                
                setData(response);                
                }
                    }
            catch(error){
                console.log(error);
            }
        }
        
       useEffect(()=>{           

        loadingDatosGrid()  

         },[] )
      
      const rows = data

        
    return (        
        <div className="gridPage" style={{ backgroundColor: theme.secondary }}>
            <Helmet>
                <title>{headerData.name} | Solicitudes</title>
            </Helmet>
            <div className="gridPage--header" style={{ backgroundColor: theme.primary }}>
                <Link to="/">
                    <AiOutlineHome className={classes.home} />
                </Link>
                <Link to="/" onClick={logOut}  >
                    <AiOutlineLogout className={classes.search}  />
                </Link>
                <h1 style={{ color: theme.secondary }}>Solicitudes de contacto</h1>

            </div>
            <div className="gridPage--container"  >
            </div>
            <div style={{ height: 400, width: '80%' , backgroundColor: theme.primary30, border: '2px solid #ddd',  borderRadius: '6px', alignItems: 'center'}}>    

                <DataGrid                          
                    getRowId={(row)=>row._id}
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    autoHeight={true}                                                  
                    onPageSizeChange={handlePageSizeChange}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    disableColumnSelector
                    disableColumnMenu={false}
                    disableDensitySelector
                    disableColumResize={true}
                    getRowClassName={getRowClassName}
                />
            </div>
        </div>
    )
}

export default GridPage
