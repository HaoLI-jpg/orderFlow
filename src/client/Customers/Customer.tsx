import React, {useEffect, useState} from 'react';
import {appRouter} from "../util";

export interface HomeProps {
}

export const Customer: React.FC<HomeProps> = (props) => {
  const utils = appRouter.useContext();
  const customers = appRouter.customers.useQuery();
  const addUser = appRouter.customerCreate.useMutation({
    onSuccess: () => {
      utils.customers.invalidate();
    }
  });

  const [name, setName] = useState("");

  useEffect(() => {
    window.appApi.receive("app", (event) => {
      console.log("Received event from main ", event);
      alert("Received event from main " + event.action);
    });
  }, [])

  return (
    <div className=" bg-white dark:bg-gray-500">
      <div className="card">
        <h2>Customers</h2>
        <form>
          <input type='text' name='name' onChange={(e) => setName(e.target.value)}/>
        </form>

        <button onClick={() => addUser.mutate({
          name : "new customer",
          dateCreated: new Date()
        })}>
          Add customer
        </button>
        {customers.data?.map((customer: any) => (
          <div key={customer.id}>{customer.id}: {customer.name} created on {customer.dateCreated.toLocaleString()}</div>
        ))}
      </div>
    </div>
  );
}
