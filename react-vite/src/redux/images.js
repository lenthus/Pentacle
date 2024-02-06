// import { csrfFetch } from "./csrf"

const LOAD_IMAGES= 'images/loadImage'
const GET_IMAGE= 'images/getImage'

export const loadImages=(images)=>({
    type:LOAD_IMAGES,
    images
})

export const getImage =(imageId)=>({
    type:GET_IMAGE,
    imageId
})

export const getAllImages = () => async (dispatch)=>{
    const res = await fetch('/api/images')
    // console.log(res.text(), '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadImages(data))
        return data
    }
    return res
}

export const getImageById = (imageId) => async (dispatch)=>{
    const res = await fetch(`/api/images/${imageId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(getImage([data]))
        return data
    }
    return res
}

const imageReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_IMAGES:
            newState = {}
            // console.log(action.images, '-----store')
            if(action.images && action.images !== undefined){
                action.images.images.forEach(ele => {

                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        case GET_IMAGE:
            newState = {}
            // console.log("ACTION", action, 'line 55')
            // console.log(action.bodyId, '-----store')
            if(action.imageId && action.imageId !== undefined){
                action.imageId.forEach(ele => {
                    newState[ele.id] = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default imageReducer
