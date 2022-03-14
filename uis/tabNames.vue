<template>
    <div class="tab-names" :style="mysytle">
        <div class="item" v-for="option in options" :key="option.name" @click='onClick(option)' 
            :class="{active:value==option.name}">{{option.label}}</div>
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
                this.value = op.name
            }
           
        }
    }
}
</script>
<style scoped lang='scss'>
.tab-names{
    display: flex;

    .item{
        cursor: pointer;
        padding: 4px 6px;
    }
}
.active{
    color: var(--active_color);
}

.big1{
    font-size: 110%;
    .item{
        padding: 5px 8px;
    }
}
</style>
