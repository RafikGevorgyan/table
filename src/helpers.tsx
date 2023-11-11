function getData(key: string): any {
    let data = sessionStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
}

function setData(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

const TABLE_DATA = 'table_data';
const PAGE_NUMBER = 'page_number';
const VISIBLE_COLUMNS = 'visible_columns';

export { PAGE_NUMBER, TABLE_DATA, VISIBLE_COLUMNS, getData, setData };
