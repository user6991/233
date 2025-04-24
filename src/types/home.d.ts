export type tabbarItem ={
path:string,
text:string,
icon:string,
activeIcon:string
}

// 请求参数
export type params={
    offSet:number,
    page:number
}
// 文章项目
export type articleItem={
commentCount:number,//评论数量，
content:'',//文章内容， 
createTime: number,//文章创建时间，时间戳
gameCircleName: string,//游戏社区名称
title:string,//文章标题
likeCount:number,//点赞数
uid:string, 
uname:string,//用户名称 
uportrait: string,//用户头像

}


export type pageData={
    isEnd:false,
    postItems:articleItem []
}