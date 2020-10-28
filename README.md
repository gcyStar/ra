## ra

make you write code in a nice way through ra.

## ra@0.01

now it's just ra@0.0.1,which relies on promise or thunk .Because at the beginning, so also in the construction of perfecting

###  primary API

  * ra.run();  //thunk function invoke 
  
  ```
      ra.run(function* () {
          const msg0= yield fn('hello','world');
          console.log("msg0 "+msg0); //hello world gcy //sync cb logic
      });
  ```
  * ra.run.toTK();  //covert normal funtion to thunk
  
  ```
      function hw(h,w,cb) {
          let hwg=h+" "+w+" "+"gcy";
          cb(hwg);
      }
      let fn=ra.run.toTK(hw);
  ```
  
  * ra.runPromise();   //promise  invoke 
```
    let hra=ra.runPromise(function* () {
        console.log("begin");
        let ret=yield hwAsync('hello','world');
        console.log(ret);  //hello world gcy //sync cb logic
    });
    hra();
```
## Installation
 
### Direct script Include
```
      <script src="ra/dist/index.js" /> 
 ```
### NPM
 
  npm install ra-jsdt
  
## Examples
 
```
//    thunk demo
    function hw(h,w,cb) {
        let hwg=h+" "+w+" "+"gcy";
        cb(hwg);
    }
    let fn=ra.run.toTK(hw);
    ra.run(function* () {
        const msg0= yield fn('hello','world');
        console.log("msg0 "+msg0); //hello world gcy //sync cb logic
    });
//    ---------------------------------------------------------------
//    promise demo
    let hwAsync= (h,w) => {
    return new Promise((resolve,reject) => {
                let hwg=h+" "+w+" "+"gcy";
                    resolve(hwg);
            });}

    let hra=ra.runPromise(function* () {
        console.log("begin");
        let ret=yield hwAsync('hello','world');
        console.log(ret);  //hello world gcy //sync cb logic
    });
    hra();
    
```
## Short Stories
Originally I wanted to use the `ra`, but being occupied, so I had to use `ra - JSDT`, so the name is a bit strange
## License

  MIT © [gcy](https://segmentfault.com/blog/gcystar)
