export type Action = {type: 'MAP_SAVED'; payload: string; }

export const addMapRedux = (map: string): Action => ({
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