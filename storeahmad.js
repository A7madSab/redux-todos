const ADD_GOAL = "ADD_GOAL"
const REMOVE_GOAL = "REMOVE_GOAL"
const REMOVE_TODO = "REMOVE_TODO"
const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
const ADD_COMMITMENT = "ADD_COMMITMENT"

// reducer
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete }))
        default:
            return state
    }
}
function goals(state = [], action) {
    // console.log("inside goals reducer", state, action)
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id)
        default:
            return state
    }
}

function commitments(state = [], action) {
    switch (action.type) {
        case ADD_COMMITMENT:
            return state.concat([action.commitment])
        default:
            return state
    }
}

function app(state = {}, action) {
    return {
        goals: goals(state.goals, action),
        todos: todos(state.todos, action),
        commitments: commitments(state.commitment, action)
    }
}

//  store
function createStore(reducer) {
    let state
    let listeners = []

    let getState = () => state

    let subscribe = (listner) => {
        listeners.push(listner)
        return () => {
            listeners.filter((l) => (l !== listner))
        }
    }

    let dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((l) => l())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}


const store = createStore(app)
store.subscribe(() => console.log("State:", store.getState()))

store.dispatch({
    type: ADD_COMMITMENT,
    commitment: {
        text: "be politer",
    }
})