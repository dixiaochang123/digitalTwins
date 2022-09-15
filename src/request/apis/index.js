import request from "@/request"

export function login(data) {
    return new request({
        url: `/api/login`,
        method: 'post',
        data
    })
}
export function getUserinfo(id) {
    return new request({
        url: `/my/userinfo?id=${id}`,
        method: 'get'
    })
}
