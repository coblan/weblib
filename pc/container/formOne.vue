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

        <el-form-item :error="error[head.name]" v-for="head in heads" :label="head.label" :key="head.name"
                      :rules="head.rules"
                      :prop="head.name">
            <component :is="head.editor" :head="head" :row="row"></component>
        </el-form-item>
     </el-form>
</template>

<script>
export default {
    props:  {
      heads:{},
      row:{},
      error:{},
      labelWidth:{
        default:0
      }
    } ,
  data(){
      return {

      }
  },
  computed:{
    elForm(){
      return this.$refs.innForm
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
