import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';
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
        <div className={`${styles.top} my-5`}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>Ant Design</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            submitter={false}
            layout="horizontal"
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            <ProFormText
              name="username"
              label="メールアドレス"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
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
              label="パスワード"
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
            <ProForm.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button size="large" loading={submitting} type="primary" htmlType="submit">
                ログインする
              </Button>
            </ProForm.Item>
          </ProForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
