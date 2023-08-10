<template>
  <div class="front-page">
    <form @submit.prevent="register">
      <ul class="tab-group">
        <li class="tab"><a href="#signup">Sign Up</a></li>
        <li class="tab"><a href="#login">Log In</a></li>
      </ul>
      <h2>Sign Up</h2>

      <div class="name">
        <input
          placeholder="First name"
          type="text"
          id="firstName"
          v-model="firstName"
          required
        />
        <input
          placeholder="Last name"
          type="text"
          id="lastName"
          v-model="lastName"
          required
        /><br /><br />
      </div>
      <div class="info">
        <input
          placeholder="Email"
          type="email"
          id="email"
          v-model="email"
          required
        /><br />
        <input
          placeholder="Password"
          type="password"
          id="password"
          v-model="password"
          required
        /><br /><br />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase/config.js";

export default {
  name: "FrontPage",
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
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  justify-content: center;
}

.tab {
  text-decoration: none;
  background-color: #1ab188;
}

li a {
  text-decoration: none;
  color: white;
  padding: 15px;
  display: block;
  width: 250px;
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

.name {
  width: 500px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: auto;
  margin-bottom: 20px;
}
</style>
