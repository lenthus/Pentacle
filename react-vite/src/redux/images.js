

const LOAD_IMAGES = "images/loadImages";
const GET_IMAGE = "images/getImage";
const UPDATE_Image = "images/Update";
const DELETE_Image = 'images/Delete'
const CREATE_Image = 'images/Create'

export const loadImages = (images) => ({
  type: LOAD_IMAGES,
  images,
});

export const updateImage = (image) => ({
  type: UPDATE_Image,
  image,
});

export const getImage = (imageId) => ({
  type: GET_IMAGE,
  imageId,
});
export const deleteImage = (image) => ({
    type: DELETE_Image,
    image,
  });

export const createImage = (image) => ({
    type: CREATE_Image,
    image,
})

export const getAllImages = (userId) => async (dispatch) => {
  const res = await fetch(`/api/images/user/${userId}`);
  // console.log(res.text(), '----------')
  if (res.ok) {
    const data = await res.json();
    dispatch(loadImages(data));
    return data;
  }
  return res;
};

export const getImageById = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getImage([data]));
    return data;
  }
  return res;
};

export const updateImageMaker = (image, imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateImage(image));
    return data;
  } else {
    throw res;
  }
};

export const createImageMaker = (image) => async (dispatch) => {
    const res = await fetch(`/api/images/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(createImage(data));
      return data;
    } else {
      throw res;
    }
  };

export const imageDeleteFetch = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(deleteImage(data));
    } else {
      throw res;
    }
  };

const imageReducer = (state = {}, action) => {
  let newState = null;
  switch (action.type) {
    case LOAD_IMAGES:
      newState = {};
      if (action.images && action.images !== undefined) {
        action.images.images.forEach((ele) => {
          newState[ele.id] = ele;
        });
      } else {
        newState = null;
      }
      return newState;

    case UPDATE_Image: {
      const images = { ...state };
      images[action.image.id] = action.image;
      return { ...images };
    }
    case CREATE_Image: {
        const images = { ...state };
        images[action.image.id] = action.image;
        console.log("from updateAction",action.image.id)
        return { ...images };
      }

    case DELETE_Image:
        newState = { ...state };
        delete newState[action.image.id];
        return { ...newState };

    case GET_IMAGE:
      newState = {};
      if (action.imageId && action.imageId !== undefined) {
        action.imageId.forEach((ele) => {
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

export default imageReducer;
