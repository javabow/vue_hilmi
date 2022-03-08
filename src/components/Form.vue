<template>    
                            <form @submit.prevent="createPost" method="post" id="form_event_edit" class="form_event_edit">
                                <div class="row">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card">
                                            <img class="img-fluid" src="@/assets/enhaii.png"/>
                                            <div class="card-body">
                                                <h2 style="font-weight: bold;">FORMULIR WHISTLE BLOWING SYSTEM</h2>
                                                <p>Form ini ditujukan kepada organisasi, guna pengungkapan tindakan pelanggaran atau perbuatan yang melawan hukum.</p>
                                                <div class="row">
                                                    <div class="col-md-12" :style="[formStyle]">
                                                        <label for="unit_kerja" class="req_form">Unit Kerja yang dilaporkan</label>
                                                        <input v-model="formData.unit_kerja" type="text" class="form-control" id="unit_kerja" name="unit_kerja"
                                                            placeholder="Unit kerja yang akan anda laporkan" required>
                                                        <div class="valid-feedback">
                                                            <i class="bx bx-radio-circle"></i>
                                                            Valid
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" :style="[formStyle]">
                                                        <label for="report_name" class="req_form">Nama Pelapor</label>
                                                        <input v-model="formData.report_name" type="text" class="form-control" id="report_name" name="report_name"
                                                            placeholder="Your Name" required>
                                                        <div class="valid-feedback">
                                                            <i class="bx bx-radio-circle"></i>
                                                            Valid
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" :style="[formStyle]">
                                                        <label for="report" class="req_form">Uraian Laporan</label>
                                                        <textarea v-model="formData.report" class="form-control" id="client" name="client" placeholder="Uraikan atau jelaskan isi terhadap laporan anda"
                                                            required />
                                                        <div class="valid-feedback">
                                                            <i class="bx bx-radio-circle"></i>
                                                            Valid
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" :style="[formStyle]">
                                                        <button type="submit" class="btn btn-primary ml-1">
                                                            <i class="bx bx-check d-block d-sm-none"></i>
                                                            <span class="d-none d-sm-block">Kirim</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                    </div>
                                    
                                </div>

                                
                            </form>
                        
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    export default {
        name: 'API',
        data() {
            return {
                formData :{
                    report: "",
                    report_name: "",
                    unit_kerja: "",
                },
                // posts: [],
                //style
                formStyle: {
                    paddingTop: '20px',
                }
            }
        },
        methods: {
            createPost() {
                axios
                // .post('http://api.farhandika.com:8000/api/report/insert', this.formData)
                .request({
                    url: 'http://api.farhandika.com:8000/api/report/insert',
                    method: 'post',
                    data: this.formData,
                    // baseURL: 'https://preview-deliver.kenticocloud.com/PROJECT_ID',
                    headers: {
                        'Authorization': 'Bearer 2|C6pY3DKPIkIEtdeMV2TgUj0NE73y2ZXH4KZ8cp1Z',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    console.log(response);
                    Swal.fire('Success !!!');
                })
                .then((error) => console.log(error))
            }
        }


    }
</script>

<style scoped>

label {
    font-weight: bold;
    font-size: 20px;
}

.req_form::after {
    color: red;
    content: " *";
}

</style>