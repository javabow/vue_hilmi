<template>

<div class="row">
            <div class="col-md-6">
                <p>
                    ahhahahaha
                </p>
            </div>
            <div class="col-md-6">
                <p>
                    ahhahaha
                </p>
            </div>
            
        </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('token') == null) {
            return next('Login');
        }
        next();
    }
};
</script>

<style scoped></style>
