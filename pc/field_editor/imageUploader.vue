<template>
  <div class="image-uploader">
    <fileInput ref="fl" style="display: none" v-model="myfiles"></fileInput>
    <i @click="selectFile" v-if="!image_src" class="el-icon-picture-outline open-btn"></i>
    <img v-if="image_src" :src="image_src" alt="">
    <div v-if="image_src" class="close-btn" @click="clear()">
      <i class="el-icon-close"></i>

    </div>

  </div>
</template>
<script>
import fileInput from 'weblib/uis/fileInput'
import ex from 'weblib/ex'
export  default  {
  components:{
    fileInput
  },
  props:{
    uploadUrl:{
      default:'/d/upload'
    },
    value:{},
    // head:{},
    // row:{},
    // value:{
    //   default:()=>''
    // },
    // uploadurl:{
    //   default:()=>'/home/upload'
    // },
  },
  data(){
    return {
      myfiles:[],
      image_src:this.value
    }
  },
  watch:{
    value(nv){
      this.image_src = nv

    },
    async myfiles(nv){
      if(nv.length ==0){
        return
      }
      cfg.show_load()
      var resp =  await ex.uploadFile(this.uploadUrl,nv[0])
      this.image_src=resp.data[0]
      // this.row[this.head.name] = this.image_src
      this.$emit('input',this.image_src)
      cfg.hide_load()
    },
  },

  methods:{
    selectFile(){
      this.$refs.fl.select()
    },
    // addtime_media_url(url){
    //   if(this.addTime){
    //     return ex.appendSearch(media_url(url),{t:Date.now()})
    //   }else{
    //     return media_url(url)
    //   }
    //
    // },
    clear(){
      this.myfiles=[]
      this.image_src=''
      this.$emit('input',this.image_src)
      // this.row[this.head.name] = this.image_src
    }
  }
}
</script>
<style scoped lang="scss">
.image-uploader{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 124px;
  width: 200px;
  background-color: #eeeded;
  border-radius: 5px;

  img{
    max-height: 100%;
    max-width: 100%;
  }
}
.open-btn{
  font-size: 30px;
  cursor: pointer;
}
.close-btn{
  position: absolute;
  top: -11px;
  right: -29px;
  font-size: 25px;
  cursor: pointer;

}

</style>
