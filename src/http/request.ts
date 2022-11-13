import axios from "axios";
import type { Form } from '@/type/constance'
import md5 from 'md5';

const instance = axios.create({
  baseURL: 'http://114.132.198.140:8000',
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