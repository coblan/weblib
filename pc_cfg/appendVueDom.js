import Vue from 'vue'
// import cfg from "../mb_cfg";
export  function append_vue_dom (editor,ctx,option={}){
    // row,head ->//model_name,relat_field
    var pop_id =new Date().getTime()

    //Create the element using the createElement method.
var myDiv = document.createElement("div");

//Set its unique ID.
myDiv.id = `vue-dom-${pop_id}`

// //Add your content to the DIV
// myDiv.innerHTML = "<h1>Hello World!</h1>";

//Finally, append the element to the HTML body
document.body.appendChild(myDiv);

if(option){
    option.close=()=>{
        var dom = document.getElementById('vue-dom-'+pop_id)
        if(dom){
           dom .remove();
        }
       
    }
}

    return new Promise((resolve,reject)=>{
        new Vue({
            store:cfg.store,
            router:cfg.router,
            el:'#vue-dom-'+pop_id,
            data:{
                ctx:ctx,
                component_name:editor,
            },
            render(createElement){
                return createElement(this.component_name,{
                    attrs:{
                        id:'vue-dom-'+pop_id,
                        ...this.ctx,
                        // ctx:this.ctx
                    },
                        on:{
                            finish:this.on_finish
                        }
                }
    
                    )
            },
            methods:{
                on_finish:function(e){
                    resolve(e)
                    document.getElementById('vue-dom-'+pop_id).remove();
                }
            }
        })
    })
        

    
}


