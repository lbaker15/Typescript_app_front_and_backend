export type Action = {type: 'MAP_SAVED'; payload: object; }

export const addMapRedux = (map: object): Action => ({
    type: 'MAP_SAVED',
    payload: map
})


// function addMap(map) {
//     return {
//         type: 'MAP_SAVED',
//         map
//     }
// }
// export function addMapRedux (map) {
//     return (dispatch) => {
//         dispatch(addMap(map))
//     }
// }