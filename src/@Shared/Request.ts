import axios, { AxiosHeaders } from 'axios'

interface IRequest {
    get(url: string, headers?: AxiosHeaders): Promise<unknown>
    post(url: string, headers?: AxiosHeaders, body?: unknown): Promise<unknown>
    put(url: string, headers?: AxiosHeaders, body?: unknown): Promise<unknown>
    delete(
        url: string,
        headers?: AxiosHeaders,
        body?: unknown
    ): Promise<unknown>
}

export class HttpRequest implements IRequest {
    async get(url: string, headers?: AxiosHeaders): Promise<unknown> {
        return axios({
            method: 'get',
            url,
            headers,
        })
    }
    post(
        url: string,
        headers?: AxiosHeaders,
        data?: unknown
    ): Promise<unknown> {
        return axios({
            method: 'get',
            url,
            headers,
            data,
        })
    }
    put(url: string, headers?: AxiosHeaders, data?: unknown): Promise<unknown> {
        return axios({
            method: 'get',
            url,
            headers,
            data,
        })
    }
    delete(
        url: string,
        headers?: AxiosHeaders,
        data?: unknown
    ): Promise<unknown> {
        return axios({
            method: 'get',
            url,
            headers,
            data,
        })
    }
}
