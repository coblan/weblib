<template>
    <el-form :model="row" ref="innForm" :label-width="labelWidth"  >
          <!-- <el-form-item :error="error.username"  prop="username">
            <el-input
                placeholder="请输入手机号码"
                prefix-icon="el-icon-phone-outline"
                v-model="row.username">
            </el-input>
          </el-form-item>
          <el-form-item :error="error.password"  prop="password">
            <passwordInput v-model="row.password" placeholder="请输入密码"></passwordInput>
          </el-form-item> -->

        <el-form-item :error="error[head.name]" v-for="head in normed_heads" :label="head.label" :key="head.name"
                      :rules="head.rules"
                      :prop="head.name">
            <component v-if="head.bind" :is="head.editor" v-bind="head.bind" v-model="row[head.name]"></component>
            <component v-else :is="head.editor" :head="head" :row="row"></component>
        </el-form-item>
     </el-form>
</template>

<script>
import ex from 'weblib/ex'
export default {
    props:  {
      heads:{},
      row:{},
      error:{},
      labelWidth:{
        // default:"0"
      }
    } ,
  data(){
      return {

      }
  },
  computed:{
    elForm(){
      return this.$refs.innForm
    },
    proxy(){
      // 代理到下级组件
      var self = this
      return new Proxy(this.$refs.innForm,{
        get: function(obj, prop) {
          if(prop in self){
            return  self[prop]
          }else if(prop in obj){
            return  obj[prop]
          }else if(obj.proxy){
            return  obj.proxy[prop]
          }
        }
      })
    },
    normed_heads(){
      return ex.filter(this.heads,head=>{
        if(head.show_fun){
          return head.show_fun({row:this.row})
        }else{
          return  true
        }
      })
    }
  },
  methods:{
    async validate(){
         var resp =   await this.$refs.innForm.validate()
        return resp
      }

  }
}
</script>
