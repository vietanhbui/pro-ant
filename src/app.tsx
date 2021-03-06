import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { RequestInterceptor, RequestOptionsInit, ResponseError } from 'umi-request';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import jwtDecode from 'jwt-decode';
import IdleTimer from './components/IdleTimer';
import PermissionPage from './pages/403';

const loginPath = '/user/login';
const permissionDenyPath = '/permission-deny';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: UserAPI.CurrentUser;
  settings?: Partial<LayoutSettings>;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const token = localStorage.getItem('token');
    if (token) {
      const currentUser: UserAPI.CurrentUser = jwtDecode(token);
      return { currentUser, settings: {} };
    }
    history.push(loginPath);
    return { currentUser: null, settings: {} };
  }
  return { currentUser: null, settings: {} };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => (
      <>
        <IdleTimer />
        <RightContent />
      </>
    ),
    disableContentMargin: false,
    footerRender: undefined,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (
        (!localStorage.getItem('token') || !initialState?.currentUser) &&
        location.pathname !== loginPath
      ) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <PermissionPage />,
    ...initialState?.settings,
  };
};

const errorHandler = (error: ResponseError) => {
  const statusCode = error?.response?.status;
  switch (statusCode) {
    case 401:
      history.push(loginPath);
      break;
    case 403:
      history.push(permissionDenyPath);
      break;
    default:
      break;
  }
  throw error;
};

const requestInterceptors: RequestInterceptor = (url: string, options: RequestOptionsInit) => {
  const token = localStorage.getItem('token');
  const baseHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    const authHeader = { Authorization: `Bearer ${token}` };
    return {
      url: `${API_URL}${url}`,
      options: { ...options, interceptors: true, headers: { ...baseHeader, ...authHeader } },
    };
  }
  return {
    url: `${API_URL}${url}`,
    options: { ...options, interceptors: true, headers: baseHeader },
  };
};

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [requestInterceptors],
};
