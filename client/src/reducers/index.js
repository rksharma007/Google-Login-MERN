import { combineReducers } from "redux";
import alert from './alert';
import auth from './auth';
import payment from "./payment";

export default combineReducers({
    alert,
    auth,
    payment
});