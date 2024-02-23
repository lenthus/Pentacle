

const LOAD_GROUPS = "groups/loadGroups";
const GET_GROUP = "groups/getGroup";
const UPDATE_Group = "groups/Update";
const DELETE_Group = 'groups/Delete'
const CREATE_Group = 'groups/Create'

export const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  groups,
});

export const updateGroup = (group) => ({
  type: UPDATE_Group,
  group,
});

export const getGroup = (groupId) => ({
  type: GET_GROUP,
  groupId,
});
export const deleteGroup = (group) => ({
    type: DELETE_Group,
    group,
  });

export const createGroup = (group) => ({
    type: CREATE_Group,
    group,
})

export const getAllGroups = (userId) => async (dispatch) => {
  const res = await fetch(`/api/groups/user/${userId}`);
  // console.log(res.text(), '----------')
  if (res.ok) {
    const data = await res.json();
    dispatch(loadGroups(data));
    return data;
  }
  return res;
};

export const getGroupById = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getGroup([data]));
    return data;
  }
  return res;
};

export const updateGroupMaker = (group, groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateGroup(group));
    return data;
  } else {
    throw res;
  }
};

export const createGroupMaker = (group) => async (dispatch) => {
    const res = await fetch(`/api/groups/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(createGroup(group));
      return data;
    } else {
      throw res;
    }
  };

export const groupDeleteFetch = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(deleteGroup(data));
    } else {
      throw res;
    }
  };

const groupReducer = (state = {}, action) => {
  let newState = null;
  switch (action.type) {
    case LOAD_GROUPS:
      newState = {};
      if (action.groups && action.groups !== undefined) {
        action.groups.groups.forEach((ele) => {
          newState[ele.id] = ele;
        });
      } else {
        newState = null;
      }
      return newState;

    case UPDATE_Group: {
      const groups = { ...state };
      groups[action.group.id] = action.group;

      return { ...groups };
    }
    case CREATE_Group: {
        const groups = { ...state };
        groups[action.group.id] = action.group;

        return { ...groups };
      }

    case DELETE_Group:
        newState = { ...state };
        delete newState[action.group.id];
        return { ...newState };

    case GET_GROUP:
      newState = {};
  
      if (action.groupId && action.groupId !== undefined) {
        action.groupId.forEach((ele) => {
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

export default groupReducer;
