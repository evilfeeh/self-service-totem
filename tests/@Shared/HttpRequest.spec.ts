import { HttpRequest } from '../../src/@Shared/Request'

describe('HttpRequest', () => {
    it('should be able to make a get request', async () => {
        const httpRequest = new HttpRequest()
        const response = await httpRequest.get(
            'https://jsonplaceholder.typicode.com/posts/1'
        )
        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        })
    })
    it('should be able to make a post request', async () => {
        const httpRequest = new HttpRequest()
        const response = await httpRequest.post(
            'https://jsonplaceholder.typicode.com/posts'
        )
        expect(response.status).toBe(201)
        expect(response.data).toEqual({ id: 101 })
    })
    it('should be able to make a put request', async () => {
        const httpRequest = new HttpRequest()
        const response = await httpRequest.put(
            'https://jsonplaceholder.typicode.com/posts/1'
        )
        expect(response).toBeTruthy()
    })
    it('should be able to make a delete request', async () => {
        const httpRequest = new HttpRequest()
        const response = await httpRequest.delete(
            'https://jsonplaceholder.typicode.com/posts/1'
        )
        expect(response).toBeTruthy()
    })
})
