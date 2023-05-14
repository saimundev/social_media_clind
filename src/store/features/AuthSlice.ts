import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  user: string | null | any;
  show:boolean
  profileShow:boolean
}

const initialState: IAuth = {
  user: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") || "{}")
    : null,
    show:false,
    profileShow:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload;
    },
    logOUt:(state)=>{
      state.user = null
      localStorage.removeItem("auth")
    },

    coverModel:(state,action)=>{
      state.show = action.payload
    },

    profileModel:(stata,action)=>{
      stata.profileShow = action.payload
    }


  },
});

export const { getUser,logOUt,coverModel,profileModel } = authSlice.actions;
export default authSlice.reducer;
