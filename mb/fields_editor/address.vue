<template>
    <div>
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
            <van-area 
            title="" 
            :area-list="areaList" 
            :columns-num="head.columns"
            @confirm="onConfirm"
            value="110101" />
        </van-popup>
        
    </div>

</template>
<script>
    import { areaList } from '@vant/area-data';
    export default {
        props:{
            head:[],
            row:[]
        },
        data() {
            return {
                 areaList ,
                 showPicker:false,
                 showlabel:this.row[this.head.name]|| '',
            }
        },
        methods:{
            onConfirm(e){
                debugger
                this.head.after_select(e)
                this.showPicker = false
                this.showlabel = e[e.length-1].name
            }
        }
    }
</script>