
function choice(items){

    return items[Math.floor(Math.random()*items.length)];
}

function remove(items, item){

    return items.filter(i => i !== item)
}

export {choice, remove}