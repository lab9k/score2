<template>
  <div id="app">
    <Graph />
  </div>
</template>

<script>
  import Graph from './components/Graph';
  export default {
    name: 'App',
    components: {
      Graph
    }
  };
</script> 

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  html,
  body {
    margin: 0;
    padding: 0;
  }
</style>
