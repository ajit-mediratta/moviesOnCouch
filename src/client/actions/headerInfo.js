export const HEADER_INFO = 'HEADER_INFO';

export const storeHeaderInfo = info => dispatch => {
    dispatch({
        type: HEADER_INFO,
        payload: info
    });
};
