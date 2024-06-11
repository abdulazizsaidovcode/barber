import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { getFileId } from '../../helpers/api';

interface ProcedureItemProps {
  imgUrl: string;
  buttonText: string;
  buttonColor: string;
  title: string;
  icon: React.ReactNode;
  id: string;
  date: string;
  status: string;
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({
  imgUrl,
  buttonText,
  buttonColor,
  icon,
  title,
  id,
  date,
  status,
}) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* images */}
        <div className='shadow-xl flex items-center justify-center rounded-lg w-full h-50 overflow-hidden object-cover'>
          <img className='w-full h-full' src={getFileId + imgUrl} alt="" />
          <p>{status}</p>
          {/* Icons that appear depending on the status */}
      </div>
          <div>
            <div className='p-1 bg-gray flex items-center justify-center rounded-md'>
              <DeleteOutlined />
            </div>
          </div>
    </div>
  );
};

export default ProcedureItem;
