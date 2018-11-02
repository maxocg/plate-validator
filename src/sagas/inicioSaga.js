import { call, put, fork , take, select,takeLatest, takeEvery} from 'redux-saga/effects'

import { NavigatorModule} from '../modules';
import { login } from '../lib/Api';
import {showAlert} from '../lib/Dialog';
const { back, reset, push, pop } = NavigatorModule.actions;

function* loginUser(action){
    try {
        yield put({type: 'REQUEST_LOGIN', payload:action.payload});
        const response = yield call(login,action.payload);
        yield put(push('Validador'));
        yield put({type: 'REQUEST_LOGIN_SUCCESS', payload:response});
    } catch (error) {
        yield put({type: 'REQUEST_LOGIN_FAILED', err:error.message});
        yield showAlert(error.message);
    }
}

export default function* root() {
    console.log("Saga Inicio");
    yield takeLatest('Inicio/CLICK_LOGIN', loginUser);
}
