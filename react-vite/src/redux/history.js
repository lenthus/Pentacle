// // import { csrfFetch } from "./csrf"

// const LOAD_HISTORYS= 'historys/loadHistorys'
// const GET_HISTORY= 'historys/getHistory'

// export const loadHistorys=(historys)=>({
//     type:LOAD_HISTORYS,
//     historys
// })

// export const getHistory =(historyId)=>({
//     type:GET_HISTORY,
//     historyId
// })

// export const getAllHistorys = () => async (dispatch)=>{
//     const res = await fetch('/api/historys')
//     // console.log(res.text(), '----------')
//     if(res.ok){
//         const data = await res.json()
//         dispatch(loadHistorys(data))
//         return data
//     }
//     return res
// }

// export const getHistoryById = (historyId) => async (dispatch)=>{
//     const res = await fetch(`/api/historys/${historyId}`)
//     if(res.ok){
//         const data = await res.json()
//         dispatch(getHistory([data]))
//         return data
//     }
//     return res
// }

// const historyReducer = (state = {}, action)=>{
//     let newState = null
//     switch(action.type){
//         case LOAD_HISTORYS:
//             newState = {}
//             // console.log(action.historys, '-----store')
//             if(action.historys && action.historys !== undefined){
//                 action.historys.historys.forEach(ele => {

//                     newState[ele.id] = ele
//                 })
//             }else{
//                 newState = null
//             }
//             return newState

//         case GET_HISTORY:
//             newState = {}
//             // console.log("ACTION", action, 'line 55')
//             // console.log(action.bodyId, '-----store')
//             if(action.historyId && action.historyId !== undefined){
//                 action.historyId.forEach(ele => {
//                     newState[ele.id] = ele
//                 })
//             }else{
//                 newState = null
//             }
//             return newState

//         default:return state
//     }
// }

// export default historyReducer


const LOAD_HISTORYS = "historys/loadHistorys";
const GET_HISTORY = "historys/getHistory";
const UPDATE_History = "historys/Update";
const DELETE_History = 'historys/Delete'
const CREATE_History = 'historys/Create'

export const loadHistorys = (historys) => ({
  type: LOAD_HISTORYS,
  historys,
});

export const updateHistory = (history) => ({
  type: UPDATE_History,
  history,
});

export const getHistory = (historyId) => ({
  type: GET_HISTORY,
  historyId,
});
export const deleteHistory = (history) => ({
    type: DELETE_History,
    history,
  });

export const createHistory = (history) => ({
    type: CREATE_History,
    history,
})

export const getAllHistorys = (userId) => async (dispatch) => {
  const res = await fetch(`/api/historys/user/${userId}`);
  // console.log(res.text(), '----------')
  if (res.ok) {
    const data = await res.json();
    dispatch(loadHistorys(data));
    return data;
  }
  return res;
};

export const getHistoryById = (historyId) => async (dispatch) => {
  const res = await fetch(`/api/historys/${historyId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getHistory([data]));
    return data;
  }
  return res;
};

export const updateHistoryMaker = (history, historyId) => async (dispatch) => {
  const res = await fetch(`/api/historys/${historyId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(history),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateHistory(history));
    return data;
  } else {
    throw res;
  }
};

export const createHistoryMaker = (history) => async (dispatch) => {
    const res = await fetch(`/api/historys/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(history),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(createHistory(history));
      return data;
    } else {
      throw res;
    }
  };

export const historyDeleteFetch = (historyId) => async (dispatch) => {
    const res = await fetch(`/api/historys/${historyId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(deleteHistory(data));
    } else {
      throw res;
    }
  };

const historyReducer = (state = {}, action) => {
  let newState = null;
  switch (action.type) {
    case LOAD_HISTORYS:
      newState = {};
      if (action.historys && action.historys !== undefined) {
        action.historys.historys.forEach((ele) => {
          newState[ele.id] = ele;
        });
      } else {
        newState = null;
      }
      return newState;

    case UPDATE_History: {
      const historys = { ...state };
      historys[action.history.id] = action.history;

      return { ...historys };
    }
    case CREATE_History: {
        const historys = { ...state };
        historys[action.history.id] = action.history;

        return { ...historys };
      }

    case DELETE_History:
        newState = { ...state };
        delete newState[action.history.id];
        return { ...newState };

    case GET_HISTORY:
      newState = {};

      if (action.historyId && action.historyId !== undefined) {
        action.historyId.forEach((ele) => {
          newState[ele.id] = ele;
        });
      } else {
        newState = null;
      }
      return newState;

    default:
      return state;
  }
};

export default historyReducer;
