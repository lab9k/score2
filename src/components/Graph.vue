<template>
  <p>graph</p> 
</template>
 
<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Graph",
  data() {
    return {};
  },
  computed: {
    ...mapState([]),
    ...mapGetters([])
  },
  mounted() {},
  methods: {}
};
</script> 

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>