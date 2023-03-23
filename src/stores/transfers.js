// src/stores/transferStore.js
import { defineStore } from 'pinia';

import { supabase } from "../supabase";
export const useTransferStore = defineStore({
  id: 'transfer',
  state: () => ({
    transfers: [],
  }),
  actions: {
    async fetchTransfers() {
      try {
        const { data, error } = await supabase
          .from('transfers')
          .select('*')
          .order('transfer_id', { ascending: true });

        if (error) {
          console.error('Error al obtener las transferencias:', error);
          throw error;
        }

        this.transfers = data;
        return this.transfers;
      } catch (error) {
        console.error('Error al obtener las transferencias:', error);
      }
    },
    async addTransfer(transfer) {
      try {
        const { data, error } = await supabase
          .from('transfers')
          .insert([transfer]);

        if (error) {
          console.error('Error al agregar la transferencia:', error);
          throw new Error(error.message);
        }

        return this.transfers.push(data[0]);
      } catch (error) {
        console.error('Error al agregar la transferencia:', error);
      }
    },
  },
});
