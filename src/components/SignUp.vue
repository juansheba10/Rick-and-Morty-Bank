<template>
  <div class="h-screen flex">
    <div
      class="
        hidden
        lg:flex
        w-full
        lg:w-1/2
        login_img_section
        justify-around
        items-center
      "
    >
      <div class="bg-black opacity-20 inset-0 z-0"></div>
      <div class="w-full mx-auto px-20 flex-col items-center space-y-6">
        <h1 class="text-white font-bold text-4xl font-sans">Simple App</h1>
        <p class="text-white mt-1">The simplest app to use</p>
        <div class="flex justify-center lg:justify-start mt-6">
          <a
            href="#"
            class="
              hover:bg-indigo-700 hover:text-white hover:-translate-y-1
              transition-all
              duration-500
              bg-white
              text-indigo-800
              mt-4
              px-4
              py-2
              rounded-2xl
              font-bold
              mb-2
            "
            >Get Started</a
          >
        </div>
      </div>
    </div>
    <div
      class="
        flex
        w-full
        lg:w-1/2
        justify-center
        items-center
        bg-white
        space-y-8
      "
    >
      <div class="w-full px-8 md:px-32 lg:px-24">
        <form
          @submit.prevent="signUp"
          class="bg-white rounded-md shadow-2xl p-5"
        >
          <h1 class="text-gray-800 font-bold text-2xl mb-1">Sign Up!</h1>
          <p class="text-sm font-normal text-gray-600 mb-8">Welcome!!</p>
          <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              class="pl-2 w-full outline-none border-none"
              type="email"
              placeholder="Email Address"
              v-model="email"
              id="email"
            />
          </div>
          <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
            <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          class="pl-2 w-full outline-none border-none"
          type="password"
          placeholder="Password"
          v-model="password"
          id="password"
        />
      </div>
          <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
            <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          class="pl-2 w-full outline-none border-none"
          type="password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
          id="confirmPassword"
        />
      </div>
      <!-- Show error message if there's one -->
      <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
      <button
        type="submit"
        class="
          block
          w-full
          bg-indigo-600
          mt-5
          py-2
          rounded-2xl
          hover:bg-indigo-700 hover:-translate-y-1
          transition-all
          duration-500
          text-white
          font-semibold
          mb-2
        "
      >
        Sign up
      </button>
      <div class="flex justify-between mt-4">
        <span
          class="
            text-sm
            ml-2
            hover:text-blue-500
            cursor-pointer
            hover:-translate-y-1
            duration-500
            transition-all
          "
          >Forgot Password ?</span
        >

        <PersonalRouter
          :route="route"
          :buttonText="buttonText"
          text="Have an account? Log In."
        />
      </div>
    </form>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
const userFetched = ref(false);

// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      
      await useUserStore().signUpAndAssignAccount(email.value, password.value);
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}



onMounted(async () => {
  try {
    await useUserStore().fetchUser();
    userFetched.value = true;
  } catch (error) {
    console.log(error);
  }
});
</script>
  <style></style>