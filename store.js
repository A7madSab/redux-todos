const ADD_GOAL = "ADD_GOAL"
const REMOVE_GOAL = "REMOVE_GOAL"
const REMOVE_TODO = "REMOVE_TODO"
const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"

/**
 * reducer function  because it takes the state and the action and 
 * reduces it to a new state and must be a pure function
 */
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

/**
 * reducer function  because it takes the state and the action and 
 * reduces it to a new state and must be a pure function
 */
function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}


function app(state = {}, action) {
    return {
        goals: goals(state.goals, action),
        todos: todos(state.todos, action)
    }
}

function createStore(reducer) {
    /**
     * the store does 4 things
     * 1st: contain the state tree
     * 2nd: Get the state
     * 3rd: Listen to changes on the state
     * 4th: Update State
     */

    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

// Action creator

const addTodoAction = (todo) => ({
    type: ADD_TODO,
    todo
})

const removeTodoAction = (id) => ({
    type: REMOVE_TODO,
    id
})

const toggleTodoAction = (id) => ({
    type: TOGGLE_TODO,
    id
})

const addGoalAction = (goal) => ({
    type: ADD_GOAL,
    goal
})

const removeGoalAction = (id) => ({
    type: REMOVE_GOAL,
    id
})

const store = createStore(app)

store.subscribe(() => { "Current state", console.log(store.getState()) })

store.dispatch(addTodoAction({ id: 0, name: "Eat bf", complete: false }))
store.dispatch(addTodoAction({ id: 1, name: "shit bf", complete: false }))
store.dispatch(removeTodoAction({ id: 1 }))
store.dispatch(toggleTodoAction({ id: 0 }))
store.dispatch(addGoalAction({ id: 5, name: "Become an awesome thing" }))
store.dispatch(removeGoalAction({ id: 5 }))
store.dispatch(addGoalAction({ id: 5, name: "Become an awesome thing" }))