import React, { useState, useEffect } from 'react';

function Customers() {

  const [customers, setCustomers] = useState([]); 

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    
    fetch("/api/customers")
        .then(res => res.json())
        .then(customers => setCustomers(customers));
  });
  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {
          customers.map( customer => {
            return <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
            }
          )
        }
      </ul>
    </div>
  );
}
export default Customers;
