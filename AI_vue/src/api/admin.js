import service from '@/utils/request'

export function login(data){
    return service.post('/user/login',data)
}
export function categoryTree(){
    return service.get('/knowledge/category/tree')
}
export function articlePage(data){
    return service.get('/knowledge/article/page',{params:data})
}
