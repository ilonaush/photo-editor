import React, {Component, useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import "./workspace.styl";
import {useImageContext} from "../../context/context";
import saveIcon from "../../images/save-solid.svg";
const Workspace = () => {

	const [percentage, setPercentage] = useState(50);
	const editableCanvas = useRef<HTMLCanvasElement | null>(null);
	const originalCanvas = useRef<HTMLCanvasElement | null>(null);
	const {image} = useImageContext();
	useEffect(() => {
		if (editableCanvas.current && originalCanvas.current) {
			const ctx = editableCanvas.current.getContext("2d");
			const originalCtx = originalCanvas.current.getContext("2d");

			loadImage((imageElement) => {
				if (ctx && originalCtx &&editableCanvas.current && originalCanvas.current) {
					const ratio = (imageElement.width / imageElement.height);
					// let newHeight =  canvas.current.width / ratio;
					// let newWidth = canvas.current.width;
					// if (newHeight >  canvas.current.height) {
					// 	newHeight = canvas.current.height;
					// 	newWidth = newHeight * ratio;
					// }

					const newWidth = imageElement.width * percentage / 100;
					const newHeight = imageElement.height * percentage / 100;
					editableCanvas.current.width  = newWidth;
					editableCanvas.current.height = newHeight;
					originalCanvas.current.width  =  imageElement.width;
					originalCanvas.current.height =  imageElement.height;
					ctx.drawImage(imageElement, 0,0, imageElement.width, imageElement.height, 0,0, newWidth, newHeight);
					originalCtx.drawImage(imageElement, 0,0, imageElement.width, imageElement.height, 0,0, imageElement.width, imageElement.height);
				}
			})
		}
	}, []);

	const loadImage = (callback: (imageElement: HTMLImageElement) => void) => {
		const imageElement = new Image();
		imageElement.src = image;
		imageElement.onload = () => callback(imageElement);
	};

	const saveImage = useCallback(() => {
		const originalCanvasRef = originalCanvas.current;
		if (originalCanvasRef) {
			const savedImage = originalCanvasRef.toDataURL('image/jpeg', 1.0);
			const element = document.createElement('a');
			element.setAttribute('href', savedImage);
			element.setAttribute('download', "file");

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);

		}
	}, []);

	useEffect(() => {
		const canvasRef = editableCanvas.current;
		if (canvasRef) {
			const ctx = canvasRef.getContext("2d");
			if (ctx) {
				loadImage((imageElement) => {
					const newWidth = imageElement.width * percentage / 100;
					const newHeight = imageElement.height * percentage / 100;
					ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
					canvasRef.width  = newWidth;
					canvasRef.height = newHeight;
					ctx.drawImage(imageElement, 0,0, imageElement.width, imageElement.height, 0,0,newWidth, newHeight);
				})
			}
		}
	}, [percentage]);

	const getBigger = () => {
		setPercentage((prevState => prevState + 10));
	};


	const onDragOver = (e: any) => {
		e.preventDefault();
	};

	const onDragStart = (event: any) => {
		event.persist();
		console.log("event", event);
		console.log(event.pageY);
	};

	const onDrag = (event: any) => {
		event.persist();
		console.log("onDrag event", event);
		console.log("onDrag event", event.pageY);

	};

	const getSmaller = () => {
		setPercentage((prevState => prevState - 10 > 20 ? prevState - 10  : prevState));
	};
	return (
		<div className="workspace" onDragOver={onDragOver}>
			<canvas ref={editableCanvas} draggable onDragStart={onDragStart} onDrag={onDrag}>Your browser doesn't not support canvas API. Upgrade your browser to be able to edit photos.</canvas>
			<canvas ref={originalCanvas} style={{display: "none"}}>Your browser doesn't not support canvas API. Upgrade your browser to be able to edit photos.</canvas>
			<div className="save-btn" onClick={saveImage}>
				<img src={saveIcon} alt=""/>
			</div>

			<div className="navigate">
				<div className="plus" onClick={getBigger}>+
				</div>
				<div className="minus" onClick={getSmaller}>-</div>
			</div>

		</div>
	);
};

Workspace.propTypes = {};

export default Workspace;