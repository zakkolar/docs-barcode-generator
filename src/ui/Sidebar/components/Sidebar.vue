<template>
    <div class="sidebar branding-below">
        <div class="form-group block">
            <label for="text">Barcode text</label>
            <debounce-input element="input" type="text" id="text" v-model="text"></debounce-input>
            <vue-barcode
                    v-on:barcodeDataUrlChanged="updateBarcodeDataUrl"
                    v-if="text"
                    element-tag="canvas"
                    :value="text"
                    :width="settings.width"
                    :height="settings.height"
                    :displayValue="settings.displayValue"
                    :text-margin="settings.textMargin"
                    :font-size="settings.fontSize"
                    :margin="settings.margin"
            ></vue-barcode>
        </div>

            <div class="form-group block" v-for="(value, key) of settings">
                <label :for="key"> {{key}}</label>
                    <debounce-input :id="key" v-model="settings[key]" element="input" type="text" >

                    </debounce-input>


            </div>
            <div class="form-group block">
                <label>Scale:</label>
                <input type="text" v-model="scale">
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
                text:"Barcode...",
                barcodeDataUrl: null,
                loading: false,
                scale: 0.8,
                settings:{
                    width: 2,
                    height: 100,
                    displayValue: true,
                    textMargin: 2,
                    fontSize: 20,
                    margin: 10
                }
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
                    .insertBarcode(this.barcodeDataUrl, this.text, this.scale);
            }
        }
    }
</script>
<style lang="scss">
</style>
