import { HEADER_INFO } from '../actions/headerInfo';

export default (state = {}, action) => {
    switch (action.type) {
        case HEADER_INFO:
            return action.payload;

        default:
            return state;
    }
};
