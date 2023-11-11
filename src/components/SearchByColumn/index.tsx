import { memo, useRef } from 'react';
import { Column } from '../../types';

interface SearchByColumnProps {
    columns: Array<Column & { isVisible: boolean }>;
    onSearch: (colId: any, search: any) => void;
}

function SearchByColumn({ columns, onSearch }: SearchByColumnProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const selectionRef = useRef<HTMLSelectElement>(null);

    function handlSearch() {
        onSearch(selectionRef.current?.value, inputRef.current?.value);
    }

    function handleClear() {
        if (inputRef.current) {
            inputRef.current.value = '';
            handlSearch();
        }
    }

    return (
        <div className='flex w-full'>
            <select
                ref={selectionRef}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500  p-2.5'
            >
                {columns.map((col) => (
                    <option
                        key={col.id}
                        value={col.id}
                    >
                        {col.title}
                    </option>
                ))}
            </select>
            <div className='relative w-full'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                    <svg
                        className='w-4 h-4 text-gray-500 dark:text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        />
                    </svg>
                </div>
                <input
                    ref={inputRef}
                    type='text'
                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-50'
                    placeholder='Search...'
                />
                <button
                    className='text-white absolute end-24 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
                    onClick={handlSearch}
                >
                    Search
                </button>
                <button
                    className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}

export default memo(SearchByColumn);
