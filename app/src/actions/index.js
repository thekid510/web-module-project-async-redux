import axios from 'axios';

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";


//1. is our action creator returning an object.
//2. if so pass into reducer as usual.
//3. is our action creator returning a function?
//4. if so, pass dispatch into that function and let the action do what it wants.

export const getPerson = () => {
    return (dispatch) => {
        //1. Fetch_Start
        dispatch(fetchStart());

        //2. fetch data from api
        axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(resp => {
            //3. if fetch is successful, Fetch_Success with that data
            dispatch(fetchSuccess(resp.data.results[0]));
            console.log(resp.data);
        })
        .catch(err=>{
            //4. if fetch is not successful, Fetch_Fail with error message
            dispatch(fetchFail(err));
        });

    }
}


export const fetchStart = ()=> {
    return({type: FETCH_START});
}

export const fetchSuccess = (coin)=> {
    return({type: FETCH_SUCCESS, payload:coin});
}

export const fetchFail = (error)=> {
    return({type: FETCH_FAIL, payload:error});
}