<template>
<div>{{ countTotal }}</div>
  <template v-if="!hideForm">
    
    <div>
    <pre>
      {{ JSON.stringify(formValues, null, 2) }}
    </pre>
    </div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name </label>
        <input type="text" id="name" v-model.trim.lazy="formValues.name">
      </div>
      <div>
        <label for="description">Description </label>
        <textarea name="description" id="description" v-model="formValues.description"></textarea>
      </div>
      <div>
        <label for="province">Provinsi </label>
        <select id="province" multiple="true" v-model.number="formValues.province">
          <option value="1">Jawa Timur</option>
          <option value="2">Jawa Tengah</option>
          <option value="3">Jawa Barat</option>
          <option value="4">Lampung</option>
        </select>
      </div>
      <div>
        <button type="submit">
          Send
        </button>
      </div>
    </form>
  </template>
  <template v-else>
    <p>Terimakasih atas laporannya !!! :D</p>
  </template>
  <template v-for="item in filterPrice" :key="item.id">
    <h2>{{ item.itemName }}, {{ item.price }}</h2>
  </template>
</template>

<script>
// import { computed } from '@vue/runtime-core';
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      formValues: {
        name: "",
        description: "",
        province: []
      },
      hideForm: false,
      itemArray: [
        {
          id: 1,
          itemName: 'Ayam',
          price: 2000,
        },
        {
          id: 2,
          itemName: 'Daging Sapi',
          price: 4000,
        },
        {
          id: 3,
          itemName: 'Daging Kambing',
          price: 3000,
        },
        {
          id: 4,
          itemName: 'Daging Kelinci',
          price: 3500,
        }
      ]
    };
  },
  methods: {
    submitForm() {
      console.log('Form Values', this.formValues);
      if (this.formValues.name != null) {
        this.hideForm= true;
      }
    }
  },
  //for reuse 
  computed: {
    countTotal(){
      return this.itemArray.reduce((total_price, curr) => (total_price = total_price + curr.price), 0)
    },
    filterPrice(){
      return this.itemArray.filter( item => item.price > 3000 )
    }
  },
  //most used for api change
  watch: {

  }
  // components: {
  //   // HelloWorld
  //   computed
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
