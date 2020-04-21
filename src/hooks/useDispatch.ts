let dispatch: any = null;

const setDispatch = (value: any) => {
	dispatch = value;

};

const useDispatch = () => {
	return dispatch;
};

export {
	useDispatch,
	setDispatch
}