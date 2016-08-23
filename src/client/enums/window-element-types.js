export const FILE = 'FILE';
export const EDIT = 'EDIT';
export const VIEW = 'VIEW';
export const HELP = 'HELP';

export const ACTIONS_TYPES = {
  FILE, EDIT, VIEW, HELP
};

export const ACTIONS_TO_CLASS = {
  [FILE]: 'window-action-bar__file',
  [EDIT]: 'window-action-bar__edit',
  [VIEW]: 'window-action-bar__view',
  [HELP]: 'window-action-bar__help'
};

export const ACTIONS_TO_DISPLAY_NAME = {
  [FILE]: 'File',
  [EDIT]: 'Edit',
  [VIEW]: 'View',
  [HELP]: 'Help'
};

export const MINIMIZE = 'MINIMIZE';
export const MAXIMIZE = 'MAXIMIZE';
export const CLOSE = 'CLOSE';

export const BUTTONS_TO_CLASS = {
  [MINIMIZE]: 'window-header__button--minimize',
  [MAXIMIZE]: 'window-header__button--maximize',
  [CLOSE]: 'window-header__button--close'
};
