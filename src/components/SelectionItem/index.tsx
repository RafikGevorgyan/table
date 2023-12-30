import { memo, useState } from 'react';

interface SelectionItemProps {
    data: {
        selected: string;
        options: Array<string>;
    };
    onChange: (val: { selected: string; options: string[] }) => void;
}

function SelectionItem({ data: { selected, options }, onChange }: SelectionItemProps) {
    const [selectedVal, setSelectedVal] = useState(selected);
    function handleChange(e: any) {
        const { value } = e.target;
        setSelectedVal(value);
        onChange({ selected: value, options });
    }
    return (
        <select
            onChange={handleChange}
            value={selectedVal}
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
