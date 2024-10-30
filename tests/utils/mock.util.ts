import { vi } from 'vitest'

export const createMock = <T>(): jest.Mocked<T> => {
    return new Proxy(
        {},
        {
            get: (target: any, prop) => {
                if (!(prop in target)) {
                    target[prop] = vi.fn()
                }
                return target[prop]
            }
        }
    )
}