import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'logs/app.log' }), // Log to file
  ],
});
