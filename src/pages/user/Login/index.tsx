import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { message, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link, history, useModel } from 'umi';
import styles from './index.less';
import jwtDecode from 'jwt-decode';
import { fakeLogin } from '@/services/retail-app/user/api';
import { useRef, useEffect } from 'react';

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [maskPassword, setMaskPassword] = useState(false);
  const { setInitialState } = useModel('@@initialState');
  const inputPasswordRef = useRef(null);

  useEffect(() => {
    // Moving cursor to the end
    let currentPasswordRef: any = inputPasswordRef.current;
    if (currentPasswordRef) {
      currentPasswordRef.input.selectionStart = currentPasswordRef.input.value?.length;
      currentPasswordRef.input.selectionEnd = currentPasswordRef.input.value?.length;
    }
  }, [maskPassword]);

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
      message.error('ログインに失敗しました');
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
          <Form
            name="basic"
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            <Form.Item
              label="メールアドレス"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                prefix={<MailOutlined className={styles.prefixIcon} />}
                size="large"
                placeholder={'Username: admin'}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="パスワード"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input
                ref={inputPasswordRef}
                onInput={() => setMaskPassword(true)}
                type={maskPassword ? 'password' : 'text'}
                suffix={
                  maskPassword ? (
                    <EyeInvisibleOutlined
                      className="pointer"
                      onClick={() => setMaskPassword(false)}
                    />
                  ) : (
                    <EyeOutlined className="pointer" onClick={() => setMaskPassword(true)} />
                  )
                }
                prefix={<LockOutlined className={styles.prefixIcon} />}
                size="large"
                placeholder={'Password: ant.design'}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button size="large" loading={submitting} type="primary" htmlType="submit">
                ログインする
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
