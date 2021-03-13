<template>
  <div class="app">
    <h1>Irrigation System</h1>
    <template v-if="loading">
      establishing connection...
    </template>
    <template v-else-if="connected">
      <button @click="valveOpen = !valveOpen" :class="{'active': valveOpen}">
      <template v-if="valveOpen">
        Close Valve
      </template>
      <template v-else>
        Open Valve
      </template>
    </button>
    </template>
    <template v-else>
     Error: Failed to connect.
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import {openValve, closeValve, ping} from "@/controllers"
@Options({
  props: {
    msg: String
  },
  data: () => ({
    valveOpen: false,
    connected: false,
    loading: false
  }),
  watch: {
    valveOpen: {
      async handler(val) {
        try {
          if(val) {
            await closeValve()
          } else {
            await openValve()
          }
        } catch (error) {
          console.log(`error`, error)
        }
      }
    }
  },
  methods: {
    async pingSystem () {
      try {
        await ping()
        this.connected = true
      } catch (error) {
        console.log(`error`, error)
      }
    }
  },
  created() {
    this.pingSystem()
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<style scoped lang="scss">
.app {
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
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
