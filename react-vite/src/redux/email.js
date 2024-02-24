// // import { csrfFetch } from "./csrf"

// const LOAD_EMAILS= 'emails/loadEmails'
// const GET_EMAIL= 'emails/getEmail'

// export const loadEmails=(emails)=>({
//     type:LOAD_EMAILS,
//     emails
// })

// export const getEmail =(emailId)=>({
//     type:GET_EMAIL,
//     emailId
// })

// export const getAllEmails = () => async (dispatch)=>{
//     const res = await fetch('/api/emails')
//     // console.log(res.text(), '----------')
//     if(res.ok){
//         const data = await res.json()
//         dispatch(loadEmails(data))
//         return data
//     }
//     return res
// }

// export const getEmailById = (emailId) => async (dispatch)=>{
//     const res = await fetch(`/api/emails/${emailId}`)
//     if(res.ok){
//         const data = await res.json()
//         dispatch(getEmail([data]))
//         return data
//     }
//     return res
// }

// const emailReducer = (state = {}, action)=>{
//     let newState = null
//     switch(action.type){
//         case LOAD_EMAILS:
//             newState = {}
//             if(action.emails && action.emails !== undefined){
//                 action.emails.emails.forEach(ele => {

//                     newState[ele.id] = ele
//                 })
//             }else{
//                 newState = null
//             }
//             return newState

//         case GET_EMAIL:
//             newState = {}
//             // console.log("ACTION", action, 'line 55')
//             // console.log(action.bodyId, '-----store')
//             if(action.emailId && action.emailId !== undefined){
//                 action.emailId.forEach(ele => {
//                     newState[ele.id] = ele
//                 })
//             }else{
//                 newState = null
//             }
//             return newState

//         default:return state
//     }
// }

// export default emailReducer



const LOAD_EMAILS = "emails/loadEmails";
const GET_EMAIL = "emails/getEmail";
const UPDATE_Email = "emails/Update";
const DELETE_Email = 'emails/Delete'
const CREATE_Email = 'emails/Create'

export const loadEmails = (emails) => ({
  type: LOAD_EMAILS,
  emails,
});

export const updateEmail = (email) => ({
  type: UPDATE_Email,
  email,
});

export const getEmail = (emailId) => ({
  type: GET_EMAIL,
  emailId,
});
export const deleteEmail = (email) => ({
    type: DELETE_Email,
    email,
  });

export const createEmail = (email) => ({
    type: CREATE_Email,
    email,
})

export const getAllEmails = (userId) => async (dispatch) => {
  const res = await fetch(`/api/emails/user/${userId}`);
  // console.log(res.text(), '----------')
  if (res.ok) {
    const data = await res.json();
    dispatch(loadEmails(data));
    return data;
  }
  return res;
};

export const getEmailById = (emailId) => async (dispatch) => {
  const res = await fetch(`/api/emails/${emailId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getEmail([data]));
    return data;
  }
  return res;
};

export const updateEmailMaker = (email, emailId) => async (dispatch) => {
  const res = await fetch(`/api/emails/${emailId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateEmail(email));
    return data;
  } else {
    throw res;
  }
};

export const createEmailMaker = (email) => async (dispatch) => {
    const res = await fetch(`/api/emails/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(createEmail(email));
      return data;
    } else {
      throw res;
    }
  };

export const emailDeleteFetch = (emailId) => async (dispatch) => {
    const res = await fetch(`/api/emails/${emailId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(deleteEmail(data));
    } else {
      throw res;
    }
  };

const emailReducer = (state = {}, action) => {
  let newState = null;
  switch (action.type) {
    case LOAD_EMAILS:
      newState = {};
      if (action.emails && action.emails !== undefined) {
        action.emails.emails.forEach((ele) => {
          newState[ele.id] = ele;
        });
      } else {
        newState = null;
      }
      return newState;

    case UPDATE_Email: {
      const emails = { ...state };
      emails[action.email.id] = action.email;

      return { ...emails };
    }
    case CREATE_Email: {
        const emails = { ...state };
        emails[action.email.id] = action.email;

        return { ...emails };
      }

    case DELETE_Email:
        newState = { ...state };
        delete newState[action.email.id];
        return { ...newState };

    case GET_EMAIL:
      newState = {};

      if (action.emailId && action.emailId !== undefined) {
        action.emailId.forEach((ele) => {
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

export default emailReducer;
