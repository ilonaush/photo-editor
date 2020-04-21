import {ACTIONS} from "../constants";

const reducer = (state: any, payload: any) => {
	switch (payload.type) {
		case ACTIONS.setImage: {
			return {
				...state,
				image: payload.value
			}
		}
		default: {
			return {...state}
		}
	}
};

export {
	reducer
}