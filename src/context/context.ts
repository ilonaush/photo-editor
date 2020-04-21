import {createContext, useContext} from "react";

const initialState = {
	image: "",
};

const ImageContext = createContext(initialState);

const useImageContext = () => useContext(ImageContext);
export {
	useImageContext,
	ImageContext,
	initialState
}