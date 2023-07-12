export const addDemande = (demande) => {
  return {
    type: 'ADD_DEMANDE',
    payload: demande,
  };
};

export const setDemandes = (demandes) => {
  return {
    type: 'SET_DEMANDES',
    payload: demandes,
  };
};
