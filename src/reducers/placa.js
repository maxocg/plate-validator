const returnPlateValidate = (plate)=>{
    if(plate == 'AAA-0001'){
        return {
                "text":"Carro validado",
                "valid":true,
                "status": "valid",
                "plate": "AAA-0001",
                "rideSchedule": "22/10/2018",
                "parkingLot": 2
        }
    }else{
        return {
            "text":"Carro não autorizado",
            "valid":true,
            "status": plate.status,
            "plate": plate.plate,
            "rideSchedule": plate.ride_schedule,
            "parkingLot": plate.parking_lot
        }
    }
}
const initialState = {
    loading:false,
    plate:''    
};

const reduce = (state = initialState, action) => {
    let nextState;
    switch (action.type) {
        case 'REQUEST_VALIDATE_PLATE':
            nextState = {...state,loading:true};
            break;
        case 'REQUEST_VALIDATE_PLATE_SUCCESS':
            nextState = {...state,loading:false, plate:returnPlateValidate(action.payload)};
            break;    
        case 'REQUEST_VALIDATE_PLATE_FAILED':
            nextState = {...state, loading:false};
            break;        
    }
    return nextState || state;
}

export default reduce;
