<template>
  <header>
    <nav class="z-10 w-11/12 ">
            <div class="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
                <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" class="hidden peer">
                <div class="relative z-20 w-full ml-16 flex justify-between lg:w-max md:px-0">
                    <a  aria-label="logo" class="flex space-x-2 items-center">
                        <div aria-hidden="true" class="flex space-x-1">
                            <img class="h-12 w-12" src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png" alt="">
                        </div>
                        <PersonalRouter text="Rick and Morty" :route="route2" class="block md:px-4 transition hover:text-primary" />
                    </a>
                    
                    <div class="relative flex items-center lg:hidden max-h-10">
                        <label role="button" for="toggle_nav" aria-label="humburger" id="hamburger" class="relative  p-6 -mr-6">
                            <div aria-hidden="true" id="line" class="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                            <div aria-hidden="true" id="line2" class="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                        </label>
                    </div>
                </div>
                <div aria-hidden="true" class="fixed z-10 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"></div>
                <div class="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                            lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                            peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                            dark:shadow-none dark:bg-gray-800 dark:border-gray-700">
                   
                    <div class="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                        <ul class="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                            <li>
                                <PersonalRouter text="Transferencias" :route="route3" class="block md:px-4 transition hover:text-primary" />
                            </li>
                            <li>
                                <PersonalRouter text="Cuentas" :route="route2" class="block md:px-4 transition hover:text-primary" />
                            </li>
                            <li>
                                <a href="#testimonials" class="block md:px-4 transition hover:text-primary">
                                    <span>Testimonials</span>
                                </a>
                            </li>
                            <li>
                                <a href="#blog" class="block md:px-4 transition hover:text-primary">
                                    <span>Blog</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-12 lg:mt-0">
                        <a @click="signOut"
                            href="#"
                            class="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-blue-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                            >
                            <span class="relative text-sm font-semibold text-white"
                                >Log Out</span
                            >
                        </a>
                    </div>
                </div>
            </div>
    </nav>
</header>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";

//CONST PARA USAR LA TIENDA DEL USUARIO PARA HACER MI SIGN OUT
const route = "/";
const route1 = "/profile";
const route2 = "/accounts";
const route3 = "/transfers";
const user = useUserStore();
//Función para hacer sign-out
// Error Message
const errorMsg = ref("");
// Router to push user to SignedIn component
const redirect = useRouter();
// Arrow function to SignOut User
const signOut = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await user.signOut();
    // redirects user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>