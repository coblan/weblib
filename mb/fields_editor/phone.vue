<template>
    <div>
        <van-field
            :name="head.name"
            :label="head.label"
        >
            <template v-slot:input>
<!--                <div class="contry-code" v-if="head.country_code">-->
<!--                    +86-->

<!--                </div>-->
                <mb_select class="contry-code" v-if="head.country_code" :options="contry_options"
                           :readonly="head.readonly"
                           v-model="country_code"></mb_select>
                <input class="my-input" v-model="number_value" type="text" 
                :readonly="head.readonly"
                :placeholder="head.placeholder || '请输入手机'">
                
            </template>

        </van-field>
      <van-popup v-model="showPicker" position="bottom">

      </van-popup>
    </div>
</template>
<script>
import mb_select  from "../mb_select";
import ex from '../../ex';
    export default {
      components:{
        mb_select
      },
        props:{
            head:{},
            row:{}
        },
        data(){
            return {
                number_value:'',
                // country_code :this.head.country_code?this.head.country_code[0]:'',
                country_code:'',
                splitter:this.head.country_splitter || '-'  ,
                showPicker :false,
            }
        },
        mounted(){
            this.update_number_from_out()
        },
      computed:{
          contry_options(){
            if(this.head.country_code){
              return ex.map(this.head.country_code,(item)=>{
                return {value:item,label:item}
              })
            }else{
              return  []
            }
          }
      },
        watch:{
            number_value(nv){
                if(this.head.country_code){
                    this.row[this.head.name] = `${this.country_code}${this.splitter}${nv}`
                }else{
                    this.row[this.head.name] = nv
                }
            }
        },
        methods:{
            update_number_from_out(){
                var phone = this.row[this.head.name]
                if(phone){
                    if(this.head.country_code){
                        var ls = phone.split(this.splitter)
                        if(ls.length==2){
                            this.country_code = ls[0]
                            this.number_value = ls[1]
                        } 
                    }else{
                        this.number_value = phone
                    }
                    
                }else{
                    this.number_value = ''
                }
                
            }
        }
        
    }
</script>
<style scoped lang="scss">
    .my-input{
        background-color: inherit;
        border: none;
    }
    .contry-code{
        color: inherit;
        margin-right: 5px;
        padding-right: 5px;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            top:5px;
            bottom: 5px;
            right: 0;
            width: 1px;
            background-color: gray;
        }
    }
</style>