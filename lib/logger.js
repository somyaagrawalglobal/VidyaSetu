const logger = {
    info: (message, meta = {}) => {
        const timestamp = new Date().toISOString();
        console.log(JSON.stringify({ level: 'INFO', timestamp, message, ...meta }));
        // Future: Insert into DB
    },
    error: (message, error = null, meta = {}) => {
        const timestamp = new Date().toISOString();
        console.error(JSON.stringify({ level: 'ERROR', timestamp, message, error: error?.toString(), stack: error?.stack, ...meta }));
        // Future: Insert into DB
    },
    warn: (message, meta = {}) => {
        const timestamp = new Date().toISOString();
        console.warn(JSON.stringify({ level: 'WARN', timestamp, message, ...meta }));
        // Future: Insert into DB
    },
    debug: (message, meta = {}) => {
        if (process.env.NODE_ENV === 'development') {
            const timestamp = new Date().toISOString();
            console.log(JSON.stringify({ level: 'DEBUG', timestamp, message, ...meta }));
        }
    }
};

export default logger;
