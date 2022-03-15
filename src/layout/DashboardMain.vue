<template>
<div id="app">
    <div id="main">
        <div id="sidebar" class="active">
            <div class="sidebar-wrapper active">
                <div class="sidebar-header">
                    <div class="d-flex justify-content-between">
                        <div class="logo">
                            <a href="index.html"><img src="#" alt="Logo"
                                    srcset=""></a>
                        </div>
                        <div class="toggler">
                            <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                        </div>
                    </div>
                </div>
                <div class="sidebar-menu">
                    <ul class="menu">
                        <li class="sidebar-title">Menu</li>

                        <!-- <li class="sidebar-item active">
                            <a href="#" class='sidebar-link'>
                                <i class="bi bi-grid-fill"></i>
                                <span>Dashboard</span>
                            </a>
                        </li> -->

                        <li class="sidebar-item active">
                            <a href="/member/inventory" class='sidebar-link'>
                                <i class="bi bi-grid-fill"></i>
                                <span>Inventory</span>
                            </a>
                        </li>

                        <!-- <li class="sidebar-item">
                            <a href="/member/service" class='sidebar-link'>
                                <i class="bi bi-grid-fill"></i>
                                <span>Service</span>
                            </a>
                        </li>

                        <li class="sidebar-item  has-sub">
                            <a href="#" class='sidebar-link'>
                                <i class="bi bi-stack"></i>
                                <span>Components</span>
                            </a>
                            <ul class="submenu ">
                                <li class="submenu-item ">
                                    <a href="component-alert.html">Alert</a>
                                </li>
                                <li class="submenu-item ">
                                    <a href="component-badge.html">Badge</a>
                                </li>
                            </ul>
                        </li> -->

                        <li class="sidebar-item" style="padding-top: 20px;">
                            <!-- <form action="#" method="POST"> -->
                                <!-- <a href="/logout" class='sidebar-link'> -->
                                    <button type="submit" @click="logout" class="sidebar-link" style="border: 0pt;">
                                        <i class="bi bi-box-arrow-left"></i>
                                        <span>Logout</span>
                                    </button>
                                <!-- </a> -->
                            <!-- </form> -->
                        </li>
                    </ul>
                </div>
                <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>
        <router-view></router-view>
        
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'

    export default {
        name: "dashboard-main",
        methods: {
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
    }
    }
    
</script>

<style scoped>

</style>