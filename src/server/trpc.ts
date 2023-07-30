import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

export const t = initTRPC.create({
    transformer: superjson,
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;