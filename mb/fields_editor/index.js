import linetext from './linetext.vue'
import myselect from './myselect.vue'
import phone from './phone.vue'
import validateCode from './validateCode.vue'

Vue.component('com-field-linetext',linetext)
Vue.component('com-field-select',myselect)
Vue.component('com-field-phone',phone)
Vue.component('com-field-validate-code',validateCode)

Vue.component('com-field-address', async (resolve, reject)=> {
    var com = await import(/* webpackChunkName: 'fields_import' */'./address.vue')
    resolve(com.default)
})