import { Schema } from "electron-store";

export interface setting {
    isDark: boolean;
}

export const settingSchema:Schema<setting> = {
    isDark: {type: 'boolean', default: false}
}