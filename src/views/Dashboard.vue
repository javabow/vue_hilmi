<template>
    <div>
        <h1>Welcome this is Quote Section</h1>
        <hr />
        <div style="padding-bottom: 75px;"></div>
        <button  @click="getQuote">Generate Quote</button>
        <div style="padding-bottom: 25px;"></div>
        <template v-for="data_quote in quoteData.eachQuote" :key="data_quote">
            <template v-for="quote in data_quote.json_data" :key="quote">
                <h2>{{ quote }}</h2>
                <hr />
            </template>
        </template>
        <div style="padding-bottom: 75px;"></div>
        <button  @click="singleQuote">Generate a single Quote</button>
        <h1 v-text="quoteSingle"></h1>
        <div style="padding-bottom: 75px;"></div>
        <button  @click="logout">Logout</button>
    </div>
</template>

<script>

    import axios from 'axios'
    import Swal from 'sweetalert2'

    export default {
        beforeMount(){
            this.getQuote()
        },
        data() {
            return {
                quoteSingle: "",
                // quoteData :{
                //     quote: [],
                // },
                quoteData: [
                    {
                        eachQuote: []
                    }
                ],
            }
        },
        methods: {
            singleQuote(){
                const token = localStorage.getItem('token')
                axios
                .request({
                    url: 'http://127.0.0.1:8000/api/quote-single',
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+token,
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.quoteSingle = response.data.json_data.quote
                    Swal.fire("berhasil get quote !")
                })
                .catch((error) => {
                    console.log(error.message)
                    Swal.fire("Error get quote !!")
                })
                
            },
            getQuote(){
                const token = localStorage.getItem('token')
                axios
                .request({
                    url: 'http://127.0.0.1:8000/api/quote-show',
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+token,
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.quoteData.eachQuote = response
                    Swal.fire("berhasil get quote !")
                })
                .catch((error) => {
                    console.log(error.message)
                    Swal.fire("Error get quote !!")
                })
                
            },
            logout(){
                const token = localStorage.getItem('token')
                axios
                .request({
                    url: 'http://127.0.0.1:8000/api/logout',
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+token,
                    }
                })
                .then((response) => {
                    console.log(response)
                    Swal.fire("berhasil logout !")
                    localStorage.removeItem('loggedIn');
                    localStorage.removeItem('token');
                    return this.$router.push({ name: 'Login' })
                })
                .catch((error) => {
                    console.log(error.message)
                    Swal.fire("Error logout !!")
                })
                
            }
        },

        beforeRouteEnter(to, from, next) {
            if (localStorage.getItem('token') == null) {
                return next('Login');
            }
            next();
        }
    }

</script>

<style scoped>

</style>