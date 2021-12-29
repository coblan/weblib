<template>
    <div class="list-com">
        <slot v-bind:rows="rows" v-bind:loaded="loaded" v-if="show_rows">
        </slot>
        <slot name="empty" v-if="rows.length==0 && loaded"></slot>
<!--        <slot name="nomore" v-if="rows.length==0 && loaded">-->
<!--          <slot name="empty" ></slot>-->
<!--        </slot>-->
        <el-pagination
            class="pagination"
            v-if="paginate"
            layout="prev, pager, next"
            :page-size='pageSize'
            :current-page="current_page"
            @current-change='pageChange'
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
// import Vue from 'vue';
// import { Pagination } from 'element-ui';
//
// Vue.component(Pagination.name, Pagination);

export default {
    props:{
        pageSize:{
            default:20
        },
        getData:{},
        paginate:{
          default: ()=>true
      }
    },
    data(){
        return {
            rows:[],
            current_page:1,
            total:0,
            loaded:false,
        }
    },
    mounted(){
        // this.updateData()
    },
  computed:{
      show_rows(){
        if(!this.$slots.empty){
          return  true
        }
        if(!this.loaded){return  true}
        if (this.rows.length >0){return true}
        return  false
      }
  },
    methods:{
        pageChange(page){
            this.current_page = page
            this.updateData()
        },
        async search(){
            this.current_page =1
            return await this.updateData()
        },
        async updateData(){
            var resp = await this.getData({pageSize:this.pageSize,pageIndex: this.current_page,})
            this.loaded=true
            this.rows= resp.rows
            this.total=resp.total
            if(resp.pageIndex){
              this.current_page= resp.pageIndex
            }
            this.$emit('row-updated',this.rows)

        }
    }

}
</script>
<style scoped lang="scss">
.pagination{
  text-align: right;
}
</style>
