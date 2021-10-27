<template>
    <div class="list-com">
        <slot v-bind:rows="rows">

        </slot>
        <el-pagination
            layout="prev, pager, next"
            :page-size='pageSize'
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
        this.innGetData()
    },
    methods:{
        pageChange(page){
            this.current_page = page
            this.innGetData()
        },
        async innGetData(){
            var resp = await this.getData({pageSize:this.pageSize,currentPage: this.current_page,})
            this.rows= resp.rows
            this.current_page= resp.current_page
            this.total=resp.total

        }
    }

}
</script>
