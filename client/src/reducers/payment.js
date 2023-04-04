import { CHECKOUT, CHECKOUT_ERROR } from '../actions/types';
   
  const initialState = {
    payment: null,
    loading: false,
    error: null
  }
   
  function paymentReducer(state = initialState, action) {
      const { type, payload } = action;
   
      switch (type) {
        case CHECKOUT:
          return{
            ...state,
            payment: payload,
            loading: false,
        };
        case CHECKOUT_ERROR:
          return{
            ...state,
            error: payload,
            loading: false,
        };
        default:
          return state;
        }
  }
   
  export default paymentReducer;