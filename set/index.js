
class SetFactory {
    constructor() {
        this._elements = []
    }

    has(elem) {
        return this._elements.includes(elem);
    }

    get size() {
        return this._elements.length;
    }

    add(elem) {
        if (!this._elements.includes(elem)) {
            this._elements.push(elem)
        }

        return this;
    }

    delete(elem) {
        if (this._elements.includes(elem)) {
            this._elements = this._elements.filter(item => item !== elem);
            return elem;
        }

        return undefined;
    }

    *keys() {
        for (let elem of this._elements) {
            yield elem;
        }
    }

    *values() {
        for (let elem of this._elements) {
            yield elem;
        }
    }

    *entries() {
        for (let elem of this._elements) {
            yield [elem, elem];
        }
    }
}

// I did this just to prevent _elements from being accesible
function Set() {
    const set = new SetFactory();
    const allowedKeys = ['add', 'delete', 'size', 'has', 'keys', 'values', 'entries'];

    return new Proxy(set, {
        get(target, prop) {
            if (allowedKeys.includes(prop)) {
                if (typeof target[prop] === "function") {
                    return target[prop].bind(set);
                } else {
                    return target[prop];
                }
            } else {
                return undefined;
            }
        },
        set(target, prop, value) {
            return undefined;
        },
        delete(target, prop) {
            // do nothing
        },
        ownKeys(target) {
            return allowedKeys;
        }
    });
}

const set = new Set();
set.add({ a: 1 });
set.add("Hi");
console.log("Hello!" + set._elements);
console.log(`Set values: ${JSON.stringify([...set.values()])}`);
console.log(`Set size: ${set.size}`)
