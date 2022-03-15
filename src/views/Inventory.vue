<template>

    <div class="row">
        <div class="col-md-2" style="padding-bottom: 20px;">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addInventoryModal">Add Data +</button>
        </div>
        <div class="col-md-12">
            <JlDatatable
                :url='datatable.url'
                :columns="datatable.columns"  

                :requestOptions="datatable.requestOptions"
                :lengthMenu="datatable.lengthMenu"
                :isLengthMenu="datatable.isLengthMenu"
                :pageLength="datatable.pageLength"
                :isSearch="datatable.isSearch"
                :isSort="datatable.sortDt"
                :sortDt="datatable.sortDt"
                :isReload="datatable.isReload"

                @countPageChanged="onCountPageChanged"
                @search="onSearch"

                @gettingEntries="onGettingEntries"
                @entriesFetched="onEntriesFetched"

                @columnClicked="onColumnClicked"

                @prevPaginated="onPaginate"
                @nextPaginated="onPaginate"
                @paginated="onPaginate"

                @error="error"
                
            />
        </div>
    </div>
    <div class="modal fade" id="addInventoryModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <form @submit.prevent="addInventoryItem">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Add Inventory
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
                                    placeholder="Nama Barang" v-model="formDataAdd.nama_barang" required>
                                <div class="valid-feedback">
                                    <i class="bx bx-radio-circle"></i>
                                    Valid
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="harga">Harga</label>
                                <input type="number" class="form-control" id="harga" name="harga"
                                    placeholder="Harga Barang" v-model="formDataAdd.harga"
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
                                    v-model="formDataAdd.stok"
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
                            <span class="d-none d-sm-block">Add</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- <buttons @fire-edit="btnEditFire"></buttons> -->
</template>

<script>
import Buttons from '../components/ButtonAction.vue';
import axios from 'axios'
import Swal from 'sweetalert2'
export default {

    // components: {
    //     Buttons
    // },
    // watch: {
    //     dataProduct(){
    //         alert('wkwkwk');
    //         // this.nama_barang = "jajajaja";
    //     }
    // },
    data() {
        return {
        // dataProduct: {},
            formDataAdd :{
                nama_barang: "",
                harga: "",
                stok: "",
            },
            nama_barang: "wkwkwk",    
        datatable: {
            url: 'http://127.0.0.1:8000/api/data-product',
            requestOptions: {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer '+localStorage.getItem('token'),              
            }
            },
            lengthMenu: [10, 15, 20, 50, 120],
            pageLength: 10,
            isSearch: true,
            isLengthMenu: true,
            isSort: true,
            isReload: true,
            sortDt:{
            sortBy: 'nama_barang',
            sort: 'ASC'
            },
            columns: [       
                {
                title: 'ID',
                key: 'id',
                isSort: true,            
                width: '5%'
            },   
            {
                title: 'Nama Barang',
                key: 'nama_barang',
                isSort: true,
                isSearch: true,
                // width: '10%'
            },
            // {
            //     title: 'Last Name',
            //     key: 'last_name',
            //     isSort: false,
            //     isSearch: false,
            //     // width: '10%'
            // },
            // {
            //     title: 'Email',
            //     key: 'email',
            //     isSort: false,
            //     isSearch: true,
            //     // width: '10%'
            // },
            // {
            //     title: 'Address',
            //     key: 'address',                        
            // },
            // {
            //     title: 'Cell Phone',
            //     key: 'cell_phone',  
            //     width: '10%'                      
            // },
            {
                title: 'Actions',            
                key: 'id',
                isAction: true,
                component: Buttons
            }
            ]
        }
        }
    },
    methods: {
        addInventoryItem(){
            const token = localStorage.getItem('token')
                axios
                .get('http://127.0.0.1:8000/sanctum/csrf-cookie')
                .then(response => {
                    console.log(response)
                    axios
                    .request({
                        url: 'http://127.0.0.1:8000/api/product-insert',
                        method: 'post',
                        data: this.formDataAdd,
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer '+token,
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        Swal.fire("Berhasil Add Data !")
                        this.$router.go()
                    })
                    .catch((error) => {
                        console.log(error.message)
                        Swal.fire("gagal add data !")
                    })
                })
                
        },
        onCountPageChanged(countPage){
        alert(countPage);
        },
        onSearch(search){
        alert(search);
        },
        onGettingEntries(request){
        console.log(request);
        },
        onEntriesFetched(fetched){
        console.log(fetched.request);
        console.log(fetched.data);
        },
        onColumnClicked(data){
        console.log(data);
        },
        onPaginate(url){
        console.log(url);
        },
        error(err){
        console.log(err);
        },
    },
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('token') == null) {
            return next('Login');
        }
        next();
    }
};
</script>

<style scoped></style>
