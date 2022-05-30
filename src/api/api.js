import axios from "axios";
// api.js ：就是存放服务端接口


const baseURL = '/api';
/**
*   @description 每个接口都把token传给服务端
 */
const postConfig=function(){
    return {
        baseURL,
        headers:{
            contenType:'application/json',
          authorization:sessionStorage.getItem('token')
        }
    }
}

/**
 *  @description 获取自己信息
 * **/
export function getUerinfoApi(payload={}){
    return axios.post('/user/info',payload,postConfig())
}
/**
 * @description 获取验证码
 * **/
export const getCaptchaApi=function(){
    return `${baseURL}/captcha?${ Math.random()}`;
}
/**
 * @description 注册接口
 **/
export const getRegister=function(payload){
    return  axios.post('/user/register',payload,postConfig())
}

/**
 *  @description 登录接口
 *  @param payload <object> payload 就是入参
 *  @param payload.username 用户名
 *  @param payload.password 密码
 *  @param payload.captcha  验证码
 **/  
export const loginApi=function(payload={}){
    return axios.post('/user/login',payload,postConfig())
}
/**
 * 退出接口
 **/
export const logoutApi=function(payload={}){
    return axios.post('/user/logout',payload,postConfig())
}

/**
 * @description 查询题库列表 
 * @payload type       : <number>, 
 * @payload pagination : <boolean>,  
 * @payload pageSize   : <number>, 
 * @payload pageNum    : <number>,  
 * **/
/*  查询题库列表 /question/list */
export const Questionbanklist=function(payload={}){
    return axios.post('/question/list',payload,postConfig())
}


/*  查询用户信息列表 /user/list */
export const getUerList=function(payload={}){
    return axios.post('user/list',payload,postConfig())
}
/**
 * @description 创建题
 * @param payload
 * @param payload.type <number>, //题目类型
 * @param payload.title :<string>, //题目标题
 * @param payload.questionA :<string>,  // 选项a,
 * @param payload.questionB :<string>,  // 选项b,
 * @param payload.questionC :<string>,  // 非必填 选项c,
 * @param payload.questionD :<string>,  // 非必填 选项d,
 * @param payload.answer :<string>,     // 答案
 * @param payload.level : <number>,     // 难度系数  1：简单  2：普通 3：困难
 * @param ch
 * **/
/* 创建题 /question/create */
export const createApi=function(payload={}){
    return axios.post('/question/create',payload,postConfig())
}

/**
 * @description 修改题
 * @param payload
 * @param payload.id
 * @param payload.type <number>, //题目类型
 * @param payload.title :<string>, //题目标题
 * @param payload.questionA :<string>,  // 选项a,
 * @param payload.questionB :<string>,  // 选项b,
 * @param payload.questionC :<string>,  // 非必填 选项c,
 * @param payload.questionD :<string>,  // 非必填 选项d,
 * @param payload.answer :<string>,     // 答案
 * @param payload.level : <number>,     // 难度系数  1：简单  2：普通 3：困难
 * @param ch
 * **/
// 修改题
export const getRevise=function(payload={}){
    return axios.post('/question/update',payload,postConfig())
}

/**
 * @param payload
 * @param payload.id    必填项 题目id
 * @param payload.type <number>, 题目类型
 **/
// 删除题
export const getdelete=function(payload={}){
    return axios.post('/question/delete',payload,postConfig())
}

/**
 * let params =  {
        phone : <string>,    //手机号 
        email : <string>,    //邮箱 
        sex   : <number>,    //性别 1 ： 男   0： 女
        avatarName: <string>, //昵称
        name  ：<string>,    //真实姓名
        provinceNo: <string>,  //省编号
        cityNo: <string>,    //市编号
        areaNo: <string>,    //区编号
        townNo: <string>,    //镇编号
        desc:   <string>,    //个人介绍
}
 *  修改个人
 * * */
export const setsetion=function(payload={}){
    return axios.post('/user/update',payload,postConfig())
}

/* 创建任务 /task/create */
export const taskCreate=function(payload={}){
    return axios.post('/task/create',payload,postConfig())
}

// /* 发布任务 /task/release */
// export const tasRelease=function(payload={}){
//     return axios.post('/task/release',payload,postConfig())
// }

/* 查询任务列表 /task/list */
export const taskList=function(payload={}){
    return axios.post('/task/list',payload,postConfig())
}

/* 发布/领取任务/task/release */
export const taskRelease=function(payload={}){
    return axios.post('/task/release',payload,postConfig())
}

/* 查询任务详情 /task/detail */
export const taskDetail=function(payload={}){
    return axios.post('/task/detail',payload,postConfig())
}

/* c角色分组列表 /roleGroup/list */
export const roleGroupList=function(payload={}){
    return axios.post('/roleGroup/list',payload,postConfig())
}

/* 角色列表 /role/list */
export const roleList=function(payload={}){
    return axios.post('role/list',payload,postConfig())
}

/* 创建角色组 /roleGroup/create */
export const roleGroupCreate=function(payload={}){
    return axios.post('roleGroup/create',payload,postConfig())
}