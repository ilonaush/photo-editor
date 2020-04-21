import React, {useCallback} from 'react';
import {ACTIONS} from "../../constants";
import {useDispatch} from "../../hooks/useDispatch";

const ImageLoader = () => {
		const dispatch = useDispatch();

		const loadImage = useCallback( (event) => {
			const image = event.target.files[0];
			const reader = new FileReader();

			reader.addEventListener("load", function () {
				dispatch({type: ACTIONS.setImage, value: reader.result})
			}, false);

			if (image) {
				reader.readAsDataURL(image);
			}
		}, [dispatch]);

		return (
			<div>
				<label htmlFor="file">Load image to start editing</label>
				<input id="file" type="file" onChange={loadImage}/>
			</div>
		);
};

ImageLoader.propTypes = {};

export default ImageLoader;