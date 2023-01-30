let exampleObject = {
    name: 'Tim',
    age: 29,
    isHungry: true,
    ate: [],
    eat: (food) => ate.push(food),
    exampleProperty: 'exampleValue',
    superlongpropertynameforthelasttask: 'exampleValue1',
    evenlongersuperlongpropertynameforthelasttask: 'exampleValue2',
};

/**
 * Task1: Return value
 */
function returnValForKey(obj, key) {
    return key in obj ? obj[key] : 'default';
}

console.log(returnValForKey(exampleObject, 'name'));
console.log(returnValForKey(exampleObject, 'invalid'));

/**
 * Task2: Rename key
 */
function renameKey(obj, oldKey) {
    if (oldKey in obj) {
        obj['renamedKey'] = obj[oldKey];
        delete obj[oldKey];
        return true;
    }
    return false;
}

console.log(renameKey(exampleObject, 'exampleProperty'));
console.log(exampleObject);

/**
 * Task3: Function check
 */
function isFunction(obj, key) {
    return typeof obj[key] === 'function';
}
console.log(isFunction(exampleObject, 'eat'));

/**
 * Task4: New Object with key length
 */
function newObjWithKeyLength(obj, len) {
    let newObj = {};
    for (let key in obj) {
        if (typeof key === 'string' && key.length === len) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
console.log(newObjWithKeyLength(exampleObject, 3));

/**
 * Task5: New Object with value range
 */
function newObjWithValRange(obj, min, max) {
    let newObj = {};
    for (let key in obj) {
        if (typeof obj[key] === 'number' && obj[key] >= min && obj[key] <= max) {
            newObj[key] = obj[key];
        }
    }

    return newObj;
}
console.log(newObjWithValRange(exampleObject, 10, 50));

/**
 * Task6: Count Characters
 */
function countChars(obj, key) {
    return key in obj ? obj[key].length : -1;
}

console.log(countChars(exampleObject, 'name'));

/**
 * Task7: Filter out Keys
 */
function filterKeys(obj, keys) {
    let newObj = {};
    for (let key in obj) {
        if (!keys.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

console.log(filterKeys(exampleObject, ['name', 'age']));

/**
 * Hard Task1: Wrap values in functions
 */
function wrapValsInFuncs(obj) {
    let newObj = {};
    for (let key in obj) {
        newObj[key] = () => obj[key];
    }
    return newObj;
}
console.log(wrapValsInFuncs(exampleObject));

/**
 * Hard Task2: Sort by key length
 */
function sortByKeyLength(obj) {
    let newObj = {};
    let keys = [];

    // Loop can be replaced by Object.keys()
    for (let key in obj) {
        keys.push(key);
    }
    // BubbleSort. Can be replaced by keyOrder.sort()
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < keys.length - i - 1; j++) {
            if (keys[j].length > keys[j + 1].length) {
                var temp = keys[j];
                keys[j] = keys[j + 1];
                keys[j + 1] = temp;
            }
        }
    }

    for (let key of keys) {
        newObj[key] = obj[key];
    }
    return newObj;
}

console.log(sortByKeyLength(exampleObject));

/**
 * Hard Task3: Find nearest key
 */

function findNearestKey(obj, key) {
    if (key in obj) return obj[key];

    let sortedObj = sortByKeyLength(obj);
    let lastCandidate = '';
    for (let keyCandidate in sortedObj) {
        if (keyCandidate.length >= key.length) {
            return keyCandidate.length - key.length < key.length - lastCandidate.length
                ? sortedObj[keyCandidate]
                : sortedObj[lastCandidate];
        }
        lastCandidate = keyCandidate;
    }
    return sortedObj[lastCandidate];
}

console.log(findNearestKey(exampleObject, 'VERYsuperlongpropertynameforthelasttask'));
