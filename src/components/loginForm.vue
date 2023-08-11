<template>
  <div class="loginForm">
    <form @submit.prevent="register">
      <ul class="tab-group">
        <li class="tab "><a href="#signup">SIGN UP</a></li>
        <li class="tab active"><a href="#login">LOG IN</a></li>
      </ul>
      <h2>Login</h2>

      <div class="info">
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
      <button type="submit">LOG IN</button>
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

    const register = async () => {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        const user = userCredential.user;

        // Update user's display name with first name and last name
        await user.updateProfile({
          displayName: `${firstName.value} ${lastName.value}`,
        });

        console.log("User registered:", user);
        alert("Registration successful!");
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please check your inputs and try again.");
      }
    };

    return {
      email,
      password,
      firstName,
      lastName,
      register,
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
