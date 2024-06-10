import React, { useState, useEffect } from 'react';

const CurrentYear: React.FC = () => {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <p>
      {year}
    </p>
  );
};

export default CurrentYear;
