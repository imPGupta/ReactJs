import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Leaders} from './leaders';
import {Promotions} from './promotions';
import {Comments} from './comments';
import {Dishes} from './dishes';
import {createForms} from 'react-redux-form'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigureStore = ()=>{
    const store = createStore(
            combineReducers({
                dishes: Dishes,
                leaders: Leaders,
                comments: Comments,
                promotions: Promotions,
                ...createForms({
                    feedback: InitialFeedback
                })
            }),
            applyMiddleware(thunk, logger)
        );
    return store;
}