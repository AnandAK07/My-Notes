import { createStore, applyMiddleware } from 'redux';
// store.subscribe comment out after this
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

// action name constants
const init = 'init'
const inc = 'increment';
const dec = 'decrement'
const incByAmt = 'incrementByAmount'

// reducer
function reducer(state = { amount: 1 }, action) {
    switch (action.type) {
        case init: return { amount: action.payload };
        case inc: return { amount: state.amount + 1 };
        case dec: return { amount: state.amount - 1 };
        case incByAmt: return { amount: state.amount + action.payload };
        default: return state;
    }
    // if(action.type===inc){
    //     // mutating the object or data XXX comment in 14
    //     // state.amount=state.amount+1

    //     // immutability comment in 11
    //     return {amount:state.amount+1}
    // }
    // if(action.type===dec){
    //     return {amount:state.amount-1}
    // }
    // if(action.type===incByAmt){
    //     return {amount:state.amount+action.payload}
    // }
    // return state;
}
// store
const store = createStore(reducer, applyMiddleware(thunk,logger.default));

const history = [];




// global state
// console.log(store.getState())
// // action
// store.dispatch({type:'increment'})
// console.log(store.getState())

// to avoid use again & again use store.getState();

// store.subscribe(()=>{
//     history.push(store.getState())
//     // console.log(store.getState())
//     console.log(history)
// })


// Async API call
// async function getUser(){
//     // info is heavy
// //    const data=await axios.get(`http://localhost:8080/account/1`)
//    const {data}=await axios.get(`http://localhost:8080/account/1`)
//    console.log(data)
// }
// getUser()

// Action creators
function getUser(id) {
    // return initUser(150)
    return async(dispatch, getState)=>{
        const { data } = await axios.get(`http://localhost:8080/account/${id}`)
        // Error will be throw bcs actions are sync will not wait it will dispatch imditely
        // it will be managed by redux-thunk (it need to wait until get res should have access of dispatch to call the action{type,payload})
        // dispatch({type:init,payload:data.amount})
        // dispatch({type:init})
        console.log(data.amount)
        // return {type:init,payload:data.amount}//action
        dispatch(initUser(data.amount))
        // console.log(value)
    }
}

function initUser(value){
    return {type:init,payload:value};
}

function increment() {
    return { type: inc }
}

function decrement() {
    return { type: dec }
}


function incrementByAmount(value) {
    return { type: incByAmt, payload: value }
}


setTimeout(() => {
    // mw will delay this dispatch action for call Api without MW it will dispatch action to reducer directly
    store.dispatch(getUser(2))
}, 1000)