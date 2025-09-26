export const pathKeys = {
  root: '/',
  login() {
    return pathKeys.root.concat('login/');
  },
  register() {
    return pathKeys.root.concat('register/');
  },
  settings() {
    return pathKeys.root.concat('settings/');
  },
  home() {
    return pathKeys.article.root();
  },
  page404() {
    return pathKeys.root.concat('404/');
  },
  dialogs() {
    return pathKeys.root.concat('dialogs');
  },
  diet: {
    root() {
      return pathKeys.root.concat('planner/');
    },
    byId({ id }: any) {
      return pathKeys.diet.root().concat(id);
    },
    editor: {
      root() {
        return pathKeys.diet.root().concat('editor/');
      },
    },
  },
  users: {
    root() {
      return pathKeys.root.concat('users/');
    },
    byId({ id }: any) {
      return pathKeys.root.concat(id);
    },
  },
  article: {
    root() {
      return pathKeys.root.concat('article');
    },
    byId({ id }: any) {
      return pathKeys.article.root().concat(id);
    },
    editor: {
      root() {
        return pathKeys.article.root().concat('editor/');
      },
      byId({ id }: any) {
        return pathKeys.article.editor.root().concat(id);
      },
    },
  },
  profile: {
    root() {
      return pathKeys.root.concat('user/');
    },
    byUsername({ username }: any) {
      return pathKeys.profile.root().concat(username, '/');
    },
    byUsernameFavorites({ username }: any) {
      return pathKeys.profile.byUsername({ username }).concat('favorites/');
    },
    byId({ id }: any) {
      return pathKeys.profile.root().concat(id);
    },
  },
  diary: {
    root() {
      return pathKeys.root.concat('diary');
    },
  },
};
