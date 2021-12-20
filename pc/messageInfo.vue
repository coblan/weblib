<template>
    <div>
        <div v-for='(row,index) in messages' :key="index">{{row}}</div>
    </div>
</template>
<script>

export default {
    props:{
        messages:{}
    }
}
</script>