const LogLevel: number = Number(import.meta.env.VITE_LOG_LEVEL ?? 0);

class Logger {
    static log(message: any, ...options: any[]): void {
        if (LogLevel > 0) return;
        console.log(message, ...options);
    }

    static info(message: any, ...options: any[]): void {
        if (LogLevel > 1) return;
        console.log("Info:", message, ...options);
    }

    static error(message: any, ...options: any[]): void {
        if (LogLevel > 2) return;
        console.log("Error:", message, ...options);
    }
}

export default Logger;
