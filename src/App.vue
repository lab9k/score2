<template>
  <v-app>
    <v-content>
      <Graph />
    </v-content>
  </v-app>
</template>

<script>
import Graph from './components/Graph';

export default {
  name: 'App',
  components: {
    Graph
  },
  data() {
    return {
      //
    };
  }
};
</script>
