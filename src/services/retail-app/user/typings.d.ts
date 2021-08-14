declare namespace UserAPI {
  type LoginParams = {
    email?: string;
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
