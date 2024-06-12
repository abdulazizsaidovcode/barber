import React, { useState } from 'react';
import { Progress, Radio, RadioChangeEvent, Skeleton } from 'antd';

import { Toaster } from 'react-hot-toast';

import { useLocation } from 'react-router-dom';

type MasterCardInfoProps = {
  isLoading: boolean;
  goodLev: number;
  normLev: number;
  simpleLev: number;
  badLev: number;
  verBadLev: number;
};

const Review: React.FC<MasterCardInfoProps> = ({
  isLoading,
  goodLev,
  normLev,
  simpleLev,
  badLev,
  verBadLev,
}) => {
  const [value, setValue] = useState<number | null>(null);

  const location = useLocation();
  const id = location.pathname.substring(8);
  console.log(id);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 mt-4">
      <div className="w-[100%] flex flex-col items-center justify-center gap-4">
        <Skeleton loading={isLoading} active>
          <div className="bg-gray-100 dark:bg-[#ffffffdf] text-black  dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
            <div className="w-[50%] h-full flex flex-col justify-between ">
              <Radio.Group onChange={onChange} value={value}>
                <div className="flex items-center mb-4">
                  <Radio value={1}>Отлично</Radio>
                  <Progress percent={goodLev} strokeColor="red" />
                </div>
                <div className="flex items-center mb-4">
                  <Radio value={2}>Хорошо</Radio>
                  <Progress percent={normLev} strokeColor="red" />
                </div>
                <div className="flex items-center mb-4">
                  <Radio value={3}>Средне</Radio>
                  <Progress percent={simpleLev} strokeColor="red" />
                </div>
                <div className="flex items-center mb-4">
                  <Radio value={4}>Плохо</Radio>
                  <Progress percent={badLev} strokeColor="red" />
                </div>
                <div className="flex items-center">
                  <Radio value={5}>Очень плохо</Radio>
                  <Progress percent={verBadLev} strokeColor="red" />
                </div>
              </Radio.Group>
            </div>
          </div>
        </Skeleton>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Review;
