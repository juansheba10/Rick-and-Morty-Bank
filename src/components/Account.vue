<template>
  <HeaderComponent />
  <SearchBar @search="search" />
  <div>
    <div class="flex flex-wrap">
      <div
        class="w-1/4 p-3"
        v-for="character in visibleCharacters"
        :key="character.position"
      >
        <div class="bg-white border border-gray-400 rounded-lg shadow-lg">
          <div class="p-5">
            <img
              :src="`https://rickandmortyapi.com/api/character/avatar/${character.position}.jpeg`"
              alt="Avatar"
              class="w-full mx-auto mb-5 rounded-full"
            />
            <h3 class="text-lg font-medium text-gray-900">
              {{ character.name }}
            </h3>
            <p class="text-gray-600 font-medium mt-2">
              Cuenta #: {{ character.account_number }}
            </p>
            <p class="text-gray-600 font-medium mt-2">
              Saldo: {{ character.balance }}
            </p>
            <p class="text-gray-600 font-medium mt-2">
              Préstamo: {{ character?.loan_amount || "N/A" }}
            </p>
            <p class="text-gray-600 font-medium mt-2">
              Fecha de vencimiento: {{ character?.loan_due_date || "N/A" }}
            </p>
            <p class="text-gray-600 font-medium mt-2">
              Pago mensual: {{ character?.loan_monthly_payment || "N/A" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center m-8" v-if="visibleCharacters.length >= 10">
    <a
      class="
        py-2.5
        px-5
        mr-2
        mb-2
        text-sm
        font-medium
        text-gray-900
        focus:outline-none
        bg-white
        rounded-lg
        border border-gray-200
        hover:bg-gray-100 hover:text-blue-700
        focus:z-10 focus:ring-4 focus:ring-gray-200
        dark:focus:ring-gray-700
        dark:bg-gray-800
        dark:text-gray-400
        dark:border-gray-600
        dark:hover:text-white
        dark:hover:bg-gray-700
        cursor-pointer
      "
      @click="showMore"
      >Show more...</a
    >
  </div>
  <Footer />
</template>

<script>
import { ref, computed, onMounted, watchEffect } from "vue";
import HeaderComponent from "./HeaderComponent.vue";
import Footer from "./Footer.vue";
import SearchBar from "./SearchBar.vue";
import { useAccountStore } from "../stores/bankAccountStore";

export default {
  components: {
    HeaderComponent,
    Footer,
    SearchBar,
  },
  setup() {
    const characters = ref([]);
    const bankAccountStore = useAccountStore();
    const visibleCount = ref(10);
    const searchTerm = ref("");

    watchEffect(async () => {
      characters.value = await bankAccountStore.fetchAccounts();
    });

    const visibleCharacters = computed(() => {
      const search = searchTerm.value.toLowerCase();
      let filtered = characters.value.filter(
        (character) =>
          character.name.toLowerCase().includes(search) ||
          character.account_number.toLowerCase().includes(search)
      );
      if (!searchTerm.value && filtered.length > visibleCount.value) {
        filtered = filtered.slice(0, visibleCount.value);
      }
      return filtered;
    });
    function showMore() {
      visibleCount.value += 10;
      console.log(visibleCount.value);
    }

    function search(value) {
      searchTerm.value = value.toLowerCase();
      visibleCount.value = 10;
    }

    return {
      characters,
      visibleCharacters,
      showMore,
      search,
    };
  },
};
</script>
