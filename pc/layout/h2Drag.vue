<template>
  <div class="h2-drag">
    <div class="left" :style="myleft">
      <slot name="left"></slot>
    </div>
    <div class="resize"></div>
    <div class="right" :style="myRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
import ex from 'weblib/ex'
export default {
  props:{
    fixLeft:{}, // 固定左边
    initLeft:{}, // 左边初始值
    saveName:{},
    fixRight:{} // 固定右边
  },
  computed:{
    myleft(){
      if(this.fixLeft ){
        return {
          'flexGrow':0,
          'flexShrink':0
        }
      }else{
        return {
              'flexGrow':10,
             
          }
      }
    },
    myRight(){
      if(this.fixRight){
          return {
              'flexGrow':0,
              'flexShrink':0
          }
      }
    }
  },
  mounted(){
   
    var self = this
      var resize = this.$el.querySelector(".resize");
      var left = this.$el.querySelector(".left");
      var right = this.$el.querySelector(".right");
      var box = this.$el;
    if(this.initLeft){
      left.style.width = this.initLeft
    }
      resize.onmousedown = function(e){
        var startX = e.clientX;
        resize.left = resize.offsetLeft;
        document.onmousemove = function(e){
          var endX = e.clientX;

          var moveLen = resize.left + (endX - startX);
          var maxT = box.clientWidth - resize.offsetWidth;
          if(moveLen<10) moveLen = 10;
          if(moveLen>maxT-10) moveLen = maxT-10;

          resize.style.left = moveLen;

          left.style.width = moveLen + "px";
          right.style.width = (box.clientWidth - moveLen - 5) + "px";

          // if(self.fixLeft){
          //   left.style.width = moveLen + "px";
          // }else if(self.fixRight){
          //   left.style.width ='auto'
          //   right.style.width = (box.clientWidth - moveLen - 5) + "px";
          // }else{
          //   left.style.width = moveLen + "px";
          //   right.style.width = (box.clientWidth - moveLen - 5) + "px";
          // }
          

        }
        document.onmouseup = function(evt){
          document.onmousemove = null;
          document.onmouseup = null;
          resize.releaseCapture && resize.releaseCapture();
          if(self.saveName){
            if(self.fixLeft){
              ex.localSet(self.saveName,{
              left: left.style.width,
              // right:right.style.width
              })
            }else if(self.fixRight){
                left.style.width = 'auto'
               ex.localSet(self.saveName,{
                  // left: left.style.width,
                    right:right.style.width
                  })
            }else{
              ex.localSet(self.saveName,{
                left: left.style.width,
                right:right.style.width
              })
            }
            
          }
        }
        resize.setCapture && resize.setCapture();
        return false;
      }
      if(self.saveName){
          var size= ex.localGet(self.saveName,{})
          if(self.fixLeft){
            left.style.width = size.left;
          }else if(self.fixRight){
            right.style.width = size.right;
          }else{
            left.style.width = size.left;
            right.style.width = size.right;
          }
         
      }
  },
  methods:{
    restoreSize(){

    }
  }
}
</script>
<style scoped lang="scss">

//.box{
//  width:600px;
//  height:500px;
//  overflow:hidden;
//}
.h2-drag{
  display: flex;
  height: 100%;
  background-color: white;
}
.left{

  height:100%;
  overflow: auto;
  position: relative;
  //background:skyblue;
  //float:left;
}

.resize{
  width:5px;
  height:100%;
  cursor: w-resize;
  background-color: #f4f4f4;
  flex-grow: 0;
  flex-shrink: 0;
  //float:left;
}

.right{
  overflow: auto;
  position: relative;
  //float:right;
  //width:70%;
  height:100%;
  flex-grow: 10;
  //background:tomato;
}
</style>