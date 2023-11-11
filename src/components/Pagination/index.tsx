import { memo, useMemo } from 'react';

interface PaginationProps {
    currentPage: number;
    pageSize: number;
    dataSize: number;
    onPageChange: (page: number) => void;
}
function Pagination({ currentPage, pageSize, dataSize, onPageChange }: PaginationProps) {
    const pages = useMemo(() => {
        const arr = [];
        for (let i = 0; i < Math.ceil(dataSize / pageSize); i++) {
            arr.push(i + 1);
        }
        return arr;
    }, [dataSize, pageSize]);

    let renderdPageNumbers = [];
    if (currentPage === 1) {
        renderdPageNumbers = pages.slice(0, 3);
    } else if (currentPage === pages.length) {
        renderdPageNumbers = pages.slice(-3);
    } else {
        renderdPageNumbers = pages.slice(currentPage - 2, currentPage + 1);
    }

    return pages.length > 1 ? (
        <nav className='m-2.5'>
            <ul className='inline-flex -space-x-px text-sm'>
                <li>
                    <button
                        className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100'
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(1)}
                    >
                        First
                    </button>
                </li>
                <li>
                    <button
                        className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300  hover:bg-gray-100'
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                </li>
                {renderdPageNumbers.map((num) => {
                    let className =
                        'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';
                    if (currentPage === num)
                        className =
                            'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border  text-white bg-blue-600 border-blue-600 hover:bg-none';
                    return (
                        <li
                            key={num}
                            onClick={() => onPageChange(num)}
                        >
                            <button className={className}>{num}</button>
                        </li>
                    );
                })}

                <li>
                    <button
                        className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                        disabled={currentPage === pages.length}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>
                <li>
                    <button
                        className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700'
                        disabled={currentPage === pages.length}
                        onClick={() => onPageChange(pages.length)}
                    >
                        Last
                    </button>
                </li>
            </ul>
        </nav>
    ) : null;
}

export default memo(Pagination);
