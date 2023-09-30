/**
 * Console log with colors
*/
function colorMessage(message, color, backgroundColor) {
    console.log(`%c ${message} `, `background: ${backgroundColor}; color: ${color}`);
}

/**
 * Create a new promise (make it fail if checkbox is not selected) 
*/
function doPromise() {
    const shouldWork = document.getElementById('success').checked;
    return new Promise(function(resolve, reject) {
        if (shouldWork) {
            resolve("This is the successfull message after promise");
        } else {
            reject(new Error('This is the error message'));
        }
    });
}

/**
 * Call a new promise
*/
function callPromise() {
    doPromise().then(function (response) {
        colorMessage(`Call promise response: ${response}`, 'white', 'green');
    }, function(reason) {
        colorMessage(`Call promise error: ${reason.message}`, 'white', 'red');
    });
}

/**
 * Call a new promise using async / await
*/
async function useAsyncAwait () {
    try {
        const response = await doPromise();
        colorMessage(`response in async await OK: ${response}`, 'white', 'green');
    } catch(e) {
        colorMessage(`In async await didnt work: ${e.message}`, 'white', 'red');
    }
}

/**
 * Add listener, on click call a new promise
*/
const callPromiseEl = document.getElementById('callPromiseId');
callPromiseEl.addEventListener('click', function() {
    console.clear();
    callPromise();
    console.log('%c after promise ', 'background-color: green; color: white');
});

/**
 * Add listener, on click call a new promise with async await
*/
const callPromiseAsyncEl = document.getElementById('callPromiseAsyncId');
callPromiseAsyncEl.addEventListener('click', function() {
    console.clear();
    useAsyncAwait();
    console.log('%c after promise ', 'background-color: green; color: white');
});

/**
 * Basic use of promise 
*/
new Promise(function(resolve, reject) {
    //resolve('success');
    reject(new Error('This is an error message'));
}).then(function(message) {
    console.log('successfull ' + message);
}).catch(function(error) {
    console.log('fail ' + error.message);
});
