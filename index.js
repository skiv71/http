class Http {

    static _error(e) {
        return e.response || (e.request ? { data: `Request failed!` } : { data: `An unknown error has occurred!` })
    }

    static _request({ method, url, data, options }) {
        return new Promise(async (resolve, reject) => {
            var resp
            try {
                switch(method) {
                    case `PATCH`:
                    case `POST`:
                    case `PUT`:
                        resp = await axios[method](url, data, options)
                        break
                    default:
                        resp = await axios[method](url, options)
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