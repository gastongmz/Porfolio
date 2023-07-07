import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
//import { DataGrid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { AiOutlineHome, AiOutlineLogout, AiFillDelete } from "react-icons/ai";

import './GridPage.css'
import { ThemeContext } from '../../contexts/ThemeContext';
import { gridData } from '../../data/gridData'
import { headerData } from '../../data/headerData'
import {getSolicitudByEmail, borrarSolicitud} from '../../api/solicitudes.api';
import { useEffect, useState } from 'react';
import {  Redirect } from "react-router-dom";

function GridPage() {
   
    const { theme } = useContext(ThemeContext);

    //const rows = gridData;
    const pageSize = 5;
    const setPageSize = 1;


    const columns = [
        { field: '_id', width: 100, headerClassName: 'super-app-theme--header' , hide: true},
     /*   { field: 'nombre', headerName: 'Nombre', width: 200, headerClassName: theme.secondary },
        { field: 'apellido', headerName: 'Nombre', width: 200, headerClassName: theme.secondary },
        { field: 'empresa', headerName: 'Empresa', width: 200, headerClassName: theme.secondary },
        { field: 'email', headerName: 'Email', width: 300, headerClassName: theme.secondary },*/
        { field: 'telefono', headerName: 'Telefono', width: 300, headerClassName: theme.secondary },
        { field: 'mensaje', hide: true},
        {field: 'action', headerName: 'Action', with : 100,flex:1,
        renderCell: ({ id }) => {   
      return [
        
          <AiFillDelete className={classes.delete}  onClick={handleDeleteClick(id)}/>
        
        ]
    }}]
   

    const handleDeleteClick = (id) => () => {
        console.log("paso: "+ id)
        ///setRows(rows.filter((row) => row.id !== id));
        //setData(data.filter((f)=>f.id !==id));

      
        borrarSolicitud(accessToken, id);                   
    
      
      };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
    };

    const useStyles = makeStyles((t) => ({
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
                //console.log("loadingDatosGrid " + JSON.stringify(response.product))
                setData(response);
                //setData(JSON.stringify(response.product));              
                }

        }
            catch(error){
                console.log(error);
            }
        }
        
       useEffect(()=>{           

        loadingDatosGrid()  

         },[] )
       //  debugger
     // console.log("loadingDatosGrid2 " + JSON.stringify(data)) ;
     // const modifiedData  =   JSON.stringify(data).replace("__", '')  ;
     //const dataArray = JSON.parse(modifiedData);
     ///console.log (dataArray)
      const rows = data

        
    return (
        //Metodos
        //loadingDatosGrid(),
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
            <div style={{ height: 400, width: '50%', backgroundColor: theme.tertiary80 }}>
    

                <DataGrid                    
                    getRowId={(row)=>row._id}
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    autoHeight={true}                    
                    onPageSizeChange={handlePageSizeChange}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                    disableColumnSelector
                    disableColumnMenu
                    disableDensitySelector
                    getRowClassName={getRowClassName}
                />
            </div>
        </div>
    )
}

export default GridPage
