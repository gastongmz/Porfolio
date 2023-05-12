import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Strengths.css'
import StrengthsCard from './StrengthsCard';

import { strengthsData } from '../../data/strengthsData'

function Strengths() {

    const { theme } = useContext(ThemeContext);
    return (
        <div className="strengths" id="strength" style={{backgroundColor: theme.secondary}}>
           
            <div className="strengths-body">
                <div className="strengths-description">
                <h1 style={{color:theme.primary}}>Fortalezas</h1>
                    {strengthsData.map(srt => (
                        <StrengthsCard 
                            key={srt.id}
                            id={srt.id}
                            description={srt.description}                            
                            strengths={srt.strengths}                            
                        />
                    ))}
                </div>
                <div className="strengths-image">
                    <img src={theme.strimg} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Strengths
