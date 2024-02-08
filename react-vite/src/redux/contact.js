

const LOAD_CONTACTS = "contacts/loadContacts";
const GET_CONTACT = "contacts/getContact";
const UPDATE_Contact = "contacts/Update";
const DELETE_Contact = 'contacts/Delete'

export const loadContacts = (contacts) => ({
  type: LOAD_CONTACTS,
  contacts,
});

export const updateContact = (contact) => ({
  type: UPDATE_Contact,
  contact,
});

export const getContact = (contactId) => ({
  type: GET_CONTACT,
  contactId,
});
export const deleteContact = (contact) => ({
    type: DELETE_Contact,
    contact,
  });

export const getAllContacts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/contacts/${userId}`);
  // console.log(res.text(), '----------')
  if (res.ok) {
    const data = await res.json();
    dispatch(loadContacts(data));
    return data;
  }
  return res;
};

export const getContactById = (contactId) => async (dispatch) => {
  const res = await fetch(`/api/contacts/${contactId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getContact([data]));
    return data;
  }
  return res;
};

export const updateContactMaker = (contact, contactId) => async (dispatch) => {
  const res = await fetch(`/api/contacts/${contactId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateContact(contact));
    return data;
  } else {
    throw res;
  }
};

export const contactDeleteFetch = (contactId) => async (dispatch) => {
    const res = await fetch(`/api/contacts/${contactId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(deleteContact(data));
    } else {
      throw res;
    }
  };

const contactReducer = (state = {}, action) => {
  let newState = null;
  switch (action.type) {
    case LOAD_CONTACTS:
      newState = {};
      // console.log(action.contacts, '-----store')
      if (action.contacts && action.contacts !== undefined) {
        action.contacts.contacts.forEach((ele) => {
          newState[ele.id] = ele;
        });
      } else {
        newState = null;
      }
      return newState;

    case UPDATE_Contact: {
      const contacts = { ...state };
      contacts[action.contact.id] = action.contact;
      console.log("from updateAction",action.contact)
      return { ...contacts };
    }
    case DELETE_Contact:
        newState = { ...state };
        delete newState[action.contact.id];
        return { ...newState };


    case GET_CONTACT:
      newState = {};
      // console.log("ACTION", action, 'line 55')
      // console.log(action.bodyId, '-----store')
      if (action.contactId && action.contactId !== undefined) {
        action.contactId.forEach((ele) => {
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

export default contactReducer;
