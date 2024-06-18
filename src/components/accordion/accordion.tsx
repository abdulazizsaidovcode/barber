import React, { useState } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

interface AccordionProp {
    title: string;
    children?: React.ReactNode;
    onToggle?: () => void;
    onClick?: () => void;
}

const Accordion: React.FC<AccordionProp> = ({ title, children, onToggle, onClick }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleAccordion = () => {
        setIsActive(!isActive);
        if (onToggle) {
            onToggle();
        }
    };

    return (
        <div className="accordion">
            <div
                className={`bg-white hover:cursor-pointer flex dark:text-black justify-between p-3 shadow-1 rounded-lg shadow-slate-400 hover:shadow-black duration-300 ${isActive ? 'active' : ''}`}
                onClick={() => {
                    toggleAccordion();
                    if (onClick) {
                        onClick();
                    }
                }}
            >
                {title}
                {isActive ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
            </div>
            {isActive && <div className="p-2">{children}</div>}
        </div>
    );
};

export default Accordion;