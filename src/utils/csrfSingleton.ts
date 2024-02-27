let _csrf: string | null = null;

function set(csrf: string | null) {
  _csrf = csrf;
}

function get() {
  return _csrf;
}

export const csrf = {
  set,
  get,
};
