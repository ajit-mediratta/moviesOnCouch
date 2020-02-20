export const MARK_AS_FAVOURITE = 'MARK_AS_FAVOURITE';

export const markAsFavourite = (id) => async dispatch => {
    dispatch({
        type: MARK_AS_FAVOURITE,
        payload: id
    });
};
