const initialState = {
    loading:false,
    user:'',
    credentials:''    
};

const reduce = (state = initialState, action) => {
    let nextState;
    switch (action.type) {
        case 'REQUEST_LOGIN':
            nextState = {...state,loading:true, credentials:action.payload};
            break;
        case 'REQUEST_LOGIN_SUCCESS':
            nextState = {...state,loading:false, user:action.payload};
            break;    
        case 'REQUEST_LOGIN_FAILED':
            nextState = {...state, loading:false};
            break;        
    }
    return nextState || state;
}

export default reduce;
