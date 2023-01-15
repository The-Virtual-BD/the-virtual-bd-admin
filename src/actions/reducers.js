import { createContext } from "react";
import { VIEW_ALL_USER_REQUEST, VIEW_ALL_USER_SUCCESS } from "./actionType";

export const APPContext = createContext();

export const initialState = {
    allUsers: [],
    isLoading: false,
};

/* export const reducer = (state=initialState, action) => {
        switch (action) {
            case VIEW_ALL_USER_REQUEST:
                return (
                    ...state,
                    isLoading: true
                )
            case VIEW_ALL_USER_SUCCESS:
                return()
        
            default:
                return state;
        }
} */