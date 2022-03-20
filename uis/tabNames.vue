<template>
    <div class="tab-names" :style="mysytle">
      <div style="display: contents" v-for="option in options" :key="option.name">
        <component class="action" v-if="option.editor" :is="option.editor" v-bind="option.bind"></component>
        <div v-else class="action"  @click='onClick(option)'
             :class="{active:value==option.name}">{{option.label}}</div>
      </div>

    </div>
</template>

<script>
export default {
    props:{
        options:{},
        value:{},
        activeColor:{
            default:'#fa524c'
        }
    },
    computed:{
        mysytle(){
            // console.log(this.$listeners)
            return {
              '--active_color':this.activeColor
            }
        },
    },
    methods:{
        onClick(op){
            if(this.$listeners.action){
                this.$emit('action',op)
            }else{
                // this.value = op.name
                this.$emit('input',op.name)
            }
           
        }
    }
}
</script>
<style scoped lang='scss'>
.tab-names{
    display: flex;
    justify-content: space-between;
    .action{
        cursor: pointer;
        padding: 4px 6px;
    }
}
.vertical{
  flex-direction: column;
}
.active{
    color: var(--active_color);
}

.big1{
    font-size: 110%;
    .action{
        padding: 5px 8px;
    }
}
</style>
