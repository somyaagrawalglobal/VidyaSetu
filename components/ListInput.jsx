'use client';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function ListInput({ label, items = [], onChange, placeholder = "Add item..." }) {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (!inputValue.trim()) return;
        onChange([...items, inputValue.trim()]);
        setInputValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleRemove = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <div className="flex gap-2 mb-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 group">
                        <span className="text-gray-700 text-sm">{item}</span>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
