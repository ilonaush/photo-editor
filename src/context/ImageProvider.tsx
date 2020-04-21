import React, {FC, useReducer} from "react";
import {ImageContext, initialState} from "./context";
import {reducer} from "../reducers";
import {setDispatch, useDispatch} from "../hooks/useDispatch";

const ImageProvider: FC<{}> = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);


	setDispatch(dispatch);


	console.log("state", state);

	return (
		<ImageContext.Provider value={state}>
			{children}
		</ImageContext.Provider>
		)
};

export {
	ImageProvider
}