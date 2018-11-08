<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs4 v-for="c in selectables" :key="c.name">
                <v-checkbox :label="c.name" v-model="c.checked" @change="select(c.name)"></v-checkbox>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import { mapState, mapGetters } from 'vuex';
    import types from '../store/types';

    export default {
      name: 'CitySelection',
      data() {
        return {};
      },
      methods: {
        city(index) {
          return this.cities[index];
        },
        is_selected(index) {
          return this.selected_cities.find(this.cities[index]) !== undefined;
        },
        select(name) {
          this.$store.commit(types.SELECT_CITY, name);
        }
      },
      computed: {
        ...mapState([]),
        ...mapGetters(['cities', 'selected_cities']),
        selectables() {
          return this.cities.map(c => ({
            name: c,
            checked: this.selected_cities.findIndex(e => e === c) >= 0
          }));
        }
      }
    };
</script>
<style>
    .v-input--selection-controls {
      margin: 0;
      padding: 0;
    }
</style>


