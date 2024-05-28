import React, { useState } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown  } from "react-icons/md";

interface AccordionProp {
    title: string;
    children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProp> = ({ title, children }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="accordion">
            <div className={`bg-white flex justify-between p-3 shadow-1 rounded-lg shadow-black ${isActive ? 'active' : ''}`} onClick={toggleAccordion}>
                {title}
                {isActive ? <MdKeyboardArrowUp size={24}/> : <MdKeyboardArrowDown size={24}/>}
            </div>
            {isActive && <div className="p-2">{children}</div>}
        </div>
    );
};

export default Accordion;
