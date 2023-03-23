<template>
  <HeaderComponent />
  <div class="max-w-md mx-auto">
    <form
      class="bg-white shadow-lg rounded-lg p-8 mb-4"
      @submit.prevent="transferMoney"
    >
      <div class="mb-6">
        <label class="block text-gray-700 font-semibold mb-2" for="fromAccount">
          Desde cuenta
        </label>
        <select
          id="fromAccount"
          v-model="selectedFromAccount"
          class="
            shadow
            appearance-none
            border
            rounded-lg
            w-full
            py-2
            px-4
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
        >
          <option
            v-for="account in accounts"
            :key="account.id"
            :value="account"
          >
            {{ account.name }} - {{ account.account_number }}
          </option>
        </select>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-semibold mb-2" for="toAccount">
          Hacia cuenta
        </label>
        <select
          id="toAccount"
          v-model="selectedToAccount"
          class="
            shadow
            appearance-none
            border
            rounded-lg
            w-full
            py-2
            px-4
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
        >
          <option
            v-for="account in accounts"
            :key="account.id"
            :value="account"
          >
            {{ account.name }} - {{ account.account_number }}
          </option>
        </select>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-semibold mb-2" for="amount">
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
            rounded-lg
            w-full
            py-2
            px-4
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
            font-semibold
            py-2
            px-4
            rounded-lg
            focus:outline-none focus:shadow-outline
          "
          type="submit"
        >
          Transferir
        </button>
      </div>
    </form>
    <div
      v-if="showAlert"
      class="
        p-4
        mb-4
        text-sm text-green-800
        rounded-lg
        bg-green-100
        border border-green-400
        dark:bg-gray-800 dark:text-green-400
      "
      role="alert"
    >
      <span class="font-semibold">¡Transferencia exitosa!</span>
    </div>
  </div>
</template>


<script>
import { defineComponent, ref } from "vue";
import { useAccountStore } from "../stores/bankAccountStore";
import { useTransferStore } from "../stores/transfers.js";
import HeaderComponent from "./HeaderComponent.vue";

export default defineComponent({
  name: "TransferComponent",
  components: {
    HeaderComponent,
  },
  setup() {
    const accounts = ref([]);
    const selectedFromAccount = ref(null);
    const selectedToAccount = ref(null);
    const amount = ref(0);
    const showAlert = ref(false);
    const accountStore = useAccountStore();
    const transferStore = useTransferStore();

    async function readFromStore() {
      accounts.value = await accountStore.fetchAccounts();
      return accounts;
    }
    readFromStore();

    const transferMoney = async () => {
      const fromAccount = selectedFromAccount.value;
      const toAccount = selectedToAccount.value;
      const transferAmount = amount.value;
      
      if (!fromAccount) {
        alert("Por favor selecciona una cuenta de origen");
        return;
      }
      if (!toAccount) {
        alert("Por favor selecciona una cuenta de destino");
        return;
      }
      if (transferAmount <= 0) {
        alert("La cantidad debe ser mayor a 0");
        return;
      }
      if (fromAccount.balance < transferAmount) {
        alert("La cuenta de origen no tiene suficiente saldo");
        return;
      }

      const transferData = {
        from_account_id: fromAccount.id,
        from_account_name: fromAccount.name,
        to_account_id: toAccount.id,
        to_account_name: toAccount.name,
        amount: transferAmount,
        date: new Date().toISOString(),
      };

      try {
        await transferStore.addTransfer(transferData);
      } catch (error) {
        console.log(error);
      }

      fromAccount.balance -= transferAmount;
      toAccount.balance += transferAmount;
      selectedFromAccount.value = null;
      selectedToAccount.value = null;
      amount.value = 0;

      try {
        await accountStore.saveAccounts();
        showAlert.value = true;
        setTimeout(() => {
          showAlert.value = false;
        }, 3000);
      } catch (error) {
        console.log(error);
      }
      await accountStore.fetchAccounts();
    };

    return {
      accounts,
      selectedFromAccount,
      selectedToAccount,
      amount,
      transferMoney,
      showAlert,
    };
  },
});
</script>



<style scoped>
button {
  min-width: 10rem;
  margin-right: 0.5rem;
}
@media screen and (max-width: 960px) {
  button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>