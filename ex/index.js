import { cfg } from "../mb_cfg/main"

import {urlparse} from './urlparse'
import {vuetool} from './vuetools'
import {network} from './network.js'
import {code} from './code'
// import validate from './validate'
import  {collection} from  './collection'
import  {os} from './os'
import {get_validator} from './validator'
import {rabbit} from  './rabbit'
import {FreePromise} from './promise'
import {obj_control} from './obj'
import {old} from './old'
var ex ={}

Object.assign(ex,urlparse)
Object.assign(ex,network)
Object.assign(ex,vuetool)
Object.assign(ex,code)
// Object.assign(ex,validate)
Object.assign(ex,collection)
Object.assign(ex,rabbit)
Object.assign(ex,obj_control)
Object.assign(ex,old)

ex.os = os
ex.vld = get_validator()
ex.FreePromise=FreePromise

// window.ex = ex
export default ex
