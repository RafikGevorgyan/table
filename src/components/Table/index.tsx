import { useCallback, useEffect, useRef, useState } from 'react';
import { PAGE_NUMBER, TABLE_DATA, VISIBLE_COLUMNS, getData, setData } from '../../helpers';
import { TableData, TableProps, VisibleColumn } from '../../types';
import ColumnFiltere from '../ColumnFilterer';
import Pagination from '../Pagination';
import Row from '../Row';
import SearchByColumn from '../SearchByColumn';

function Table({ data, rowCountByPage = 15 }: TableProps) {
    const tableData = useRef<(TableData & { filteredData?: any }) | null>(getData(TABLE_DATA) || data);
    const [pageData, setPageData] = useState<Array<any>>([]);
    const [filteredData, setFilteredData] = useState<Array<any> | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(() => getData(PAGE_NUMBER) || 1);
    const [visibleColumns, setVisibleColumns] = useState<Array<VisibleColumn>>(
        () =>
            getData(VISIBLE_COLUMNS) ||
            data.columns.sort((a, b) => a.ordinalNo - b.ordinalNo).map((col) => ({ ...col, isVisible: true }))
    );

    useEffect(() => {
        //Cacheing data
        function cacheData() {
            if (tableData.current?.filteredData) {
                tableData.current.filteredData = null;
            }
            setData(TABLE_DATA, tableData.current);
            setData(PAGE_NUMBER, pageNumber);
            setData(VISIBLE_COLUMNS, visibleColumns);
        }
        window.addEventListener('beforeunload', cacheData);
        return () => window.removeEventListener('beforeunload', cacheData);
    }, [tableData, visibleColumns, pageNumber]);

    useEffect(() => {
        if (tableData.current?.filteredData) {
            setFilteredData(
                tableData.current?.filteredData.slice(
                    pageNumber * rowCountByPage - rowCountByPage,
                    pageNumber * rowCountByPage
                )
            );
        } else if (tableData.current?.data) {
            setPageData(
                tableData.current.data.slice(pageNumber * rowCountByPage - rowCountByPage, pageNumber * rowCountByPage)
            );
        }
    }, [pageNumber, tableData, rowCountByPage]);

    const handleChange = useCallback((key: string, value: any, rowId: string) => {
        let row = tableData.current?.data.find((el) => el.id === rowId);
        if (row) row[key] = value;
    }, []);

    const handleSearch = useCallback(
        (colId: string, search: string) => {
            if (!tableData.current) return;
            if (!search) {
                tableData.current.filteredData = null;
                setPageNumber(1);
                setPageData(tableData.current.data.slice(1 * rowCountByPage - rowCountByPage, 1 * rowCountByPage));
                setFilteredData(null);
                return;
            }
            const filtered = tableData.current.data.filter((row) => {
                return row[colId].toString().toLowerCase().includes(search.toLowerCase());
            });
            tableData.current.filteredData = filtered;
            setFilteredData(filtered.slice(pageNumber * rowCountByPage - rowCountByPage, pageNumber * rowCountByPage));
            setPageNumber(1);
        },
        [tableData, rowCountByPage, pageNumber]
    );

    const dataToRender = filteredData ? filteredData : pageData;
    const dataSize = (filteredData ? tableData.current?.filteredData.length : tableData.current?.data.length) || 0;

    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full m-10'>
            <div>
                <SearchByColumn
                    columns={visibleColumns}
                    onSearch={handleSearch}
                />
                <ColumnFiltere
                    columns={visibleColumns}
                    onChange={setVisibleColumns}
                />
            </div>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                    <tr>
                        {visibleColumns.map(
                            (col) =>
                                col.isVisible && (
                                    <th
                                        scope='col'
                                        className='px-6 p-3'
                                        key={col.id}
                                    >
                                        {col.title}
                                    </th>
                                )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {dataToRender.length ? (
                        dataToRender.map((row) => (
                            <Row
                                key={row.id}
                                row={row}
                                columns={visibleColumns}
                                onDataChange={handleChange}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={visibleColumns.length}>
                                <div className='flex w-full justify-center p-6 items-center'>Empty</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='flex w-full justify-end'>
                <Pagination
                    currentPage={pageNumber}
                    pageSize={rowCountByPage}
                    dataSize={dataSize}
                    onPageChange={setPageNumber}
                />
            </div>
        </div>
    );
}
export default Table;
