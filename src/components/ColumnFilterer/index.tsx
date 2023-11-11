import { VisibleColumn } from '../../types';

interface ColumnFiltereProps {
    columns: Array<VisibleColumn>;
    onChange: (columns: Array<VisibleColumn>) => void;
}

function ColumnFiltere({ columns, onChange }: ColumnFiltereProps) {
    function handleChange(e: any) {
        const { value, checked } = e.target;
        const arr = columns.map((col) => {
            if (col.id === value) {
                return { ...col, isVisible: checked };
            } else {
                return { ...col };
            }
        });

        if (arr.some((col) => col.isVisible)) {
            onChange(arr);
        }
    }
    return (
        <div className='flex p-2.5'>
            {columns.map((col) => (
                <div
                    key={col.ordinalNo}
                    className='flex items-center me-4'
                >
                    <input
                        onChange={handleChange}
                        id={col.id}
                        type='checkbox'
                        value={col.id}
                        checked={col.isVisible}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    />
                    <label
                        htmlFor={col.id}
                        className='ms-2 text-sm font-medium text-gray-900'
                    >
                        {col.title}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default ColumnFiltere;
