import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useDateStore = defineStore("users", {
    state: () => ({
        accounts: null,
    }),
    actions: {
        async fetchAccounts() {
            const { data: accounts } = await supabase
                .from("users")
                .select("*")
                .order("id", { ascending: true });
            this.accounts = accounts;
            return this.accounts;
        }
    }
})