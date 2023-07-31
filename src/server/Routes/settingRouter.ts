import {t} from "../trpc";
import * as z from 'zod';
import Store from 'electron-store';
import { settingSchema } from "./schemas/settingSchema";

const store = new Store({schema: settingSchema});

export const settingRouter = t.router({
    setIsDark: t.procedure
    .input(z.boolean())
    .mutation(async ({input: isDark}) => {
        console.log('setting isDark to', isDark)
        store.set('isDark', isDark);
        console.log('isDark is now', store.get('isDark'));
    }),
    isDark: t.procedure
    .query(() => {
        console.log('isDark is stored as', store.get('isDark'));
        return store.get('isDark', false);
    })
});

export type SettingRouter = typeof settingRouter;