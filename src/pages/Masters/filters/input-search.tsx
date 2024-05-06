import { useState } from 'react';
import { AutoComplete, Input, SelectProps } from 'antd';

const InputSearch = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const getRandomInt = (max: number, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const searchResult = (query: string) =>
    new Array(getRandomInt(5))
      .join('.')
      .split('.')
      .map((_, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <div className="flex justify-between">
              <span>
                Found {query} on{' '}
                <a
                  href={`https://s.taobao.com/search?q=${query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {category}
                </a>
              </span>
            </div>
          )
        };
      });

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      className="w-full md:w-1/3"
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search
        placeholder="Search here"
        className="custom-search-input bg-white dark:bg-gray-800 dark:rounded-lg text-black dark:text-white"
      />
    </AutoComplete>
  );
};

export default InputSearch;