<template>
  <HeaderComponent />
  <div>
    <div class="flex flex-wrap">
      <div
        class="w-1/4 p-3"
        v-for="character in combinedData"
        :key="character.id"
      >
        <div class="bg-white border border-gray-400 rounded-lg shadow-lg">
          <div class="p-5">
            <img
              :src="`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`"
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
              Préstamo: {{ character.loan?.amount || "N/A" }}
            </p>
            <p class="text-gray-600 font-medium mt-2">
              Fecha de vencimiento: {{ character.loan?.due_date || "N/A" }}
            </p>
            <p class="text-gray-600 font-medium mt-2">
              Pago mensual: {{ character.loan?.monthly_payment || "N/A" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, computed } from "vue";
import users from "../../bankData.json";
import HeaderComponent from "./HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
  setup() {
    const characters = ref([]);
    const combinedData = computed(() => {
      return characters.value.map((character) => {
        let user = {};
        for (let i = 0; i < users.users.length; i++) {
          if (users.users[i].name === character.name) {
            user = { ...user, ...users.users[i] };
            break;
          }
        }
        return {
          ...character,
          ...user,
        };
      });
    });

    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        characters.value = data.results;
      });

    return {
      characters,
      combinedData,
    };
  },
};
</script>