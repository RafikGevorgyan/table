import { memo } from 'react';
import { Column } from '../../types';
import EditableItem from '../EditableItem';
import SelectionItem from '../SelectionItem';

interface RowProps {
    row: any;
    columns: Array<Column & { isVisible: boolean }>;
    onDataChange: (key: string, value: string | number, rowId: string) => void;
}

function Row({ row, columns, onDataChange }: RowProps) {
    function getElementByType(type: string, value: any, key: string) {
        switch (type) {
            case 'string':
            case 'number':
                return (
                    <EditableItem
                        value={value}
                        onSave={(val) => onDataChange(key, val, row.id)}
                    />
                );
            case 'selection':
                return <SelectionItem data={value} />;
            default:
                return value.toString();
        }
    }

    return (
        <tr className='odd:bg-white even:bg-gray-50 border-b'>
            {columns.map(
                (col) =>
                    col.isVisible && (
                        <td
                            className='px-3 py-2.5'
                            key={col.id}
                        >
                            {getElementByType(col.type, row[col.id], col.id)}
                        </td>
                    )
            )}
        </tr>
    );
}

export default memo(Row);
