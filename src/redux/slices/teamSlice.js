import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL } from "utils/constants";

export const fetchTeam = createAsyncThunk(
  "teams/fetchTeam",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/teams/${fetchPayload?.id}`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const fetchTeamById = createAsyncThunk(
  "teams/fetchTeamById",
  async (teamId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const fetchTeamActivities = createAsyncThunk(
  "teams/fetchTeamActivities",
  async (fetchPayload, thunkAPI) => {
    try {
      const { data } = await Axios.get(`${BASE_API_URL}/visits/`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const fetchTeamMembers = createAsyncThunk(
  "teams/fetchTeamMembers",
  async (fetchPayload, thunkAPI) => {
    try {
      const { data } = await Axios.get(`${BASE_API_URL}/teams/members/`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const fetchMembersByTeamId = createAsyncThunk(
  "teams/fetchMembersByTeamId",
  async (fetchPayload, thunkAPI) => {
    try {
      const { data } = await Axios.get(`${BASE_API_URL}/teams/members/`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (createPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/teams`,
        createPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const addMemberToTeam = createAsyncThunk(
  "teams/addMemberToTeam",
  async (addPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/teams/members/`,
        addPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const acceptTeamInvite = createAsyncThunk(
  "teams/acceptTeamInvite",
  async (acceptPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/teams/members/`,
        acceptPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const editTeam = createAsyncThunk(
  "teams/editTeam",
  async (editPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.patch(
        `${BASE_API_URL}/teams/${editPayload.id}/`,
        editPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "base_acccess_token"
            )}`,
          },
        }
      );
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const uploadTeamImage = createAsyncThunk(
  "teams/uploadTeamImage",
  async (formData, thunkAPI) => {
    try {
      const { data } = await Axios.post(`${BASE_API_URL}/files`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (teamId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.delete(`${BASE_API_URL}/church/teams/${teamId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return teamId;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const deleteTeamMember = createAsyncThunk(
  "teams/deleteTeamMember",
  async (deletePayload, thunkAPI) => {
    try {
      const { data } = await Axios.delete(`${BASE_API_URL}/teams/members/`, {
        params: deletePayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return deletePayload.user_id;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    team: null,
    teamActivities: { data: [] },
    teamMembers: { data: [], unregistered_members: [] },
    loading: "FETCH_TEAMS",
    error: "",
    success: "",
  },
  reducers: {
    clearStates: (state, { payload }) => {
      delete state.loading;
      delete state.error;
      delete state.success;
    },
  },
  extraReducers: {
    [fetchTeam.pending]: (state) => {
      state.team = null;
      delete state.error;
      delete state.success;
      state.loading = "FETCH_TEAM";
    },
    [fetchTeam.fulfilled]: (state, action) => {
      state.success = "FETCH_TEAM";
      state.team = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchTeam.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_TEAM",
      };
      delete state.loading;
    },

    [fetchTeamActivities.pending]: (state) => {
      state.teamActivities = { data: [] };
      delete state.error;
      delete state.success;
      state.loading = "FETCH_TEAM_ACTIVITIES";
    },
    [fetchTeamActivities.fulfilled]: (state, action) => {
      state.success = "FETCH_TEAM_ACTIVITIES";
      state.teamActivities = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchTeamActivities.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_TEAM_ACTIVITIES",
      };
      delete state.loading;
    },

    [fetchTeamMembers.pending]: (state) => {
      state.teamMembers = { data: [] };
      delete state.error;
      delete state.success;
      state.loading = "FETCH_TEAM_MEMBERS";
    },
    [fetchTeamMembers.fulfilled]: (state, action) => {
      state.success = "FETCH_TEAM_MEMBERS";
      state.teamMembers = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchTeamMembers.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_TEAM_MEMBERS",
      };
      delete state.loading;
    },

    [createTeam.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "CREATE_TEAM";
    },
    [createTeam.fulfilled]: (state, action) => {
      state.success = "CREATE_TEAM";
      state.team = action.payload?.data;
      delete state.loading;
      delete state.error;
    },
    [createTeam.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "CREATE_TEAM",
      };
      delete state.loading;
    },

    [addMemberToTeam.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "ADD_TEAM_MEMBER";
    },
    [addMemberToTeam.fulfilled]: (state, action) => {
      state.success = "ADD_TEAM_MEMBER";
      state.teamMembers = action.payload;
      delete state.loading;
      delete state.error;
    },
    [addMemberToTeam.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "ADD_TEAM_MEMBER",
      };
      delete state.loading;
    },

    [acceptTeamInvite.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "ACCEPT_TEAM_INVITE";
    },
    [acceptTeamInvite.fulfilled]: (state, action) => {
      state.success = "ACCEPT_TEAM_INVITE";
      delete state.loading;
      delete state.error;
    },
    [acceptTeamInvite.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "ACCEPT_TEAM_INVITE",
      };
      delete state.loading;
    },

    [editTeam.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "EDIT_TEAM";
    },
    [editTeam.fulfilled]: (state, action) => {
      state.success = "EDIT_TEAM";
      // delete state.tempNote;
      state.team = action.payload;
      delete state.loading;
      delete state.error;
    },
    [editTeam.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "EDIT_TEAM",
      };
      delete state.loading;
    },

    [uploadTeamImage.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "UPLOAD_TEAM_IMAGE";
    },
    [uploadTeamImage.fulfilled]: (state, action) => {
      state.success = "UPLOAD_TEAM_IMAGE";

      state.team.logo = action.payload;
      delete state.loading;
      delete state.error;
    },
    [uploadTeamImage.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "UPLOAD_TEAM_IMAGE",
      };
      delete state.loading;
    },

    [deleteTeam.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_TEAM";
      state.backupPosition = position;
    },
    [deleteTeam.fulfilled]: (state) => {
      state.success = "DELETE_TEAM";
      state.team = null;
      delete state.backupTeam;
      delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteTeam.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_TEAM",
      };
      delete state.backupPosition;
      delete state.backupTeam;
      delete state.loading;
    },

    [deleteTeamMember.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_TEAM_MEMBER";
      // const position = state.teamMembers.data.findIndex(
      //   (team) => team.id === action.meta.arg
      // );
      // state.backupTeam = Object.assign({}, state.teamMembers.data[position]);
      // state.backupPosition = position;
    },
    [deleteTeamMember.fulfilled]: (state) => {
      state.success = "DELETE_TEAM_MEMBER";
      // state.teamMembers.data.splice(state.backupPosition, 1);
      // delete state.backupTeam;
      // delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteTeamMember.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_TEAM_MEMBER",
      };
      // delete state.backupPosition;
      // delete state.backupTeam;
      delete state.loading;
    },
  },
});
export const { clearStates } = teamSlice.actions;
export const teamActions = teamSlice.actions;
export default teamSlice.reducer;
