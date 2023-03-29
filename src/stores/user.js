import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    currentUserId: null,
  }),

  actions: {
    async fetchUser() {
      
      const { data: { user } } = await supabase.auth.getUser();
      this.user = user;
      this.currentUserId = user?.id;
      return this.user
    },

    

    async signInWithEmail(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (user) {
        this.user = user;
      }
    },

    async signUpAndAssignAccount(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error
      if (!user) return;

      const { data: accounts, error: accountsError } = await supabase
    .from("accounts")
    .select("id")
    .eq("assigned_to", null)
    .order("random")
    .limit(1);

  if (accountsError) throw accountsError;
  if (!accounts.length) {
    // En caso de que no haya personajes disponibles
    throw new Error("No hay personajes disponibles");
  }

  const account = accounts[0];

  // Actualizar la tabla "users" con el número de cuenta asignado
  const { error: updateError } = await supabase
    .from("users")
    .insert({ account_id: account.id })
    .eq("id", user.id);

  if (updateError) throw updateError;

  // Marcar el personaje como asignado en la tabla "accounts"
  const { error: assignError } = await supabase
    .from("accounts")
    .update({ assigned_to: user.id })
    .eq("id", account.id);

  if (assignError) throw assignError;

  console.log
  this.user = user;
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      this.user = null;
    },

    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
    getters: {
      currentUserId() {
        return this.currentUserId;
      },
    },
  },
});
