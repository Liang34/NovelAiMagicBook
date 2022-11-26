import axios from "axios";
import type { Form } from '@/type/constance'
import md5 from 'md5';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true
})

export function register(params: Form) {
  return instance.post('/magic/v1/regist', {
    email: params.email,
    password: md5(params.password),
    name: params.name
  }).then(({data}) => data);
}

export function login(params: Form) {
  return instance.post('/magic/v1/login', {
    email: params.email,
    password: md5(params.password)
  }).then(({data}) => data);
}

export function activate(params: Form) {
  return instance.post('/magic/v1/activate', {
    email: params.email,
    password: md5(params.password),
    name: params.name,
    code: params.code
  }).then(({data}) => data);
}

// 咒术相关
export function createIncantation(params: {}) {
  return instance.post('/magic/v1/incantation/create', params)
}

export function getIncantation(params: {}) {
  return instance.post('/magic/v1/incantation/get', params)
}

// 收藏夹
export function createCollection(params: {}) {
  return instance.post('/magic/v1/collection/create', params)
}

export function getCollection(params: {}) {
  return instance.post('/magic/v1/collection/get', params).then(({data}) => data)
}
