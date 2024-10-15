export class FreePromise{
    /*
    var a = new FreePromise()
    await a.promise
    a.resovle()
    */
    constructor(){
        this.promise = new Promise((resovle,reject)=>{
            this.promise_resovle=resovle
            this.promise_reject = reject
        })
    }
    resolve(arg){
        this.promise_resovle(arg)
    }
    reject(arg){
        this.promise_reject(arg)
    }
}