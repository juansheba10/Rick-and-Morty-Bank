import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useProfileStore = defineStore("profiles", {
    state: () => ({
        profiles: [],
    }),

    actions: {
        async fetchProfiles() {
            const { data, error} = await supabase
            .from("profiles")
            .select();
        
        if(error){
            console.error(error);
            return
        }

        this.profiles = data;
        console.log(this.profiles)
        }
    }
})