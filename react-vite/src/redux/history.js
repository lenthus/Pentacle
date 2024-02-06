// import { csrfFetch } from "./csrf"

const LOAD_HISTORYS= 'historys/loadHistorys'
const GET_HISTORY= 'historys/getHistory'

export const loadHistorys=(historys)=>({
    type:LOAD_HISTORYS,
    historys
})

export const getHistory =(historyId)=>({
    type:GET_HISTORY,
    historyId
})

export const getAllHistorys = () => async (dispatch)=>{
    const res = await fetch('/api/historys')
    // console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadHistorys(data))
        return data
    }
    return res
}

export const getHistoryById = (historyId) => async (dispatch)=>{
    const res = await fetch(`/api/historys/${historyId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(getHistory([data]))
        return data
    }
    return res
}

const historyReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_HISTORYS:
            newState = {}
            // console.log(action.historys, '-----store')
            if(action.historys && action.historys !== undefined){
                action.historys.historys.forEach(ele => {

                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        case GET_HISTORY:
            newState = {}
            // console.log("ACTION", action, 'line 55')
            // console.log(action.bodyId, '-----store')
            if(action.historyId && action.historyId !== undefined){
                action.historyId.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default historyReducer
