import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL } from "utils/constants";

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/gateway/branch/payment/get-all`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const fetchPaymentPlans = createAsyncThunk(
  "payments/fetchPaymentPlans",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/plans`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const fetchPaymentReference = createAsyncThunk(
  "payments/fetchPaymentReference",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/payment/reference`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const fetchPaymentMethods = createAsyncThunk(
  "payments/fetchPaymentMethods",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/payments/methods`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (createPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/billing/payment/new`,
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
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const addPaymentMethod = createAsyncThunk(
  "payments/addPaymentMethod",
  async (addPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/payments/methods`,
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
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const editPayment = createAsyncThunk(
  "payments/editPayment",
  async (editPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.put(
        `${BASE_API_URL}/church/payments/${editPayload.id}/`,
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
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

export const deletePayment = createAsyncThunk(
  "payments/deletePayment",
  async (paymentId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.delete(`${BASE_API_URL}/church/payments/${paymentId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("base_acccess_token")}`,
        },
      });
      return paymentId;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue({ error: response.data });
    }
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [],
    paymentPlans: [],
    paymentMethods: [],
    loading: "FETCH_PAYMENTS",
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
    [fetchPayments.pending]: (state) => {
      state.payments = [];
      delete state.error;
      delete state.success;
      state.loading = "FETCH_PAYMENTS";
    },
    [fetchPayments.fulfilled]: (state, action) => {
      state.success = "FETCH_PAYMENTS";
      state.payments = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchPayments.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_PAYMENTS",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [fetchPaymentPlans.pending]: (state) => {
      state.paymentPlans = [];
      delete state.error;
      delete state.success;
      state.loading = "FETCH_PAYMENT_PLANS";
    },
    [fetchPaymentPlans.fulfilled]: (state, action) => {
      state.success = "FETCH_PAYMENT_PLANS";
      state.paymentPlans = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchPaymentPlans.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_PAYMENT_PLANS",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [fetchPaymentReference.pending]: (state) => {
      // state.paymentReference = [];
      delete state.error;
      delete state.success;
      state.loading = "FETCH_PAYMENT_PLANS";
    },
    [fetchPaymentReference.fulfilled]: (state, action) => {
      state.success = "FETCH_PAYMENT_PLANS";
      // state.paymentReference = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchPaymentReference.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_PAYMENT_PLANS",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [fetchPaymentMethods.pending]: (state) => {
      state.paymentMethods = [];
      delete state.error;
      delete state.success;
      state.loading = "FETCH_PAYMENT_METHODS";
    },
    [fetchPaymentMethods.fulfilled]: (state, action) => {
      state.success = "FETCH_PAYMENT_METHODS";
      state.paymentMethods = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchPaymentMethods.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_PAYMENT_METHODS",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [createPayment.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "CREATE_PAYMENT";
    },
    [createPayment.fulfilled]: (state, action) => {
      state.success = "CREATE_PAYMENT";
      state.payments.push(action.payload);
      delete state.loading;
      delete state.error;
    },
    [createPayment.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "CREATE_PAYMENT",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [addPaymentMethod.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "ADD_PAYMENT_METHOD";
    },
    [addPaymentMethod.fulfilled]: (state, action) => {
      state.success = "ADD_PAYMENT_METHOD";
      delete state.loading;
      delete state.error;
    },
    [addPaymentMethod.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "ADD_PAYMENT_METHOD",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [editPayment.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "EDIT_PAYMENT";
    },
    [editPayment.fulfilled]: (state, action) => {
      state.success = "EDIT_PAYMENT";
      const payment = state.payments.find(
        (payment) => payment.id === action.payload.id
      );
      // delete state.tempNote;
      Object.assign(payment, action.payload);
      // state.payments = action.payload;
      delete state.loading;
      delete state.error;
    },
    [editPayment.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "EDIT_PAYMENT",
        errorMessage: payload?.error,
      };
      delete state.loading;
    },

    [deletePayment.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_PAYMENT";
      const position = state.payments.findIndex(
        (payment) => payment.id === action.meta.arg
      );
      state.backupPayment = Object.assign({}, state.payments[position]);
      state.backupPosition = position;
    },
    [deletePayment.fulfilled]: (state) => {
      state.success = "DELETE_PAYMENT";
      state.payments.splice(state.backupPosition, 1);
      delete state.backupPayment;
      delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deletePayment.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_PAYMENT",
        errorMessage: payload?.error,
      };
      delete state.backupPosition;
      delete state.backupPayment;
      delete state.loading;
    },
  },
});
export const { clearStates } = paymentSlice.actions;
export const paymentActions = paymentSlice.actions;
export default paymentSlice.reducer;
