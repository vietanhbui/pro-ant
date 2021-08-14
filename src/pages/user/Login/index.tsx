import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import styles from './index.less';
import jwtDecode from 'jwt-decode';
import { fakeLogin } from '@/services/retail-app/user/api';

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { setInitialState } = useModel('@@initialState');

  const setUserInfo = (token: string) => {
    // const userInfo = await initialState?.fetchUserInfo?.();
    // if (userInfo) {
    //   await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    // }
    const currentUser: UserAPI.CurrentUser = jwtDecode(token);
    setInitialState((s) => ({ ...s, currentUser }));
  };

  const handleSubmit = async (values: UserAPI.LoginParams) => {
    setSubmitting(true);

    try {
      // 登录
      const token: string = await fakeLogin(values);
      localStorage.setItem('token', token);
      setUserInfo(token);
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as {
        redirect: string;
      };
      history.push(redirect || '/');
      return;
    } catch (error) {
      message.error('Login failed, please try again!');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>Ant Design</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {'Ant Design is the most influential web design specification in Xihu district'}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: 'Login',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'Username: admin'}
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'Password: ant.design'}
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              />
            </>
          </ProForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
