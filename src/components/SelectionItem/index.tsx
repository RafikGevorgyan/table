import { memo } from 'react';

interface SelectionItemProps {
    data: {
        selected: string;
        options: Array<string>;
    };
}

function SelectionItem({ data: { selected, options } }: SelectionItemProps) {
    return (
        <select
            onChange={(e) => console.log(e)}
            value={selected}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2'
        >
            {options.map((op) => (
                <option
                    key={op}
                    value={op}
                >
                    {op}
                </option>
            ))}
        </select>
    );
}

export default memo(SelectionItem);
