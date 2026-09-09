export const pathKeys = {
  root: '/',
  home() {
    return pathKeys.diary.root();
  },
  login() {
    return pathKeys.root.concat('login/');
  },
  confirm: {
    root() {
      return pathKeys.root.concat('confirm/');
    },
    byParams({ email, token }) {
      return pathKeys.confirm.root().concat(email).concat('/').concat(token);
    },
  },
  register() {
    return pathKeys.root.concat('register/');
  },
  settings() {
    return pathKeys.root.concat('settings/');
  },
  page404() {
    return pathKeys.root.concat('404/');
  },
  dialogs() {
    return pathKeys.root.concat('dialogs');
  },
  planner: {
    root() {
      return pathKeys.root.concat('planner/');
    },
    byId({ id }) {
      return pathKeys.planner.root().concat(id);
    },
    editor: {
      root() {
        return pathKeys.planner.root().concat('editor/');
      },
      byId({ id }) {
        return pathKeys.planner.editor.root().concat(id);
      },
    },
  },
  article: {
    root() {
      return pathKeys.root.concat('article/');
    },
    byId({ id }) {
      return pathKeys.article.root().concat(id);
    },
    editor: {
      root() {
        return pathKeys.article.root().concat('editor/');
      },
      byId({ id }) {
        return pathKeys.article.editor.root().concat(id);
      },
    },
  },
  user: {
    root() {
      return pathKeys.root.concat('user/');
    },
    byId({ id }) {
      return pathKeys.user.root().concat(id);
    },
  },
  diary: {
    root() {
      return pathKeys.root.concat('diary');
    },
  },
  measure: {
    root() {
      return pathKeys.root.concat('measure');
    },
  },
  training: {
    root() {
      return pathKeys.root.concat('training');
    },
  },
};
