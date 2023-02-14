<template>
  <HeaderComponent />
  <div class="max-w-sm mx-auto">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="transferMoney"
    >
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="fromAccount">
          Desde cuenta
        </label>
        <select
          id="fromAccount"
          v-model="selectedFromAccount"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
        >
          <option
            v-for="account in accounts"
            :key="account.account_number"
            :value="account"
          >
            {{ account.name }} - {{ account.account_number }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="toAccount">
          Hacia cuenta
        </label>
        <select
          id="toAccount"
          v-model="selectedToAccount"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
        >
          <option
            v-for="account in accounts"
            :key="account.account_number"
            :value="account"
          >
            {{ account.name }} - {{ account.account_number }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="amount">
          Cantidad
        </label>
        <input
          id="amount"
          type="number"
          v-model="amount"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-medium
            py-2
            px-4
            rounded
            focus:outline-none focus:shadow-outline
          "
          type="submit"
        >
          Transferir
        </button>
      </div>
    </form>
  </div>
</template>
  
<script >
import HeaderComponent from "./HeaderComponent.vue";
import fs from "fs";
import bankData from "../../bankData.json";

export default {
  components: {
    HeaderComponent,
  },
  data() {
    return {
      accounts: bankData.users,
      selectedFromAccount: null,
      selectedToAccount: null,
      amount: 0,
    };
  },
  methods: {
    transferMoney() {
      const fromAccount = this.selectedFromAccount;
      const toAccount = this.selectedToAccount;
      const amount = this.amount;
      if (!fromAccount) {
        alert("Por favor selecciona una cuenta de origen");
        return;
      }
      if (!toAccount) {
        alert("Por favor selecciona una cuenta de destino");
        return;
      }
      if (amount <= 0) {
        alert("La cantidad debe ser mayor a 0");
        return;
      }
      if (fromAccount.balance < amount) {
        alert("La cuenta de origen no tiene suficiente saldo");
        return;
      }
      fromAccount.balance -= amount;
      toAccount.balance += amount;
      this.selectedFromAccount = null;
      this.selectedToAccount = null;
      this.amount = 0;
      alert(
        `Transferencia exitosa ${fromAccount.balance} y ${toAccount.balance}`
      );
      this.writeToJSONFile();
    },
    writeToJSONFile() {
      fs.writeFile(
        "bankData.json",
        JSON.stringify({ users: this.accounts }),
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    },
  },
};
</script>
  