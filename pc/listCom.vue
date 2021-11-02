<template>
    <div class="list-com">
        <slot v-bind:rows="rows">

        </slot>
        <el-pagination
            layout="prev, pager, next"
            :page-size='pageSize'
            :current-page="current_page"
            @current-change='pageChange'
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
import Vue from 'vue';
import { Pagination } from 'element-ui';

Vue.component(Pagination.name, Pagination);

export default {
    props:{
        pageSize:{
            default:20
        },
        getData:{}
    },
    data(){
        return {
            rows:[],
            current_page:1,
            total:0,
        }
    },
    mounted(){
        // this.updateData()
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
            this.rows= resp.rows
            this.total=resp.total
            if(resp.pageIndex){
              this.current_page= resp.pageIndex
            }

        }
    }

}
</script>
