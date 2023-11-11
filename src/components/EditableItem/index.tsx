import { ChangeEvent, useState } from 'react';

interface EditableItemProps {
    value: string | number;
    onSave: (value: string | number) => void;
}
function EditableItem({ value, onSave }: EditableItemProps) {
    const [inputValue, setInputValue] = useState(value);
    const [isEditMode, setIsEditMode] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let val = e.target.value;
        if (typeof value === 'number') setInputValue(Number(val));
        setInputValue(val);
    }

    function handleSave() {
        onSave(inputValue);
        setIsEditMode(false);
    }

    return (
        <div className='flex justify-between'>
            {isEditMode ? (
                <>
                    <input
                        className='px-3 py-2 bg-white border  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1'
                        type='text'
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <button
                        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 ml-2.5'
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <div className='px-3 py-2'>{inputValue}</div>
                    <button
                        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 ml-2.5'
                        onClick={() => setIsEditMode(true)}
                    >
                        Edit
                    </button>
                </>
            )}
        </div>
    );
}

export default EditableItem;
