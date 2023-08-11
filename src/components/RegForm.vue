<!--Mit template er den del af min vue kode som indeholder min HTML del.-->
<template>
  <div class="front-page">
    <div>
      <img class="logo float" src="../assets/logo.png" />
    </div>
    <!--Dette er min HTML formular med en Vue eventlytter som lytter efter når jeg klikker på min sumbit knap eller trykker enter.-->
    <form @submit.prevent="handleFormSubmit">
      <ul class="tab-group">
        <li class="tab" :class="{ active: !showLoginForm }">
          <a href="#signup" @click="showLoginForm = false">Sign Up</a>
        </li>
        <li
          class="tab"
          :class="{ active: showLoginForm }"
          @click="showLoginForm = true"
        >
          <a href="#login">Log In</a>
        </li>
      </ul>
      <h2 v-if="!showLoginForm">Sign up</h2>

      <div class="register" v-if="!showLoginForm">
        <input
          placeholder="Email*"
          type="email"
          id="email"
          v-model="email"
          required
        /><br />
        <input
          placeholder="Password*"
          type="password"
          id="password"
          v-model="password"
          required
        /><br /><br />
      </div>
      <button type="submit" v-if="!showLoginForm">CREATE</button>

      <h2 v-if="showLoginForm">Login</h2>

      <!-- Conditionally render the login form -->
      <div class="login" v-if="showLoginForm">
        <input
          placeholder="Email*"
          type="email"
          id="login-email"
          v-model="loginEmail"
          required
        /><br />
        <input
          placeholder="Password*"
          type="password"
          id="login-password"
          v-model="loginPassword"
          required
        /><br /><br />
      </div>
      <button type="submit" v-if="showLoginForm">LOG IN</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase/config.js";

export default {
  name: "regForm",
  setup() {
    const email = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");

    const loginEmail = ref("");
    const loginPassword = ref("");
    const showLoginForm = ref(false);

    const handleFormSubmit = async () => {
      if (showLoginForm.value) {
        // Handle login
        try {
          await auth.signInWithEmailAndPassword(
            loginEmail.value,
            loginPassword.value
          );
          console.log("Login is successful");
          alert("Login successful!");
        } catch (error) {
          console.error("Login error:", error);
          alert("Login failed. Please check your credentials and try again.");
        }
      } else {
        // Handle registration
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
          const user = userCredential.user;
          await user.updateProfile({
            displayName: `${firstName.value} ${lastName.value}`,
          });
          console.log("User registered:", user);
          alert("Registration successful!");
        } catch (error) {
          console.error("Registration error:", error);
          alert("Registration failed. Please check your inputs and try again.");
        }
      }
    };

    return {
      email,
      password,
      firstName,
      lastName,
      loginEmail,
      loginPassword,
      showLoginForm,
      handleFormSubmit,
    };
  },
};
</script>

<!--Min styling som pt. er lavet i CSS3 skal laves om til tailwind-->
<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}

.front-page {
  color: white;
  background: rgba(19, 35, 47, 0.9);
  padding: 40px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
}

img {
  width: 100px;
  height: 100px;
  margin-bottom: 50px;
}

.float {
  animation: floating 3s ease-in-out infinite; /* Use the "floating" animation */
}

@keyframes floating {
  0% {
    transform: translateY(0); /* Start at the original position */
  }
  50% {
    transform: translateY(-15px); /* Move up */
  }
  100% {
    transform: translateY(0); /* Return to the original position */
  }
}

.tab-group {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  justify-content: center;
}

.tab {
  text-decoration: none;
  background-color: rgba(160, 179, 176, 0.25);
}

.active {
  background-color: #6ac259;
}

.active:hover {
  transition: 0.5s ease;
  background-color: #6ac259;
  opacity: 0.8;
}

li a {
  text-decoration: none;
  color: white;
  padding: 15px;
  display: block;
  width: 250px;
}

input {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
  padding: 5px 10px;
  color: white;
  border-radius: none;
  font-size: 22px;
  width: 400px;
}

input:focus {
  outline: none;
  transition: 0.5s ease;
  border: 1px solid #6ac259;
}

button {
  color: white;
  width: 250px;
  padding: 15px;
  background-color: #6ac259;
  outline: none;
  border: 0;
  cursor: pointer;
}

button:hover {
  transition: 0.5s ease;
  background-color: #6ac259;
  opacity: 0.8;
}
</style>
