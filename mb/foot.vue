<template>
    <!-- <div class="footer-btn-pannel"> -->
        <van-tabbar class="footer-btn-pannel" 
            v-model="myactive" :placeholder='true' :border='false'>
             <!-- @click.stop="on_click(item)" -->
            <van-tabbar-item v-for="item in items" :key="item.name" :icon="item.icon"  >
                <span v-text="item.label"></span>
                <template v-if='item.active_icon' v-slot:icon='slotProps'>
                    <div style="flex-grow:100">
                        <img v-if='slotProps.active' :src="item.active_icon" alt="">
                        <img v-else  :src="item.icon" alt="">
                    </div>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    <!-- </div> -->

</template>
<script>
    export default{
        props:{
            items:{
                default:()=>{return []}
            },
            value:{}
            // activeName:{
            //     default:0,
            // }
        },
        data(){
           
          return {
            //   myactive:active_index
          }
        },
        computed:{
            myactive:{
                get(){
                     let active_index = this.items.indexOf(ex.findone(this.items,{name:this.value}))
                    return active_index
                },
                set(nv){
                    this.$emit('input',this.items[nv].name)
                }
            }
        },
        // watch:{
        //     myactive(nv){
        //         this.$emit('input',this.items[nv].name)
        //     }
        // }
        
        // methods:{
        //     on_click(item){
        //         this.myactive = this.items.indexOf(ex.findone(this.items,{name:this.activeName}))
        //         this.$emit('trigger',item)
        //         if(item.click_express){
        //             ex.eval(item.click_express,{head:item,vc:this})
        //         }
        //     },
        // }
    }
</script>

<style scoped lang="scss">
    


    .com-top-footer-btn-pannel{
        position: relative;
        height: 49px;
        width: 100%;
        /*top: calc( var(--app-height) - 50px);*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: 0;*/
    }
</style>