// components/Sidebar.tsx
import { Sorter } from '../repos/_components/sorter';
import { StarsFilter } from '../repos/_components/stars-filter';

const Sidebar = () => {
  return (
    <aside className="w-fit min-w-[200px]">
      <div className="flex flex-col gap-4 w-80 items-start justify-start">
        <div className='mt-10'>
          <h1 className="mb-2 font-semibold">Sorting</h1>
          <Sorter />
        </div>
        <div className="flex flex-col w-full items-start justify-start">
          <h1 className="mb-2 font-semibold w-full">Filtering</h1>
          <StarsFilter />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
