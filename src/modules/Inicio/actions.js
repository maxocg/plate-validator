import {
  CLICK_LOGIN
} from './constants';

export function clickLogin(username,password) {
  return {
    type: CLICK_LOGIN,
    payload:{username,password}
  };
}