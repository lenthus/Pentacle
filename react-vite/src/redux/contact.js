// import { csrfFetch } from "./csrf"

const LOAD_CONTACTS= 'contacts/loadContacts'
const GET_CONTACT= 'contacts/getContact'

export const loadContacts=(contacts)=>({
    type:LOAD_CONTACTS,
    contacts
})

export const getContact =(contactId)=>({
    type:GET_CONTACT,
    contactId
})

export const getAllContacts = (userId) => async (dispatch)=>{
    const res = await fetch(`/api/contacts/${userId}`)
    // console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadContacts(data))
        return data
    }
    return res
}

export const getContactById = (contactId) => async (dispatch)=>{
    const res = await fetch(`/api/contacts/${contactId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(getContact([data]))
        return data
    }
    return res
}

const contactReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_CONTACTS:
            newState = {}
            // console.log(action.contacts, '-----store')
            if(action.contacts && action.contacts !== undefined){
                action.contacts.contacts.forEach(ele => {

                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        case GET_CONTACT:
            newState = {}
            // console.log("ACTION", action, 'line 55')
            // console.log(action.bodyId, '-----store')
            if(action.contactId && action.contactId !== undefined){
                action.contactId.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default contactReducer
