'use client';
import { useState, useRef, useEffect } from 'react';
import { X, Check, ChevronsUpDown } from 'lucide-react';

export default function GenericMultiSelect({
    label,
    options = [],
    selectedIds = [],
    onChange,
    placeholder = "Select items...",
    displayKey = "title",  // Key to show in list (e.g. 'title' or 'email')
    idKey = "_id"         // Key to use as ID
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        String(opt[displayKey]).toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelection = (id) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter(item => item !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    const removeSelection = (e, id) => {
        e.stopPropagation(); // Prevent dropdown toggle
        onChange(selectedIds.filter(item => item !== id));
    };

    // Get full objects of selected items for display tags
    const selectedObjects = options.filter(opt => selectedIds.includes(opt[idKey]));

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1 mb-1 block">
                {label}
            </label>

            <div
                className="w-full min-h-[46px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-text focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all flex flex-wrap gap-2 items-center"
                onClick={() => setIsOpen(true)}
            >
                {selectedObjects.length === 0 && !search && (
                    <span className="text-slate-400 text-sm">{placeholder}</span>
                )}

                {selectedObjects.map(obj => (
                    <span key={obj[idKey]} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                        {obj[displayKey]}
                        <button
                            type="button"
                            onClick={(e) => removeSelection(e, obj[idKey])}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={selectedObjects.length > 0 ? "" : ""}
                    className="flex-1 bg-transparent outline-none text-sm min-w-[60px]"
                />

                <ChevronsUpDown size={16} className="text-slate-400 ml-auto" />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-xl max-h-60 overflow-auto">
                    {filteredOptions.length === 0 ? (
                        <div className="p-3 text-sm text-slate-400 text-center">No results found</div>
                    ) : (
                        filteredOptions.map(opt => {
                            const isSelected = selectedIds.includes(opt[idKey]);
                            return (
                                <div
                                    key={opt[idKey]}
                                    onClick={() => toggleSelection(opt[idKey])}
                                    className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {opt[displayKey]}
                                    {isSelected && <Check size={16} />}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
