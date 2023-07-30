import {createTRPCReact} from '@trpc/react-query';

import {AppRouter} from "../server/Routes/_app";

export const appRouter = createTRPCReact<AppRouter>();
