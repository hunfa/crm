import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  departments: []
}

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {

    AddDepartment: (state, action) => {
      state.departments.push(action.payload);
    }

  }
})
export const { AddDepartment } = departmentSlice.actions
export default departmentSlice.reducer
