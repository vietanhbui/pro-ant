/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: UserAPI.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.role === 'ROLE_ADMIN',
    canSBAdmin: true,
    canSBServiceOperator: true,
    canSBServiceMaster: true,
    canEUAdmin: true,
    canEUManager: true,
  };
}
