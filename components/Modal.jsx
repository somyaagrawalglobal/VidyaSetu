'use client';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Modal({ isOpen, onClose, title, message, type = 'info', onConfirm, confirmText = 'Confirm', showCancel = true }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
        } else {
            setTimeout(() => setAnimate(false), 200);
        }
    }, [isOpen]);

    if (!isOpen && !animate) return null;

    const getIcon = () => {
        switch (type) {
            case 'danger': return <AlertTriangle className="w-6 h-6 text-red-600" />;
            case 'success': return <CheckCircle className="w-6 h-6 text-green-600" />;
            default: return <Info className="w-6 h-6 text-blue-600" />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'danger': return 'bg-red-50 text-red-900';
            case 'success': return 'bg-green-50 text-green-900';
            default: return 'bg-blue-50 text-blue-900';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full flex-shrink-0 ${getColors()}`}>
                            {getIcon()}
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
                    {showCancel && (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            onClose();
                        }}
                        className={`px-6 py-2 text-sm font-semibold text-white rounded-lg shadow-md transition-all active:scale-95 ${type === 'danger' ? 'bg-red-600 hover:bg-red-700 shadow-red-200' :
                                type === 'success' ? 'bg-green-600 hover:bg-green-700 shadow-green-200' :
                                    'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
