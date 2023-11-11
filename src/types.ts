type Column = {
    id: string;
    ordinalNo: number;
    title: string;
    type: string;
    width?: number;
};

type VisibleColumn = {
    id: string;
    ordinalNo: number;
    title: string;
    type: string;
    width?: number;
    isVisible: boolean;
};

type Data = Array<{
    id: string;
    [key: string]: any;
}>;

type TableData = {
    columns: Array<Column>;
    data: Data;
};

type TableProps = {
    data: TableData;
    pageCount?: number;
};

export { Column, Data, TableData, TableProps, VisibleColumn };
