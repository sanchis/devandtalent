"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LoggerConfig() {
    return {
        level: process.env.LOGGER_LEVEL,
        prettyPrint: {
            translateTime: 'HH:MM:ss Z'
        }
    };
}
exports.default = LoggerConfig;
