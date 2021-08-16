// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function fakeLogin(body: UserAPI.LoginParams, options?: { [key: string]: any }) {
  return new Promise<string>(function (resolve, reject) {
    if (body.email === 'admin' && body.password === 'ant.design') {
      const fakeJwtToken: string =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2Mjg5MzU1NDQsImV4cCI6MTY2MDQ3MTU0NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJTZXJhdGkgTWEiLCJhdmF0YXIiOiJodHRwczovL2d3LmFsaXBheW9iamVjdHMuY29tL3pvcy9hbnRmaW5jZG4vWEFvc1h1Tlp5Ri9CaWF6ZmFueG1hbU5Sb3h4VnhrYS5wbmciLCJpZCI6IjAwMDAwMDAxIiwiZW1haWwiOiJhbnRkZXNpZ25AYWxpcGF5LmNvbSIsInJvbGUiOiJST0xFX0FETUlOIn0.GV0X1I-d8FHAoeVYV2_Ys4F-NwLZxY7sux5-9kTmIX4';
      resolve(fakeJwtToken);
    } else {
      reject();
    }
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: UserAPI.LoginParams, options?: { [key: string]: any }) {
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function test() {
  return request('/api/test/users', {
    method: 'GET',
  });
}
