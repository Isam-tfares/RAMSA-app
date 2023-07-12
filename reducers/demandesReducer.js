// demandesReducer.js

const initialState = {
  demandes: [],
};

const demandesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DEMANDE':
      return {
        ...state,
        demandes: [...state.demandes, action.payload],
      };
    case 'SET_DEMANDES':
      return {
        ...state,
        demandes: action.payload,
      };
    default:
      return state;
  }
};

export default demandesReducer;
