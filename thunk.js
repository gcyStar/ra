/**
 * Created by chunyang.gao on 17/3/13.
 */
export function toThunk(fn) {

    return function () {

        let args=[],ctx=this;

        for(let i=0,len=arguments.length;i<len;i++){
            args[i]=arguments[i];
        }
        return function (done) {
            let called=false;

            args.push(function () {
                if(called)return;
                called=true;
                done.apply(null,arguments);
            });
            try {
                fn.apply(ctx,args);
            }catch (err){
                done(err);
            }

        }
    }

}