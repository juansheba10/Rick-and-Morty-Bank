import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.getUser();
      console.log(user)
      this.user = user;
    },
    async signInWithEmail(email, password) {
      
      const { user, error } = await supabase.auth.signInWithPassword({
        
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },


      //const { error } = await supabase.auth.signOut()
      //REFERENCIA DE FUNCIÓN SIGN-OUT DE SUPABASE
      // Función asíncrona para conectarnos al cliente de Supabase y hacer sign out

    async signOut() {
        
      const { error } = await supabase.auth.signOut()

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
  },
});