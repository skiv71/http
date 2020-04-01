Http module
===========

Description
-----------

This module provides a simple wrapper around 'axios', so that you can try / catch and get a consistent e.data, regardless of failure

Usage
-----
```JavaScript
var skivy71 = {
    http: require('@skivy71/http)
}

// async
try {
    var { data } = skivy71.http.get(`https://www.google.com`)
    console.log(data) // some crap
} catch(e) {
    console.log(e) // new Error(...)
    console.log(e.message) // response.data?
    console.log(e.status) // response.status
    console.log(e.headers) // response.headers
}
```