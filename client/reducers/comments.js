//a reducer takes in two things:
// 1. the action (info about what happend)
// 2. copy of the current state

function comments(state = [], action){
    console.log(state, action);
    return state;
}

export default comments;