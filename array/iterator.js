// // Implementation 1 (Using generator)
// function* arrayIterator() {
//     const arr = this;

//     for (let index = 0; index < arr.length; index++) {
//         yield arr[index];
//     }
// }

// Array.prototype[Symbol.iterator] = arrayIterator;


// Implementation 2 (Using plain function and managing state on own)

Array.prototype[Symbol.iterator] = function () {
    const arr = this;
    let index = 0;
    return {
        next: function () {
            if (index <= arr.length - 1) {
                console.log("Called");
                return { done: false, value: arr[index++] };
            } else {
                return { done: true };
            }
        }
    }
}


const arr = [3, 4, 5];

for (let value of arr) {
    console.log(`Value: ${value}`)
}