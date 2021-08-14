declare namespace UserAPI {
  type LoginParams = {
    username?: string;
    password?: string;
  };

  type CurrentUser = {
    id?: string;
    name?: string;
    avatar?: string;
    email?: string;
    role?: string;
  } | null;
}
