<template>
    <div class="field-select">
        <van-field
            readonly
            clickable
            :name="head.name"
            :value="showlabel"
            :label="head.label"
            :placeholder="head.placeholder || '请选择'"
            @click="showPicker = true"
            />

            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
                />
            </van-popup>
    </div>
</template>

<script>
import ex from '../../ex';

    export default {
        props:{
            head:{},
            row:{},
        },
        data(){
            return {
                value:'',
                showPicker:false,
                // columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            }
        },
        computed:{
            columns(){
                return ex.map(this.head.options,item=>{
                    return item.label
                })
            },
            showlabel(){
                var value = this.row[this.head.name]
                var one = ex.findone(this.head.options,{value:value})
                if(one){
                    return one.label
                }else{
                    return ''
                }
                
            }
        },
        methods:{
            onConfirm(e){
                var one = ex.findone(this.head.options,{label:e})
                if(one){
                    this.$set(this.row,this.head.name,one.value)
                }else{
                    this.$set(this.row,this.head.name,'')
                }
            
                this.showPicker = false
            }
        }
    }
</script>

<style scoped lang="scss">
    // .field-select{
        // display: flex;
        // align-content: center;
    // }
    // .my-draw-icon{
    //     padding: 0 5px;
    //     background-color: white;
    //     display: inline-block;
    // }
</style>