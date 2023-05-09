import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
//import { DataGrid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { IoMenuSharp, IoHomeSharp } from 'react-icons/io5';

import './GridPage.css'
import { SingleBlog } from '../../components'
import { ThemeContext } from '../../contexts/ThemeContext';
import { gridData } from '../../data/gridData'
import { headerData } from '../../data/headerData'

function GridPage() {

    const [search, setSearch] = useState('')
    const { theme } = useContext(ThemeContext);

    const rows = gridData;
    const pageSize = 5;
    const setPageSize = 1;


    const columns = [
        { field: 'id', headerName: 'ID', width: 100, headerClassName: 'super-app-theme--header' },
        { field: 'name', headerName: 'Nombre Apellido', width: 200, headerClassName: theme.secondary },
        { field: 'email', headerName: 'Email', width: 300, headerClassName: theme.secondary },
        { field: 'phone', headerName: 'Telefono', width: 300, headerClassName: theme.secondary },
    ];

    const GridPage = () => {
        const [pageSize, setPageSize] = useState(10);
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


    return (
        <div className="blogPage" style={{ backgroundColor: theme.secondary }}>
            <Helmet>
                <title>{headerData.name} | Solicitudes</title>
            </Helmet>
            <div className="blogPage--header" style={{ backgroundColor: theme.primary }}>
                <Link to="/">
                    <AiOutlineHome className={classes.home} />
                </Link>
                <Link to="/" onClick={logOut}  >
                    <AiOutlineLogout className={classes.search}  />
                </Link>
                <h1 style={{ color: theme.secondary }}>Solicitudes de contacto</h1>

            </div>
            <div className="blogPage--container"  >

                {/*<div className="blog--search">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Seach blog..." className={classes.search}/>
    </div>*/}
                {/*<div className="blogs--container">
                    <Grid className="blog-grid" container direction="row" alignItems="center" justifyContent="center">
                        {filteredArticles.reverse().map(blog => (
                            <SingleBlog 
                                theme={theme}
                                title={blog.title}
                                desc={blog.description}
                                date={blog.date}
                                image={blog.image}
                                url={blog.url}
                                key={blog.id}
                                id={blog.id}
                            />
                        ))}
                    </Grid>
                        </div>*/}
            </div>
            <div style={{ height: 400, width: '50%', backgroundColor: theme.tertiary80 }}>

                <DataGrid
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
