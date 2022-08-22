import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL } from "utils/constants";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/gateway/branch/role/get-all`, {
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

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (createPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/billing/role/new`,
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

export const editRole = createAsyncThunk(
  "roles/editRole",
  async (editPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.put(
        `${BASE_API_URL}/church/roles/${editPayload.id}/`,
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

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (roleId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.delete(`${BASE_API_URL}/church/roles/${roleId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return roleId;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    loading: "FETCH_ROLES",
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
    [fetchRoles.pending]: (state) => {
      state.roles = [];
      delete state.error;
      delete state.success;
      state.loading = "FETCH_ROLES";
    },
    [fetchRoles.fulfilled]: (state, action) => {
      state.success = "FETCH_ROLES";
      state.roles = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchRoles.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_ROLES",
      };
      delete state.loading;
    },

    [createRole.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "CREATE_ROLE";
    },
    [createRole.fulfilled]: (state, action) => {
      state.success = "CREATE_ROLE";
      state.roles.push(action.payload);
      delete state.loading;
      delete state.error;
    },
    [createRole.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "CREATE_ROLE",
      };
      delete state.loading;
    },

    [editRole.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "EDIT_ROLE";
    },
    [editRole.fulfilled]: (state, action) => {
      state.success = "EDIT_ROLE";
      const role = state.roles.find((role) => role.id === action.payload.id);
      // delete state.tempNote;
      Object.assign(role, action.payload);
      // state.roles = action.payload;
      delete state.loading;
      delete state.error;
    },
    [editRole.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "EDIT_ROLE",
      };
      delete state.loading;
    },

    [deleteRole.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_ROLE";
      const position = state.roles.findIndex(
        (role) => role.id === action.meta.arg
      );
      state.backupRole = Object.assign({}, state.roles[position]);
      state.backupPosition = position;
    },
    [deleteRole.fulfilled]: (state) => {
      state.success = "DELETE_ROLE";
      state.roles.splice(state.backupPosition, 1);
      delete state.backupRole;
      delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteRole.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_ROLE",
      };
      delete state.backupPosition;
      delete state.backupRole;
      delete state.loading;
    },
  },
});
export const { clearStates } = roleSlice.actions;
export const roleActions = roleSlice.actions;
export default roleSlice.reducer;
