import {request} from '@/utils/request'
import type {params,pageData} from '@/types/home'
// 分页获取文章列表
export const getArticleList = (postData:params):Promise<pageData> => request.post('/rec/community/rec/query',postData)