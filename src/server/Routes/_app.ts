import { settingRouter } from './settingRouter';
import { customerRouter } from './customerRouter';
import { t } from '../trpc';

export const appRouter = t.mergeRouters(settingRouter, customerRouter);

export type AppRouter = typeof appRouter;