import InputSearch from './input-search.tsx';
import SelectFilter from './select-filter.tsx';

const Filters = () => {
  return (
    <div className="py-4">
      <div className="flex flex-col md:flex-row items-center justify-start w-full gap-4">
        <InputSearch />
        <SelectFilter />
        <SelectFilter />
      </div>
    </div>
  );
};

export default Filters;