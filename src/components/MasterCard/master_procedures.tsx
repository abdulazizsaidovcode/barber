import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface ProceduresProps {
  imgUrl: string;
  title: string;
}

const MasterProcedures: React.FC<ProceduresProps> = ({ imgUrl, title }) => {
  return (
    <div>
      <div className="flex items-center border shadow-4">
        {/* img url */}
        <div>
          <img src={imgUrl} alt="Procedure" />
        </div>
        {/* left piece content */}
        <div>
          {/* title */}
          <div>
            <p>{title}</p>
            <div>
              {/* delate button */}
              <Button danger className="flex  items-center justify-center">
                <DeleteOutlined />
              </Button>
            </div>
          </div>
          {/* line */}
          <div className="flex items-center w-full h-[1px] bg-black"></div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default MasterProcedures;
