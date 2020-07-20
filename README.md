# promise
## 1、promise解决了什么问题

处理异步请求，解决回调地狱问题

回调地域问题：
* 代码臃肿
* 可读性差
* 耦合度高，可维护性差
* 代码复用性差
* 容易滋生bug
* 只能在回调中处理异常

## 2、API

* `Promise.resolve`

>类方法，该方法返回一个以 value 值解析后的 Promise 对象.1、如果这个值是个 thenable（即带有 then 方法），返回的 Promise 对象会“跟随”这个 thenable 的对象，采用它的最终状态（指 resolved/rejected/pending/settled）
2、如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。
3、其他情况以该值为成功状态返回一个 Promise 对象。

* `Promise.reject`

> 类方法，且与 resolve 唯一的不同是，返回的 promise 对象的状态为 rejected。

* `Promise.prototype.then`

> 实例方法，为 Promise 注册回调函数，函数形式：fn(vlaue){}，value是上一个任务的返回结果，then 中的函数一定要return一个结果或者一个新的 Promise对象，才可以让之后的then回调接收。

* `Promise.prototype.catch`

> 实例方法，捕获异常，函数形式：fn(err){}, err 是 catch 注册 之前的回调抛出的异常信息。

* `Promise.race`

> 类方法，多个 Promise 任务同时执行，返回最先执行结束的 Promise 任务的结果，不管这个 Promise 结果是成功还是失败。

* `Promise.all`

> 类方法，多个 Promise 任务同时执行。
如果全部成功执行，则以数组的方式返回所有 Promise 任务的执行结果。 如果有一个 Promise 任务 rejected，则只返回 rejected 任务的结果。

## 3、promise的使用

* 首先初始化一个Promise对象，可以通过两种方式创建，这两种方式都会返回一个Promise对象

    * new Promise(fn)
    * Promise.resolve(fn)

* 然后调用上一步返回的promise对象的then方法，注册回调函数

    *  ```
        new Promise
        .then(res=> {
            
        })
       ```

* 最后注册catch异常处理函数，处理前面函数可能抛出的异常

    * ```
        new Promise(fn)
        .catch(err => {

        })
      ```

## 4、手撕promise