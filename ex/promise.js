export class FreePromise{
    /*
    var a = new FreePromise()
    await a.promise
    a.resovle()
    */
    constructor(){
        this.promise = new Promise((resovle,reject)=>{
            this.promise_resovle=resovle
        })
    }
    resolve(arg){
        this.promise_resovle(arg)
    }
}