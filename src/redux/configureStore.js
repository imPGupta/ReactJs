import { createStore, combineReducers } from 'redux';
import {Leaders} from './leaders';
import {Promotions} from './promotions';
import {Comments} from './comments';
import {Dishes} from './dishes';

export const ConfigureStore = ()=>{
    const store = createStore(
            combineReducers({
                dishes: Dishes,
                leaders: Leaders,
                comments: Comments,
                promotions: Promotions
            })
        );
    return store;
}