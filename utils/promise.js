function Promise(fn) {
    const sHandlers = [], eHandlers = [];
    let isCompleted = false, resolved = null, rejected = null;

    function resolve(data) {
        isCompleted = true;
        resolved = data;

        sHandlers.forEach(handler => setTimeout(() => {
            handler(data);
        }, 0));
    }

    function reject(error) {
        isCompleted = true;
        rejected = error;

        eHandlers.forEach(handler => setTimeout(() => {
            handler(error);
        }, 0));
    }

    this.then = function (sHandler, eHandler) {
        return new Promise((res, rej) => {
            if (isCompleted) {
                if (resolved) {
                    const result = sHandler(resolved);
                    res(result);
                } else {
                    const result = eHandler(rejected);
                    if (result) {
                        res(result);
                    } else {
                        rej(rejected);
                    }
                }
            } else {
                if (sHandler) {
                    sHandlers.push((data) => {
                        const result = sHandler(data);
                        res(result);
                    });
                }

                if (eHandler) {
                    eHandlers.push((error) => {
                        const result = eHandler(error);
                        if (result) {
                            res(result);
                        } else {
                            rej(error);
                        }
                    });
                }
            }
        });
    }

    fn(resolve, reject);
}

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(123);
    }, 2000);
});

promise.then(() => { }, (err) => {
    console.log("Error: " + err);
}).then((data) => {
    console.log("Data2: " + data);
}, (err) => {
    console.log("Error2: " + err);
    return "Data123";
}).then((data) => {
    // Since error has been handled in the last .then, the control should enter 
    // success handler now.
    console.log("Data3: " + data);
});