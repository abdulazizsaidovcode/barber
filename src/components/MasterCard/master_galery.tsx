import React from 'react';

interface ProcedureItemProps {
  imgUrl: string;
  buttonText: string;
  buttonColor: string;
  icon: React.ReactNode;
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({ imgUrl, buttonText, buttonColor, icon }) => {
  return (
    <div className="flex flex-col items-center border shadow-4 p-2">
      <img src={imgUrl} alt="Procedure" className="mb-2" />
      <button className={`flex items-center justify-center ${buttonColor} text-white py-1 px-2 rounded`}>
        {icon} {buttonText}
      </button>
    </div>
  );
};

interface ProceduresListProps {
  procedures: {
    imgUrl: string;
    buttonText: string;
    buttonColor: string;
    icon: React.ReactNode;
  }[];
}

const ProceduresList: React.FC<ProceduresListProps> = ({ procedures }) => {
  return (
    <div className="flex space-x-2">
      {procedures.map((procedure, index) => (
        <ProcedureItem
          key={index}
          imgUrl={procedure.imgUrl}
          buttonText={procedure.buttonText}
          buttonColor={procedure.buttonColor}
          icon={procedure.icon}
        />
      ))}
    </div>
  );
};

// Example usage
const procedures = [
  {
    imgUrl: 'url1.jpg',
    buttonText: 'Approved',
    buttonColor: 'bg-green-500',
    icon: <i className="fas fa-check"></i>,
  },
  {
    imgUrl: 'url2.jpg',
    buttonText: 'New',
    buttonColor: 'bg-red-500',
    icon: <i className="fas fa-times"></i>,
  },
  // Add more items as needed
];

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Album 2 - Нарощивание ресниц 3D</h1>
      <ProceduresList procedures={procedures} />
    </div>
  );
};

export default App;
