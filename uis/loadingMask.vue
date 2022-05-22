<template>
    <div class="loading-mask">
      <div class="bg">

      </div>
        <!-- <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i> -->
        <i class="el-icon-loading" style="font-size:26px"></i>
    </div>
</template>
<style scoped lang='scss'>
.loading-mask{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(250,250,250,.5);

  .bg{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    filter: blur(2px);
  }
}
</style>
