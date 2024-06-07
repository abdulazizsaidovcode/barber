import React from "react";

interface CategoryButtonsProps {
  category: { id: string; name: string }[];
  activeButton: string | null;
  handleButtonClick: (buttonId: string, id: string) => void;
}

const CategoryButtonsComponent: React.FC<CategoryButtonsProps> = ({
  category,
  activeButton,
  handleButtonClick,
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 text-sm gap-3 my-3">
    <button
      onClick={() => {
        handleButtonClick("", "");
      }}
      className={
        "inline-block rounded bg-[#2C3E50] text-center px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-lg focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
      }
    >
      Все категории
    </button>
    {category.length !== 0 &&
      category.map((item, i) => {
        if (!item) return null;
        return (
          <button
            key={i}
            onClick={() => {
              handleButtonClick(item.name, item.id);
            }}
            className={`inline-block rounded border-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out focus:ring-0 motion-reduce:transition-none ${
              activeButton === item.name
                ? "bg-[#2C3E50] text-white"
                : "border-[#2C3E50] text-[#2C3E50] hover:shadow-xl hover:bg-[#DDDDDD] dark:border-[#DDDDDD] dark:hover:border-[#2C3E50] dark:hover:text-[#2C3E50] dark:text-[#DDDDDD]"
            }`}
          >
            {item.name}
          </button>
        );
      })}
  </div>
);

export default CategoryButtonsComponent;
