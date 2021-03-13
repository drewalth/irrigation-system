<template>
  <div class="app">
    <h1>Irrigation System</h1>
    <button @click="valveOpen = !valveOpen" :class="{'active': valveOpen}">
      <template v-if="valveOpen">
        Close Valve
      </template>
      <template v-else>
        Open Valve
      </template>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import http from "@/http"
@Options({
  props: {
    msg: String
  },
  data: () => ({
    valveOpen: false
  }),
  watch: {
    valveOpen: {
      async handler(val) {
        try {
          if(val) {
            await http.get('/valve-close').then(res => res.data)
          } else {
            await http.get('/valve-open').then(res => res.data)
          }
        } catch (error) {
          console.log(`error`, error)
        }
      }
    }
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<style scoped lang="scss">
.app {
  font-family: sans-serif;
  h1 {
    font-size: 2.5rem;
  }
  button {
    height: 50px;
    width: 150px;
    font-size: 1.25rem;
    border-radius: 0;
    border: none;
    background-color: #48C9B0;
    color: #FDFEFE;
    &.active {
      background-color: #5DADE2;
    }
  }
}
</style>
