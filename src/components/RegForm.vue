<template>
  <h1>Opret en bruger</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
import { ref } from "vue";
const email = ref("");
const password = ref("");
const register = () => {

    
};

const signInWithGoogle = () => {



};
</script>
