import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useAccountStore = defineStore("account", {
  state: () => ({
    accounts: [],
  }),

  actions: {
    async fetchAccounts() {
      const { data: accounts, error } = await supabase.from("accounts").select("*");

      if (error) {
        throw error;
      }

      this.accounts = accounts;
    },

    async fetchAssignedAccounts(userId) {
      const { data: accounts, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("assigned_to", userId);

      if (error) {
        throw error;
      }

      return accounts;
    },

    async saveAccounts() {
      const { error } = await supabase.from("accounts").upsert(this.accounts);

      if (error) {
        throw error;
      }
    },

    getters: {
      assignedAccounts() {
        const currentUserId = useUserStore().currentUserId.value;

  
        if (!currentUserId) return [];
  
        const assignedAccounts = this.fetchAssignedAccounts(currentUserId);
  
        return assignedAccounts;
      },
    },
  },
});
