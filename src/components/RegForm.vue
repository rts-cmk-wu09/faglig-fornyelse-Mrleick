<template>
  <div class="front-page">
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
      <h2 v-if="!showLoginForm">Sign Up</h2>

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
          console.log("User logged in successfully");
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



<style scoped>
.front-page {
  color: white;
  background: rgba(19, 35, 47, 0.9);
  padding: 40px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
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
  background-color: #1ab188;
}

.active:hover {
  transition: 0.5s ease;
  background-color: rgba(26, 177, 136, 0.8);
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
  border: 1px solid rgba(26, 177, 136, 0.8);
}

button {
  color: white;
  width: 250px;
  padding: 15px;
  background-color: #1ab188;
  outline: none;
  border: 0;
  cursor: pointer;
}

button:hover {
  transition: 0.5s ease;
  background-color: rgba(26, 177, 136, 0.8);
}
</style>
