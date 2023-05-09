import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Strengths.css'
import EducationCard from './StrengthsCard';

import { strengthsData } from '../../data/strengthsData'

function Strengths() {

    const { theme } = useContext(ThemeContext);
    return (
        <div className="education" id="strength" style={{backgroundColor: theme.secondary}}>
           
            <div className="education-body">
                <div className="education-description">
                <h1 style={{color:theme.primary}}>Fortalezas</h1>
                    {strengthsData.map(edu => (
                        <EducationCard 
                            key={edu.id}
                            id={edu.id}
                            institution={edu.institution}
                            course={edu.course}
                            startYear={edu.startYear}
                            endYear={edu.endYear}
                        />
                    ))}
                </div>
                <div className="education-image">
                    <img src={theme.strimg} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Strengths
