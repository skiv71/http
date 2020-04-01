var axios = require('axios')

class Http {

    static _lib(...args) {
        var method = args[0].toLowerCase()
        return axios[method](...args.slice(1))
    }

    static _error(e) {
        if (!e.response)
            return e.request ? new Error(`Request failed!`) : new Error(e.message)
        var { data } = e.response
        var msg = typeof data == `object` ? JSON.stringify(data) : data
        return [`status`, `headers`]
            .reduce((err, key) => {
                err[key] = e.response[key]
                return err
            }, new Error(msg))
    }

    static _request({ method, url, data, options }) {
        return new Promise(async (resolve, reject) => {
            var resp
            try {
                switch(method) {
                    case `PATCH`:
                    case `POST`:
                    case `PUT`:
                        resp = await Http._lib(method, url, data, options)
                        break
                    default:
                        resp = await Http._lib(method, url, options)
                }
                resolve(resp)
            } catch(e) {
                reject(Http._error(e))
            }
        })
    }

    static delete(url, options) {
        var method = `DELETE`
        return Http._request({ method, url, options })
    }

    static get(url, options) {
        var method = `GET`
        return Http._request({ method, url, options })
    }

    static patch(url, data, options) {
        var method = `PATCH`
        return Http._request({ method, url, data, options })
    }

    static post(url, data, options) {
        var method = `POST`
        return Http._request({ method, url, data, options })
    }

    static put(url, data, options) {
        var method = `PUT`
        return Http._request({ method, url, data, options })
    }

}

module.exports = Http