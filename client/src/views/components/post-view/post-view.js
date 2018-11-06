import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
//import { CSSTransition } from "react-transition-group";

import { postActions } from "../../../core/post";

import Sidebar from "../sidebar";

import styles from "./post-view.module.scss";

class Image extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false,

			scale: 1,
			offsetX: 0,
			offsetY: 0,

			mouseDown: false,
			lastMousePos: [0, 0]
		};
	}

	componentDidMount() {
		window.addEventListener("resize", this._resetPan);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this._resetPan);
	}

	_resetPan = () => {
		this.setState({ scale: 1, offsetX: 0, offsetY: 0, mouseDown: false });
	};

	_wheel = (e) => {
		let scaleMultiplier = e.deltaY < 0 ? 1 + 0.065 : 1 - 0.065;
		let newScale = this.state.scale * scaleMultiplier;

		if (Math.round(newScale * 10) === 10) newScale = 1;

		this.setState({ scale: Math.max(0.1, Math.min(15, newScale)) });
	};

	_mouseDown = (e) => {
		this.setState({ mouseDown: true, lastMousePos: [e.clientX, e.clientY] });
	};

	_mouseMove = (e) => {
		if (this.state.mouseDown)
			this.setState({
				offsetX: this.state.offsetX + e.clientX - this.state.lastMousePos[0],
				offsetY: this.state.offsetY + e.clientY - this.state.lastMousePos[1],
				lastMousePos: [e.clientX, e.clientY]
			});
	};

	_mouseUp = (e) => {
		this.setState({ mouseDown: false, lastMousePos: [0, 0] });
	};

	render() {
		return (
			<div
				className={styles.post}
				onWheel={this._wheel}
				onMouseDown={this._mouseDown}
				onMouseMove={this._mouseMove}
				onMouseUp={this._mouseUp}
				style={{
					cursor: this.state.mouseDown ? "grabbing" : "grab"
				}}>
				<img
					src={this.props.post.full[0] || ""}
					alt=""
					draggable={false}
					style={{
						backgroundImage: this.state.imageLoaded ? "none" : `url(${this.props.post.thumb[0] || ""})`,
						transform: `scale(${this.state.scale})`,
						top: `${this.state.offsetY}px`,
						bottom: `${-this.state.offsetY}px`,
						left: `${this.state.offsetX}px`,
						right: `${-this.state.offsetX}px`
					}}
					onLoad={() => {
						this.setState({ imageLoaded: true });
					}}
				/>
				<div className={styles.info} onClick={this._resetPan}>
					{Math.round(this.state.scale * 100)}%
				</div>
			</div>
		);
	}
}

class PostView extends React.Component {
	componentDidMount() {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape" && this.props.in) this.props.stopViewingPost();
		});
	}

	render() {
		return (
			<div className={classNames({ [styles.postView]: true, [styles.on]: this.props.postView.on })}>
				<Sidebar
					openSettingsPopup={this.props.openSettingsPopup}
					postView
					key={"side_" + this.props.postView.post.id}
				/>

				<Image post={this.props.postView.post} key={"img_" + this.props.postView.post.id} />
			</div>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		postView: state.post.postView
	};
};

const mapDispatchToProps = {
	stopViewingPost: postActions.stopViewingPost
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostView);
