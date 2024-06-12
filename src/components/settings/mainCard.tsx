import React from "react"
import { Link } from "react-router-dom";

interface MainCardProp {
  text: string;
  link: string;
}

const MainCard: React.FC<MainCardProp> = ({ text, link }) => {
  return (
    <Link to={link}>
      <div className="bg-white dark:bg-black cursor-pointer lg:w-[270px] w-full h-[150px] flex items-center justify-center rounded-lg shadow-2 dark:shadow-[#fff] shadow-[#000]">
        <p className="font-bold  text-[15px] dark:text-white text-[#000]">{text}</p>
      </div>
    </Link>
  )
}

export default MainCard