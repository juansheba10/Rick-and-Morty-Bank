const supabase = require("@supabase/supabase-js")

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const client = supabase.createClient(supabaseUrl, supabaseAnonKey);


const users = data.users;
users.forEach(async user => {
  const userData = [
    user.id,
    user.name,
    user.account_number,
    user.balance,
    user.loan.amount,
    user.loan.due_date,
    user.loan.monthly_payment
  ];
  let { data: users, error } = await supabase
    .from("users")
    .insert(userData)
    .then(() => console.log(`Inserted user with ID: ${user.id}`))
    .catch(error => console.error(error));
});
