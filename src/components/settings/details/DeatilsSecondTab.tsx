import React from 'react'
import Accordion from '../../accordion/accordion'
import FunctionlityCard from './FunctionlityCard'
import { Checkbox } from 'antd';

const DeatilsSecondTab: React.FC = () => {
  return (
    <>
      <div className='w-full flex justify-between px-5'>
        <div className='w-1/2'>
          <Accordion title='Ограничение длительности бронирования (день)'>
            <div className='flex justify-between'>
              <div className='w-[66%]'>
                <FunctionlityCard editOnClick={() => ""} title='5' />
              </div>
              <div className='w-[30%] flex items-center mt-4 justify-between'>
                <Checkbox>Не ограничено</Checkbox>
              </div>
            </div>
          </Accordion>
        </div>
        <div className='w-1/2 px-5'>
          <Accordion title='Ограничение галери'>
            <div className='flex justify-between'>
              <div className='w-[66%]'>
                <p className='mt-3 mb-3'>Количество альбомов</p>
                <FunctionlityCard editOnClick={() => ""} title='5' />
              </div>
              <div className='w-[30%] flex items-center mt-4 justify-between'>
                <Checkbox>Не ограничено</Checkbox>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-[66%]'>
                <p className='mt-3 mb-3'>Количество фото в 1 альбоме</p>
                <FunctionlityCard editOnClick={() => ""} title='5' />
              </div>
              <div className='w-[30%] flex items-center justify-between'>
                <Checkbox>Не ограничено</Checkbox>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  )
}

export default DeatilsSecondTab