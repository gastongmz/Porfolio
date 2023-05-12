import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';

import { ThemeContext } from '../../contexts/ThemeContext';

import strImgWhite from '../../assets/svg/strengths/strImgWhite.svg'
import strImgBlack from '../../assets/svg/strengths/strImgBlack.svg'
import './Strengths.css'

function StrengthsCard({ id, description, strengths}) {

    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles((t) => ({
        strengthsCard : {
            backgroundColor:theme.primary30,
            "&:hover": {
                backgroundColor:theme.primary50,
            },
        },
    }));

    const classes = useStyles();

    return (
        <Fade bottom>
            <div key={id} className={`strengths-card ${classes.strengthsCard}`} >
                <div className="educard-img" style={{backgroundColor: theme.primary}}>
                    <img src={theme.type === 'light' ? strImgBlack : strImgWhite} alt="" />
                </div>
                <div className="strengths-details">
                   <h6 style={{color: theme.primary}}>{strengths}</h6>                  
                    <h5 style={{color: theme.tertiary80}}>{description}</h5>
                </div>
            </div>
        </Fade>        
    )
}

export default StrengthsCard
