import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useAccountStore = defineStore("accounts", {
    state: () => ({
        accounts: null,
    }),
    actions: {
        async fetchAccounts() {
            const { data: accounts } = await supabase
                .from("accounts")
                .select("*")
                .order("id", { ascending: true });
            this.accounts = accounts;
            return this.accounts;
        }
    }
})