// 初始化三个状态
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
    // 在函数体内部创建常量that，因为代码可能异步执行，用于获取正确的this对象
    const that = this; 
    // 一开始Promise的状态应该是pending
    that.state = PENDING;
    // value变量用来保存resolve或reject中传入的值
    that.value = null;
    // 用于保存then中的回调函数，因为当执行完Promise时状态可能还是等待中，这时候应该把then中的回调保存起来用于状态改变时用
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];

    /**
     * 首先两个函数都得判断当前状态是否为等待状态，只有等待状态才可以改变状态;
     * 将当前状态改变为对应状态，并且传入的值赋予给value;
     * 遍历回调数组并执行
     */
    function resolve(value) {
        if (that.state === PENDING) {
            that.state = RESOLVED;
            that.value = value;
            that.resolvedCallbacks.map(item => item(that.value));
        }
    }
    function reject(value) {
        if (that.state === PENDING) {
            that.state = REJECTED;
            that.value = value;
            that.rejectedCallbacks.map(item => item(that.value));
        }
    }

    /**
     * 执行传入的参数并且将之前两个函数当作参数传进去；
     * 可能执行函数过程会遇到异常，需要捕获异常并执行到reject函数
     */
    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

/**
 * 首先判断两个参数是否为函数类型，因为这两个参数都是可选参数，
 * 当参数不是函数类型时，需要创建一个函数赋值给对应的参数，同时也实现了透传
 */
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r};
    if (that.state === PENDING) {
        that.resolvedCallbacks.push(onFulfilled);
        that.rejectedCallbacks.push(onRejected);
    }
    if (that.state === RESOLVED) {
        onFulfilled(that.value);
    }
    if (that.state === REJECTED) {
        onRejected(that.value);
    }
}