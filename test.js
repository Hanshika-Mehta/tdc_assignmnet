const old = {
    id: 1,
    name: 'Hanshika',
    age: 10
}

const toUpdate = {
    age: 20
}

const afterUpdate = {
    ...old,
    ...toUpdate
}

console.log(afterUpdate)