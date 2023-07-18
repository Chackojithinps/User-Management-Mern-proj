import {createSlice} from "@reduxjs/toolkit"

const UserAuth = createSlice({
    name:"user",
    initialState:{
        userToken:null,
        userName:null
    },
    reducers:{
      addUserDetails(state,action) {
          const userDetails = action.payload;
          state.userToken = userDetails.token;
          state.userName = userDetails.name;
          console.log("userDetails :" , userDetails)
       },
       userLogout(state,action){
          state.userToken = "";
          state.userName = "";
    
       }
    }
  })

export const {addUserDetails,userLogout} = UserAuth.actions;
export default UserAuth