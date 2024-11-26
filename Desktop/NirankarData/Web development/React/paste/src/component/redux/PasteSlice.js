import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pasters: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem('pastes'))
        : []
}

export const PasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPaste: (state, action) => {
            const paste = action.payload;
            state.pasters.push(paste);
            
          // Save the updated array as a JSON string
        localStorage.setItem("pastes", JSON.stringify(state.pasters));
        
            toast("Paste Created Successfully");
        },
        updateToPaste: (state, action) => {

        },
        resetAllPaste: (state, action) => {

        },
        removeFromPaste: (state, action) => {

        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = PasteSlice.actions

export default PasteSlice.reducer