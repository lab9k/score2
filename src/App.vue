<template>
  <v-app>
    <!-- <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SCORE</span>
        <span class="font-weight-light">Visualizer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar> -->

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
