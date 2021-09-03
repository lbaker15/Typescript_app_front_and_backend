export const search = (obj) => {
    return new Promise((resolve, rej) => {
        fetch('https://places-find.herokuapp.com/admin/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => resolve(res.json()) )
        .catch(err => rej(err))
    })
}

export const addPlace = (obj) => {
    console.log(obj)
    return new Promise((resolve, rej) => {
        fetch('https://places-find.herokuapp.com/admin/add-place', {
            method: 'POST',
            body: obj
        })
        .then(res => resolve(res.json()) )
        .catch(err => rej(err))
    })
}