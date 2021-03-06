export const FILE = 'FILE';
export const GAME = 'GAME';
export const EDIT = 'EDIT';
export const VIEW = 'VIEW';
export const HELP = 'HELP';
export const SHARE = 'SHARE';

export const ACTIONS_TYPES = {
  FILE, EDIT, VIEW, HELP, GAME, SHARE
};

export const ACTIONS_TO_CLASS = {
  [FILE]: 'window-action-bar__file',
  [EDIT]: 'window-action-bar__edit',
  [VIEW]: 'window-action-bar__view',
  [HELP]: 'window-action-bar__help',
  [GAME]: 'window-action-bar__game'
};

export const ACTIONS_TO_DISPLAY_NAME = {
  [FILE]: 'File',
  [EDIT]: 'Edit',
  [VIEW]: 'View',
  [HELP]: 'Help',
  [SHARE]: 'Share',
  [GAME]: 'Game'
};

export const MINIMIZE = 'MINIMIZE';
export const MAXIMIZE = 'MAXIMIZE';
export const NO_MAXIMIZE = 'NO_MAXIMIZE';
export const CLOSE = 'CLOSE';

export const BUTTONS_TO_CLASS = {
  [MINIMIZE]: 'window-header__button--minimize',
  [MAXIMIZE]: 'window-header__button--maximize',
  [CLOSE]: 'window-header__button--close',
  [NO_MAXIMIZE]: 'window-header__button--no-maximize'
};
