export type AuthUrlModel = {
  url: string;
};

export type AuthUserModel = {
  user: UserModel;
};

export type UserModel = {
  name: string;
  email: string;
  picture: string;
};
