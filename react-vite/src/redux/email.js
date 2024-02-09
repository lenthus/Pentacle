// import { csrfFetch } from "./csrf"

const LOAD_EMAILS= 'emails/loadEmails'
const GET_EMAIL= 'emails/getEmail'

export const loadEmails=(emails)=>({
    type:LOAD_EMAILS,
    emails
})

export const getEmail =(emailId)=>({
    type:GET_EMAIL,
    emailId
})

export const getAllEmails = () => async (dispatch)=>{
    const res = await fetch('/api/emails')
    // console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadEmails(data))
        return data
    }
    return res
}

export const getEmailById = (emailId) => async (dispatch)=>{
    const res = await fetch(`/api/emails/${emailId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(getEmail([data]))
        return data
    }
    return res
}

const emailReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_EMAILS:
            newState = {}
            // console.log(action.emails, '-----store')
            if(action.emails && action.emails !== undefined){
                action.emails.emails.forEach(ele => {

                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        case GET_EMAIL:
            newState = {}
            // console.log("ACTION", action, 'line 55')
            // console.log(action.bodyId, '-----store')
            if(action.emailId && action.emailId !== undefined){
                action.emailId.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default emailReducer
