/**
 * @description 取消操作
 * @author Jonne 
 * **/
'use strict'

export default function makeCancelable(promise){
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) =>
            hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
        );
        promise.catch((error) =>
            hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
}