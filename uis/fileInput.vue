<template>
    <input class='file-input' type='file' @change='on_change($event)'>
</template>
<script>
export default{
    props:{
        value:{},
        name:{},
    },
    data(){
        return {
            files: []
        }
    },
    watch: {
        value: function (v) {
            // when input clear selected file, Component file-input need clear too.
            // Brower prohebit to set to Un-none string
            if (v == '') {
                // debugger
                // $(this.$el).val('')
              this.$el.value = ''
                //this.$el.value = v
            }
        }
        ,
    },
    methods: {
        select(){
            // this.$el.querySelector('input').click()
            this.$el.click()
        },
        on_change: function (event) {
            this.files = event.target.files
            this.$emit('input', this.files)
        },
        clear:function(){
            // debugger
            // $(this.$el).val('')
            this.$el.value = ''
        }
    }
}
</script>