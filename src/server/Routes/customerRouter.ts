import { prisma } from '../prisma';
import * as z from 'zod';
import {t} from "../trpc";


export const customerRouter = t.router({
  customers: t.procedure
    .query(() => {
      return prisma.customer.findMany();
    }),
  customerById: t.procedure
    .input(z.number().int())
    .query(({input: id}) => {
      return prisma.customer.findUnique({
        where: {
          id,
        }
      })
    }),
    customerCreate: t.procedure
    .input(z.object({
      name: z.string(),
      dateCreated: z.date()
    }))
    .mutation(async ({input: {name, dateCreated}}) => {
      const customer = await prisma.customer.create({
        data: {
          name,
          dateCreated
        }
      });

      return customer;
    })
});

export type CustomerRouter = typeof customerRouter;
