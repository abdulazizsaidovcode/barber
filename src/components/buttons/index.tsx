
export const Buttons: React.FC<{
  bWidth?: string, children: any, onClick?: () => void, disabled?: boolean;
}> = ({ bWidth, children, onClick, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${bWidth ? bWidth : "w-max"} py-1.5 px-5 text-sm font-medium text-white focus:outline-none bg-gray rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-dangermedium dark:bg-danger dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
    >
      {children}
    </button>
  );
};