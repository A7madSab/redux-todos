function todos(state = [], action) {
  if (action.type === "ADD_TODOS") {
    return state.concat([action.todos]);
  } else if (action.type === "DELETE_TODOS") {
    return state.map(todo => todo.id !== action.id);
  } else {
    return state;
  }
}
function goals(state = [], action) {
  if (action.type === "ADD_GOAL") {
    return state.concat([action.goal]);
  } else if (action.type === "DELETE_GOAL") {
    return state.map(goal => goal.id !== action.id);
  } else {
    return state;
  }
}

function createStore(reducer) {
  let state = {};
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listener = listener.filter(l => l !== listener);
    };
  };

  // update state
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  return {
    getState,
    subscribe,
    dispatch
  };
}
