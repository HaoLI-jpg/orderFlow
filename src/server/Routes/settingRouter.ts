import fs from "fs";
import {t} from "../trpc";
import * as z from 'zod';

export const settingRouter = t.router({
    setIsDark: t.procedure
    .input(z.boolean())
    .mutation(async ({input: isDark}) => {

    }),
    isDark: t.procedure
    .query(() => {

    })
});

export type SettingRouter = typeof settingRouter;