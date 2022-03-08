<template>
    <div class="login-form">
        <form @submit.prevent="postLogin" method="post">
            <h3 class="text-center">Login</h3>       
            <div class="form-group" :style="formStyle">
                <input v-model="formData.email" type="text" class="form-control" placeholder="👤 Email" required="required">
            </div>
            <div class="form-group" :style="formStyle">
                <input v-model="formData.password" :type="passwordFieldType" class="form-control" placeholder="🔑 Password" required="required">
                <a href="#" @click="switchVisibility">show / hide</a>
            </div>
            <div class="clearfix" :style="formStyle">
                <label class="float-left form-check-label"><input type="checkbox"> Remember me</label>
            </div>
            <div class="form-group" :style="formStyle">
                <button type="submit" class="btn btn-primary btn-block">Log in</button>
            </div>
            <div class="clearfix" :style="formStyle">
                <a href="#" class="float-right">Lupa Password Anda ?</a>
            </div>
        </form>
        <!-- <p class="text-center"><a href="#">Create an Account</a></p> -->
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'

    export default {
        data() {
            return {
                formStyle: {
                    paddingTop: 15 + "px",
                },
                formData :{
                    email: "",
                    password: "",
                },
                password: "",
                passwordFieldType: "password"
            }
        },
        methods: {
            switchVisibility() {
                this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
            },
            postLogin(){
                axios
                .get('http://localhost:8000/sanctum/csrf-cookie')
                .then(response => {
                    console.log(response)
                    axios
                    .request({
                        url: 'http://127.0.0.1:8000/api/login',
                        method: 'post',
                        data: this.formData,
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    .then((response) => {
                        localStorage.setItem("loggedIn", "true")
                        localStorage.setItem("token", response.data.access_token)
                        // console.log(response);
                        return this.$router.push({ name: 'Dashboard' })
                    })
                    .catch((error) => {
                        console.log(error.message)
                        Swal.fire("Invalid Login Details !")
                    })
                })
                
            }
        },
        beforeRouteEnter(to, from, next) {
            if (localStorage.getItem('token') != null) {
                return next('Dashboard');
            }
            next();
        }
    }
</script>

<style scoped>
.login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
}
.login-form {
    width: 340px;
    margin: 50px auto;
    font-size: 15px;
}

</style>