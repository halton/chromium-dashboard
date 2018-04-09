<template>
  <div id="app">
    <ChromiumDashboard/>
  </div>
</template>

<script>
import ChromiumDashboard from './components/ChromiumDashboard.vue'

export default {
  name: 'app',
  components: {
    ChromiumDashboard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
