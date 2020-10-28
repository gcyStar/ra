/**
 * Created by chunyang.gao on 17/3/13.
 */

//check obj是否是generator
export  function isGenerator(obj) {
    return 'function' ==typeof  obj.next && 'function' ==typeof obj.throw;
}

export function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}
function isPromise(obj) {
    return 'function' == typeof obj.then;
}
function isObject(val) {
    return Object == val.constructor;
}
