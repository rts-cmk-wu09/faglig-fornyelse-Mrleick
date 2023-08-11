<template>
  <div id="app">
    <regForm />
  </div>
</template>

<script>
import regForm from '@/components/Regform.vue';

export default {
  name: 'App',
  components: {
    regForm,
  },
};
</script>

<style>
body{
  background: #c1bdba;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
