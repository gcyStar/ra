/**
 * Created by chunyang.gao on 17/3/13.
 */
import {toThunk} from './thunk';
import * as util from './util'
/**
 * 执行thunk
 * @param genFn(generator)
 */
export function run(genFn) {
    let ctx=this;
    var args = [].slice.call(arguments, 1);
    
    if(!util.isGeneratorFunction(genFn)){
        throw new TypeError('you need to be pass a generator function ');
    }
    const gen=genFn.apply(ctx,args);

    const next= value =>{
        const ret=gen.next(value);
        if(ret.done)return;
        // ret.value  function done
        ret.value((val) => {
            
            next(val);  //yield next
        });

    }
    next();
}

run.toTK=toThunk;
/**
 * 执行promise
 * @param gen(generator)
 * @returns {flow}
 */
export function runPromise(gen) {
    var hander_error_=[];

    function flow(){

        var iter_=gen();

        var next_ =(data) => {
            var result=iter_.next(data); 

            if(!result.done){
                
                result.value.then((data) => {
                    next_(data);
                }).catch(function(err){
                    hander_error_.forEach((handler) => {
                        if(typeof  handler == 'function'){
                            handler(err);
                        }
                    });
                })
            }
        };
        next_();
        return flow;

    };
    return flow;
}