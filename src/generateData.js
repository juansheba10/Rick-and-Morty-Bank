const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const data = JSON.parse(fs.readFileSync('../bankData.json', 'utf8'));


const supabaseUrl ='https://mrycahsbbbyyfmmvqhyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yeWNhaHNiYmJ5eWZtbXZxaHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1ODE4MzIsImV4cCI6MTk5MDE1NzgzMn0.mTqH2Mt10i1zVLsq0qh7dkskMI5AMEaCZDRmGU60FAU';

const supabase = createClient(supabaseUrl, supabaseKey);

const users = data.users.map((user, index) => ({ ...user, index }));

users.sort((a, b) => a.order - b.order);



for (const [i, user] of users.entries()) {
  const { name, account_number, balance, loan } = user;
  const { amount, due_date, monthly_payment } = loan || {};
  supabase
    .from('accounts')
    .insert({
      name,
      account_number,
      balance,
      loan_amount: amount,
      loan_due_date: due_date,
      loan_monthly_payment: monthly_payment,
      position: i + 1// usar el índice del elemento en el array como orden
    })
    .then(() => {
      console.log(`El usuario "${name}" se ha insertado correctamente.`);
    })
    .catch(error => {
      console.error(`No se pudo insertar el usuario "${name}". Error:`, error);
    });
}


