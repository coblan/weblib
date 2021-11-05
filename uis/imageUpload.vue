<template>
    <div>
        <fileInput ref='loader' v-model='myimages'></fileInput>
        <button @click="selectFile">点我</button>
        <button @click="upload">上传</button>
        <slot></slot>
    </div>
</template>
<script>
import fileInput from './fileInput.vue'
export default {
    components:{
        fileInput
    },
    props:{
        uploadUrl:{},
        
    },
    data(){
        return {
            myimages:[]
        }
    },
    mounted(){

    },
    methods:{
        selectFile(){
            this.$refs.loader.select()
        },
        // upload(){
        //     ex.uploadfile(this.myimages,)
        // }

    }
}
</script>
