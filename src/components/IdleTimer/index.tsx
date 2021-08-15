import type React from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { history, useModel } from 'umi';

const IdleTimer: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');

  const logout = () => {
    setInitialState((s) => ({ ...s, currentUser: undefined }));
    localStorage.removeItem('token');
    history.push('/user/login');
  };

  useIdleTimer({
    timeout: IDLE_TIMER,
    onIdle: logout,
    crossTab: {
      emitOnAllTabs: true,
    },
  });

  return null;
};

export default IdleTimer;
