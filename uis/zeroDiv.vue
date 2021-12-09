<template>
  <div class="zero-div">
    <div class="inn-wrap">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.zero-div{
  position: relative;
}
.inn-wrap{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>