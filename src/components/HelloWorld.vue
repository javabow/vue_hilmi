<template>
  <div>Bye World {{ laugh }} !</div>
  <div v-text="name"></div>
  <div v-html="html_directive"></div>
  <h2 v-bind:id="kepala">Header ini</h2>
  <h2 class="underline" v-bind:class="status">jajaja</h2>
  <button v-bind:disabled="isDisabled">WKWKWK</button>
  <h2 v-bind:class="isCorrect && 'correct'">if only correct</h2>
  <h2 v-bind:class="isCorrect ? 'correct' : 'wrong'">with else</h2>
  <h2 v-bind:class="[isDisabled && 'underline', isCorrect ? 'correct' : 'wrong']">with array</h2>
  <h2 v-bind:style="{'color': styleBindColor, 'font-size': styleBindFontSize + 'px'}">Ini Style Bind</h2>
  <div v-bind:style="[baseStyleObject, failedStyleObject]">double style object overwrite with the last</div>
  <div v-bind:style="[baseStyleObject, successStyleObject]">double style object overwrite with the last</div>
  <template v-if="!isDisabled && user == null">
   <p>wkwkkw</p>
   <p>if else condition</p>
   <p>v-if remove the html from DOM</p>
  </template>
  <div v-show="!isDisabled && user == null">
   <p>mean while v-show can't be placed on template tag and if trigger add display: none to the attached html tag</p>
  </div>
  <template v-for="name in arrayOfNames" :key="name">
    <h2>{{ name }}</h2>
    <hr />
  </template>
  <h2>Method {{ someMethod(4) }}</h2>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      arrayOfNames: ['Hilmi', 'Farhan', 'Dika'],
      laugh: "wkwk",
      name: "Hilmi",
      htmlDirective: "<b>Hahaha</b>",
      kepala: 'heading',
      status: 'success',
      isDisabled: false,
      isCorrect: true,
      styleBindColor: 'Blue',
      styleBindFontSize: 50,
      baseStyleObject: {
        paddingTop: '10px',
        border: '1px solid black',
      },
      successStyleObject: {
        color: 'green',
        paddingTop: '20px',
      },
      failedStyleObject: {
        color: 'red',
        paddingTop: '20px',
      },
      user: null,
    };
  },
  methods: {
    someMethod(num) {
      return num * this.styleBindFontSize;
    }
  }
  // components: {
  //   HelloWorld
  // }
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
