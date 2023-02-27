<template>
  <div class="marquee-test">
    <p class="inn-p" :class="{'overflow':overflow}">
      <slot></slot>
    </p>
  </div>
</template>
<script>
export  default  {
  data(){
    return {
      overflow:false
    }
  },
  mounted(){
    // setTimeout(()=>{
    Vue.nextTick(()=>{
      this.updateStatus()
    })

    // },1000)
  },
  methods:{
    updateStatus(){
      if(this.$el.offsetWidth < this.$el.querySelector('.inn-p').offsetWidth){
        this.overflow = true
      }
    }
  }
}
</script>
<style scoped lang="scss">
.marquee-test {
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  position: relative;
}
p.inn-p{
  display: inline-block;
  left: 100%;
}
p.overflow {
  position: absolute;
  left: 0;
  animation: marquee3 20s linear infinite;
}
@keyframes marquee {
  //0% { transform: translateX(0); }
  //50% { transform: translateX(-100%)  }
  //50.1%{top:-100px}
  //51%{transform: translateX(120%);top:0}
  //100%{transform:translateX(0)}
  //0% { transform: translateX(110%);}
  //100% { transform: translateX(-110%)  }
  //0% { left: 0; }
  //50% { right: 0; }
  //50.1%{top:-100px}
  //51%{left: 120%;top:0}
  //100%{left: 0}

  //100%{ left: 0; }
  //
  from {
    transform:translateX(10%);
  }
  to {
    transform:translateX(-140%)
  }
  //from {
  //  left: 100%;
  //}
  //to {
  //  left: -100%
  //}
}
@keyframes marquee2 {
  from {
    left: 100%;
  }
  to {
    right: 0%
  }
}
@keyframes marquee3 {
  from {
    transform:translateX(100%);
  }
  to {
    transform:translateX(-120%)
  }
}
</style>