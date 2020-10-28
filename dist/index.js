var ra =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.run = run;
exports.runPromise = runPromise;

var _thunk = __webpack_require__(1);

var _util = __webpack_require__(2);

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 执行thunk
 * @param genFn(generator)
 */
/**
 * Created by chunyang.gao on 17/3/13.
 */
function run(genFn) {
    var ctx = this;
    var args = [].slice.call(arguments, 1);

    if (!util.isGeneratorFunction(genFn)) {
        throw new TypeError('you need to be pass a generator function ');
    }
    var gen = genFn.apply(ctx, args);

    var next = function next(value) {
        var ret = gen.next(value);
        if (ret.done) return;
        // ret.value  function done
        ret.value(function (val) {

            next(val); //yield next
        });
    };
    next();
}

run.toTK = _thunk.toThunk;
/**
 * 执行promise
 * @param gen(generator)
 * @returns {flow}
 */
function runPromise(gen) {
    var hander_error_ = [];

    function flow() {

        var iter_ = gen();

        var next_ = function next_(data) {
            var result = iter_.next(data);

            if (!result.done) {

                result.value.then(function (data) {
                    next_(data);
                }).catch(function (err) {
                    hander_error_.forEach(function (handler) {
                        if (typeof handler == 'function') {
                            handler(err);
                        }
                    });
                });
            }
        };
        next_();
        return flow;
    };
    return flow;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toThunk = toThunk;
/**
 * Created by chunyang.gao on 17/3/13.
 */
function toThunk(fn) {

    return function () {

        var args = [],
            ctx = this;

        for (var i = 0, len = arguments.length; i < len; i++) {
            args[i] = arguments[i];
        }
        return function (done) {
            var called = false;

            args.push(function () {
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });
            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        };
    };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isGenerator = isGenerator;
exports.isGeneratorFunction = isGeneratorFunction;
/**
 * Created by chunyang.gao on 17/3/13.
 */

//check obj是否是generator
function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

function isGeneratorFunction(obj) {
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);