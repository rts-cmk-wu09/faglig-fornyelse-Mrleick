<!-- mit template tag er en del af Vue.js og bruges til at definere komponentens visuelle struktur i HTML, hvilket 
gør det nemmere at organisere min html kode.-->
<template>
  <div class="front-page">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label for="email">Email:</label><br />
      <input type="email" id="email" v-model="email" required /><br /><br />

      <label for="password">Password:</label><br />
      <input
        type="password"
        id="password"
        v-model="password"
        required
      /><br /><br />

      <button type="submit">Register</button>
    </form>
  </div>
</template>
<!--HTML END-->

<script>
import { ref } from "vue";
import { auth } from "../firebase/config.js";

export default {
  name: "FrontPage",
  setup() {
    const email = ref("");
    const password = ref("");

    const register = async () => {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        console.log("User registered:", userCredential.user);
        alert("Registration successful!");

        // You can redirect the user or perform other actions here
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please check your inputs and try again.");
      }
    };

    return {
      email,
      password,
      register,
    };
  },
};
</script>


<!--Når jeg anvender scoped efter min style i Vue, styler den kun på mit pågældne komponent-->
<style scoped>
.front-page {
  text-align: center;
  padding: 50px;
}
</style>
