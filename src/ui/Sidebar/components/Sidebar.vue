<template>
    <div class="sidebar branding-below">
        <div class="form-group block">
            <label for="text">Barcode text</label>
            <debounce-input element="input" type="text" id="text" v-model="text"></debounce-input>
            <vue-barcode v-on:barcodeDataUrlChanged="updateBarcodeDataUrl" v-if="text" element-tag="canvas" :value="text"></vue-barcode>
        </div>
        <div class="inline">
            <button :disabled="!barcodeDataUrl || loading" class="blue" @click="insertBarcode">Insert barcode</button>
            <loader v-if="loading"></loader>
        </div>
    </div>
</template>

<script>
    import VueBarcode from "./VueBarcode";
    import DebounceInput from "./DebounceInput.vue";
    import Loader from "./Loader.vue";
    export default {
        data(){
            return {
                text:"",
                barcodeDataUrl: null,
                loading: false
            }
        },
        components:{
            VueBarcode,
            DebounceInput,
            Loader,
        },
        methods:{
            updateBarcodeDataUrl(url){
                this.barcodeDataUrl = url;
            },
            insertBarcode(){
                this.loading = true;
                google.script.run
                    .withSuccessHandler(()=>{
                        this.loading = false;
                    })
                    .withFailureHandler(()=>{
                        this.loading = false;
                    })
                    .insertBarcode(this.barcodeDataUrl, this.text);
            }
        }
    }
</script>
<style lang="scss">
</style>
