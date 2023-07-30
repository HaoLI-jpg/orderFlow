import { useState } from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiBlanket, BiCar } from 'react-icons/bi';
import {
    createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider
} from 'react-router-dom';
import superjson from 'superjson';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';

import { IpcRequest } from '../api';
import { Home } from './Customers/Home';
import Order from './Order/Order';
import SideBar, { SideBarItem } from './SideBar/SideBar';
import { trpc } from './util';

export default function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  }));
  const [trpcClient] = useState(() =>
    trpc.createClient({
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
        <Route path='/home' element={<Home />} />
        <Route path='/order' element={<Order />} />
      </Route>,
    )
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <main className = "App">
          <RouterProvider router={router} />
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

const Root = () => {
  return (
  <div className='flex'>
    <SideBar>
      <SideBarItem icon={<AiOutlineTeam size={20}/>} name="Customers" targetUrl='/home'/>
      <SideBarItem icon={<BiBlanket size={20}/>} name="Orders" targetUrl='/order'/>
      <SideBarItem icon={<BiCar size={20}/>} name="Inventory" targetUrl='/home'/>
    </SideBar>
    <div>
      <Outlet />
    </div>
  </div>
  )
}
