import http from 'k6/http'
import { check, group } from 'k6'

export const options = {
    stages: [
        { duration: '10s', target: 20 },
        { duration: '20s', target: 50 },
        { duration: '10s', target: 100 },
        { duration: '20s', target: 150 },
        { duration: '15s', target: 200 },
        { duration: '20s', target: 250 },
        { duration: '30s', target: 300 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<7000'],
        http_req_duration: ['p(75)<9500'],
        checks: ['rate>0.95'],
        http_req_failed: ['rate<0.1'],
    },
}

export default function () {
    const response = http.get('http://34.95.232.166/api/docs')
    check(response, {
        'status code should be 200': (res) => res.status === 200,
    })
}
