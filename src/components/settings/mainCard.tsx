import React from "react"

interface MainCardProp {
  text: string;
  link: string;
}

const MainCard: React.FC<MainCardProp> = ({ text, link }) => {
  return (
    <div onClick={() => window.location.href = `${link}`} className="bg-white dark:bg-black cursor-pointer w-[300px] h-[150px] flex items-center rounded-lg shadow-2 dark:shadow-[#fff] shadow-[#000]">
      <p className="font-bold dark:text-white text-[#000] ps-13">{text}</p>
    </div>
  )
}

export default MainCard