import api from '../utils/api';
import { loadUser } from './auth';
import { CHECKOUT, CHECKOUT_ERROR } from './types';


// Checkout
export const checkout = () => async (dispatch) => {

    try {
        const res = await api.post(`/payment/checkout`);
        dispatch({
            type: CHECKOUT,
            payload: res.data
        });
        dispatch(loadUser());
        
    } catch (err) {
        dispatch({
            type: CHECKOUT_ERROR
        });
    }
};