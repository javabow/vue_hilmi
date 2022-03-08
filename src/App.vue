<template>
  <div id="app" class="container">
    <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/form">Form</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>

// import header from './components/Header.vue'
// import footer from './components/Footer.vue'


export default {

  name: 'App',
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  //for reuse 
  computed: {
    
  },
  //most used for api change
  watch: {

  },
  components: {
    // 'myHeader': header,
    // 'myFooter': footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.underline {
  font-style: italic;
}

.correct {
  font-weight: bold;
  color: green;
}

.wrong {
  font-weight: bold;
  color: red;
}
</style>
