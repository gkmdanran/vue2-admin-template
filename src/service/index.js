import axios from 'axios'
import { Message } from 'element-ui'
import { BASE_URL } from './config'

export function request(config) {
    const instance = axios.create({
        baseURL: BASE_URL,
    })
    instance.interceptors.request.use(
        (config) => {
            return config
        },
        err => {
            Message({
                type: 'warning',
                message: '网络异常，请求失败！',
            })
            return err
        }
    )
    instance.interceptors.response.use(
        (res) => {
            if (res.data.code != 0) {
                Message({
                    type: 'warning',
                    message: res.data.message,
                })
            }
            return res
        },
        err => {
            Message({
                type: 'warning',
                message: '网络异常，响应失败！',
            })
            return err
        }
    )
    return instance(config)
}

export function Get(url, data = {}, config = {}) {
    return new Promise((resolve) => {
        request({ ...config, url, params: data, method: 'get' }).then((res) => {
            resolve(res.data)
        })
    })
}
export function Post(url, data = {}, config = {}) {
    return new Promise((resolve) => {
        request({ ...config, url, data, method: 'post' }).then((res) => {
            resolve(res.data)
        })
    })
}
export function Put(url, data = {}, config = {}) {
    return new Promise((resolve) => {
        request({ ...config, url, data, method: 'put' }).then((res) => {
            resolve(res.data)
        })
    })
}
export function Delete(url, data = {}, config = {}) {
    return new Promise((resolve) => {
        request({ ...config, url, data, method: 'delete' }).then((res) => {
            resolve(res.data)
        })
    })
}
export function Download(url, data = {}, config = {}) {
    let obj = {}
    if (!config.method || config.method == 'get' || config.method == 'GET') {
        obj = { ...config, url, params: data }
    } else {
        obj = { ...config, url, data }
    }
    return new Promise((resolve) => {
        request(obj).then(res => {
            if (config.responseType == 'blob') {
                const reader = new FileReader()
                reader.readAsText(res.data, 'utf-8')
                reader.onload = () => {
                    try {
                        const response = JSON.parse(reader.result)
                        if (response.code != 0)
                            Message({
                                type: 'warning',
                                message: response.message,
                            })
                        resolve(response)
                    } catch (error) {
                        resolve(res)
                    }
                }
            } else {
                resolve(res.data)
            }
        })
    })
}