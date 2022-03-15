<template>
    <div class="btn-group">
        <div class="col-md-6">
            <button type="button" class="btn btn-primary" @click="btnEdit" data-bs-toggle="modal" :data-bs-target="'#'+idModalEdit+row.id">Edit</button>        
        </div>
        <div class="col-md-6">        
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" :data-bs-target="'#'+idModalDelete+row.id">Delete</button>        
        </div>
    </div>
    <div class="modal fade" :id="idModalEdit+row.id" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <form @submit.prevent="updateInventoryItem">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Edit Inventory
                        </h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-md-12">
                                <label for="nama_barang">Nama Barang</label>
                                <input type="text" class="form-control" id="nama_barang" name="nama_barang"
                                    placeholder="Nama Barang" v-model="formData.nama_barang" required>
                                <div class="valid-feedback">
                                    <i class="bx bx-radio-circle"></i>
                                    Valid
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="harga">Harga</label>
                                <input type="number" class="form-control" id="harga" name="harga"
                                    placeholder="Harga Barang" v-model="formData.harga"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                                    required>
                                <div class="valid-feedback">
                                    <i class="bx bx-radio-circle"></i>
                                    Valid
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="stok">Stok</label>
                                <input type="number" class="form-control" id="stok" name="stok" placeholder="Stok Barang"
                                    v-model="formData.stok"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                                    required>
                                <div class="valid-feedback">
                                    <i class="bx bx-radio-circle"></i>
                                    Valid
                                </div>
                            </div>
                            <input type="hidden" class="form-control" id="id" name="id">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Close</span>
                        </button>
                        <button type="submit" class="btn btn-primary ml-1">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Update</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" :id="idModalDelete+row.id" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Delete Data
                        </h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-md-12">
                                <p>Hapus data ?</p>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Close</span>
                        </button>
                        <button type="button" class="btn btn-danger ml-1">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block" @click="btnDelete">Delete</span>
                        </button>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import Swal from 'sweetalert2'
// import Vue from 'vue';
// Vue.forceUpdate();

export default {    
    name: 'buttons',
    props: {
        row: Object,    
        column: Object  
    },
    data () {
        return {
        idModalEdit: "editModal",
        idModalDelete: "deleteModal",
        dataProduct: {},
            formData :{
                id: "",
                nama_barang: "",
                harga: "",
                stok: "",
            },
            nama_barang: "wkwkwk",
            formDeleteData :{
                id_delete: "",
            }
        }
    },
    methods: {
        // fireEditBtn(){
        //     let product_id = this.row.id
        //     this.$emit('fireEdit', product_id)
        //     console.log(this.row.id)
        // },
        updateInventoryItem(){
            const token = localStorage.getItem('token')
                axios
                .get('http://127.0.0.1:8000/sanctum/csrf-cookie')
                .then(response => {
                    console.log(response)
                    axios
                    .request({
                        url: 'http://127.0.0.1:8000/api/product-update',
                        method: 'post',
                        data: this.formData,
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer '+token,
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        Swal.fire("Berhasil Update !")
                        this.$router.go()
                    })
                    .catch((error) => {
                        console.log(error.message)
                        Swal.fire("gagal update !")
                    })
                })
                
        },
        btnEdit(){            
            // alert(`Edit ${this.row.id}`)
            const token = localStorage.getItem('token')
                axios
                .request({
                    url: 'http://127.0.0.1:8000/api/get-single-data-product/'+this.row.id,
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+token,
                    }
                })
                .then((response) => {
                    // console.log(response)
                    this.dataProduct = response.data
                    this.formData.nama_barang = this.dataProduct.data[0].nama_barang
                    this.formData.harga = this.dataProduct.data[0].harga
                    this.formData.stok = this.dataProduct.data[0].stok
                    this.formData.id = this.row.id
                    console.log(this.dataProduct)
                    console.log(this.nama_barang)
                    Swal.fire("berhasil !")
                })
                .catch((error) => {
                    console.log(error.message)
                    // Swal.fire("Error update !!")
                })   
        },
        btnDelete(){
            const token = localStorage.getItem('token')
            this.formDeleteData.id_delete = this.row.id
                axios
                .get('http://127.0.0.1:8000/sanctum/csrf-cookie')
                .then(response => {
                    console.log(response)
                    axios
                    .request({
                        url: 'http://127.0.0.1:8000/api/product-delete',
                        method: 'post',
                        data: this.formDeleteData,
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer '+token,
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        Swal.fire("Berhasil Delete !")
                        this.$router.go()
                    })
                    .catch((error) => {
                        console.log(error.message)
                        Swal.fire("Failed to delete !")
                    })
                })
        }
    }
}
</script>

<style scoped>

</style>