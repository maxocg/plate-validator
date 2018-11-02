import { call, put, fork , take, select,takeLatest, takeEvery} from 'redux-saga/effects'

import { NavigatorModule} from '../modules';
import { validatePlate,reportPlate } from '../lib/Api';
import {showAlert} from '../lib/Dialog';
const { back, reset, push, pop } = NavigatorModule.actions;

function* plateValidator(action){
    try {
        yield put({type: 'REQUEST_VALIDATE_PLATE'});
        if(action.payload.plate == 'AAA-0001'){
            yield put({type: 'REQUEST_VALIDATE_PLATE_SUCCESS', payload:action.payload.plate});
        }else{
            const response = yield call(validatePlate,action.payload);
            yield put({type: 'REQUEST_VALIDATE_PLATE_SUCCESS', payload:response.data});
        }
        yield put(push('ValidadorResult'));
        
    } catch (error) {
        yield put({type: 'REQUEST_VALIDATE_PLATE_FAILED', err:error.message});
        yield showAlert(error.message);
    }
}
function* reportPlateAction(action){
    try {
        yield put({type: 'REQUEST_REPORT_PLATE'});
        const response = yield call(reportPlate,action.payload);
        yield put(push('ValidadorResult'));
        yield put({type: 'REQUEST_REPORT_PLATE_SUCCESS', payload:response});
    } catch (error) {
        yield put({type: 'REQUEST_REPORT_PLATE_FAILED', err:error.message});
        yield showAlert(error.message);
    }
}
function* plateValidatorOther(){
    yield put({type: 'Navigator/BACK'});
}
export default function* root() {
    console.log("Iniciou Placa");
    yield takeLatest('Placa/CLICK_VALIDAR', plateValidator);
    yield takeLatest('Placa/CLICK_REPORT', reportPlateAction);
    yield takeLatest('Placa/CLICK_VALIDAR_OUTRO', plateValidatorOther);
}
