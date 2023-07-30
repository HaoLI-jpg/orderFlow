import { useState } from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiBlanket, BiCar } from 'react-icons/bi';
import {
    createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider, useLocation
} from 'react-router-dom';
import { LuLayoutDashboard } from 'react-icons/lu';
import superjson from 'superjson';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';

import { IpcRequest } from '../api';
import { Customer } from './Customers/Customer';
import Order from './Order/Order';
import SideBar, { SideBarItem } from './SideBar/SideBar';
import { appRouter } from './util';
import { RoutePathes } from './RoutePathes';
import Inventory from './Inventory/Inventory';
import Dashboard from './Dashboard/Dashboard';
import Setting from './Setting/Setting';

export default function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  }));
  const [trpcClient] = useState(() =>
    appRouter.createClient({
      links: [
        loggerLink(),
        httpBatchLink({
          url: '/trpc',

          // custom fetch implementation that sends the request over IPC to Main process
          fetch: async (input, init) => {
            const req: IpcRequest = {
              url: input instanceof URL ? input.toString() : typeof input === 'string' ? input : input.url,
              method: input instanceof Request ? input.method : init?.method!,
              headers: input instanceof Request ? input.headers : init?.headers!,
              body: input instanceof Request ? input.body : init?.body!,
            };

            const resp = await window.appApi.trpc(req);

            return new Response(resp.body, {
              status: resp.status,
              headers: resp.headers,
            });
          }
        }),
      ],
      transformer: superjson
    }),
  );
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
        <Route path={RoutePathes.Dashboard} element={<Dashboard />} />
        <Route path={RoutePathes.Home} element={<Customer />} />
        <Route path={RoutePathes.Order} element={<Order />} />
        <Route path={RoutePathes.Inventory} element={<Inventory />} />
        <Route path={RoutePathes.Setting} element={<Setting />} />
      </Route>,
    )
  );

  return (
    <appRouter.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <main className = "App">
          <RouterProvider router={router} />
        </main>
      </QueryClientProvider>
    </appRouter.Provider>
  )
}

const Root = () => {
  const location = useLocation();

  return (
  <div className='flex' >
    <SideBar>
          <Link to={RoutePathes.Dashboard}>
            <SideBarItem icon={<LuLayoutDashboard size={20}/>} name="Dashboard" active={location.pathname==RoutePathes.Dashboard} />
            </Link>
          <Link to={RoutePathes.Home}>
            <SideBarItem icon={<AiOutlineTeam size={20}/>} name="Customers" active={location.pathname==RoutePathes.Home} />
          </Link>
          <Link to={RoutePathes.Order}>
            <SideBarItem icon={<BiBlanket size={20}/>} name="Order" active={location.pathname==RoutePathes.Order} />
          </Link>
          <Link to={RoutePathes.Inventory}>
            <SideBarItem icon={<BiCar size={20}/>} name="Inventory" active={location.pathname==RoutePathes.Inventory}/>
          </Link>
    </SideBar>

    <div className='p-10 w-full bg-white dark:bg-gray-900'>
      <Outlet />
    </div>
    
  </div>
  )
}