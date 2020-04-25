import React, {useCallback} from 'react';
import {ACTIONS} from "../../constants";
import {useDispatch} from "../../hooks/useDispatch";
import "./image-loader.styl";

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
			<div className="image-load-btn">
				<label htmlFor="file">Load image</label>
				<input id="file" type="file" onChange={loadImage}/>
			</div>
		);
};

ImageLoader.propTypes = {};

export default ImageLoader;