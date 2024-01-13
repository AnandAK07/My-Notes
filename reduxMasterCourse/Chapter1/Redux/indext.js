import axios from 'axios';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux'
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

const init = 'init';

function accountReducer(state = { amount: 0 }, action) {
    switch (action.type) {
        case init: return { amount: action.payload }
        default: return state;
    }
}

function bonusReducer(state = { bonus: 0 }, action) {
    switch (action.type) {
        case init: return { amount: action.payload }
        default: return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunk,logger.default))

function initUser(value) {
    return { type: init, payload: value }
}

function getUser(id) {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`http://localhost:8080/account/${id}`);
        console.log(data.amount)
        dispatch(initUser(data.amount))
    }
}

setTimeout(() => {
    store.dispatch(getUser(2))
})


//1.Front end
// HTML,CSS,JS,React(5/20)
// ul,ol,li,dl,dt,form