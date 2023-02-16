import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useAccountStore = defineStore("accounts", {
    state: () => ({
        accounts: null,
    }),
    actions: {
        async fetchAccounts() {
            const { data: accounts } = await supabase
                .from("accounts")
                .select("*")
                .order("position", { ascending: true });
            this.accounts = accounts;
            return this.accounts;
      },
      async saveAccounts() {
        const { error } = await supabase
          .from("accounts")
          .upsert(this.accounts);
  
        if (error) {
          console.error(error);
        }
      },
        async addAccount(account) {
            const { data: newAccount, error } = await supabase
              .from('accounts')
              .insert(account);
      
            if (error) {
              throw new Error(error.message);
            }
      
            this.accounts.push(newAccount[0]);
          },
    }
    
})