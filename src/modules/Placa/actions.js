import {
    CLICK_VALIDAR,
    CLICK_VALIDAR_OUTRO,
    CLICK_REPORT
  } from './constants';
  
  export function clickValidar(username,password,plate) {
    return {
      type: CLICK_VALIDAR,
      payload: {username,password,plate}
    };
  }
  export function clickReport(username,password,plate) {
    return {
      type: CLICK_REPORT,
      payload: {username,password,plate}
    };
  }
  export function clickValidarOutro() {
    return {
      type: CLICK_VALIDAR_OUTRO
    };
  }