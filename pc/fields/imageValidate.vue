<template>
    <div class="image-validate">
        <!-- <zeroDiv class="validate-input"> -->
            <!-- <input  type="text" v-model='inn_value'> -->
        <!-- </zeroDiv> -->
        <zeroDiv  class="validate-input">
            <input   type="text" v-model='inn_value'>
        </zeroDiv>
      
        <!-- <div >  -->
            <img @click="updateCode" class="validate-image" :src="image_url" alt="">
       <!-- </div> -->
    </div>
</template>

<script>
import zeroDiv from 'weblib/uis/zeroDiv.vue'
export default {
    components:{
        zeroDiv,
    },
    props:{
        value:{},
        getCode:{},
        vkey:{}
    },
    data(){
        return {
            inn_value:this.value,
            image_url:'',
        }
    },
    mounted(){
        this.updateCode()
    },
    watch:{
        inn_value(nv){
            this.$emit('input',nv)
        },
        value(nv){
            this.inn_value = nv
        }
    },
    methods:{
        async updateCode(){

            var resp = await this.getCode()
            this.image_url = resp.image
            this.$emit('update:vkey',resp.key)
        }
    }
}
</script>


<style scoped lang='scss'>
.image-validate{
    display: flex;
    position: relative;
    height: 100%;

    .validate-input{
        // height: 100%;
        // width: 100%;
        flex-grow: 10;
        margin-right: 10px;
        position: relative;
        height: 100%;
        // width: auto;
        // flex-grow: 10;
        input{
          position: absolute;
          margin: 0;


          left: 0;
          top:0;
          width:100%;
          height:100%;
          border: none;
          outline: none;
        }
    }
    .validate-image{
        width: 70px;
        height: 100%;
        flex-grow: 0;
    }
}
</style>