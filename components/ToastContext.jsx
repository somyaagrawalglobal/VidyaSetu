'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type, duration }]);

        if (duration !== Infinity) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const success = useCallback((message, duration) => {
        console.log('Toast Success:', message);
        showToast(message, 'success', duration);
    }, [showToast]);

    const error = useCallback((message, duration) => {
        console.error('Toast Error:', message);
        showToast(message, 'error', duration);
    }, [showToast]);

    const info = useCallback((message, duration) => {
        console.log('Toast Info:', message);
        showToast(message, 'info', duration);
    }, [showToast]);

    const warning = useCallback((message, duration) => {
        console.warn('Toast Warning:', message);
        showToast(message, 'warning', duration);
    }, [showToast]);

    return (
        <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.length > 0 && console.log('Rendering Toasts:', toasts.length)}
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} {...toast} onRemove={() => removeToast(toast.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ message, type, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'error': return <AlertCircle className="w-5 h-5 text-rose-500" />;
            case 'warning': return <AlertCircle className="w-5 h-5 text-amber-500" />;
            default: return <Info className="w-5 h-5 text-indigo-500" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success': return 'border-emerald-100 bg-white/80 backdrop-blur-md shadow-emerald-100/20';
            case 'error': return 'border-rose-100 bg-white/80 backdrop-blur-md shadow-rose-100/20';
            case 'warning': return 'border-amber-100 bg-white/80 backdrop-blur-md shadow-amber-100/20';
            default: return 'border-indigo-100 bg-white/80 backdrop-blur-md shadow-indigo-100/20';
        }
    };

    return (
        <div
            className={`
                pointer-events-auto flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-md 
                border rounded-2xl shadow-xl transition-all duration-300 transform
                ${getStyles()}
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
            `}
        >
            <div className="flex-shrink-0">{getIcon()}</div>
            <p className="flex-1 text-sm font-bold text-slate-800 leading-tight">{message}</p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
