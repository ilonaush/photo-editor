import React from 'react';
import ImageLoader from "../image-loader/image-loader";
import {useImageContext} from "../../context/context";


const Header = () => {
		const {image} = useImageContext();
		return (
			<header className="app-header">
				<h1>photo editor</h1>
				{image && <ImageLoader/>}
			</header>
		);
};



export default Header;