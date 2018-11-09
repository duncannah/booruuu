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
			loadFailed: false,

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
		let zoom = Math.exp((e.deltaY < 0 ? 1 : -1) * 0.065);
		let newScale = this.state.scale * zoom;

		this.setState({
			scale: Math.max(0.1, Math.min(15, newScale))
		});
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
				className={classNames({
					[styles.post]: true,
					[styles.failed]: this.state.loadFailed
				})}
				onWheel={this._wheel}
				onMouseDown={this._mouseDown}
				onMouseMove={this._mouseMove}
				onMouseUp={this._mouseUp}
				style={{ cursor: this.state.mouseDown ? "grabbing" : "grab" }}>
				<div
					className={styles.viewport}
					style={{
						transform: `scale(${this.state.scale}) translate(${this.state.offsetX}px, ${
							this.state.offsetY
						}px)`
					}}>
					<img
						src={this.props.post.full[0]}
						alt=""
						draggable={false}
						style={{
							backgroundImage:
								this.state.imageLoaded || this.state.loadFailed
									? "none"
									: `url(${this.props.post.thumb[0]})`
						}}
						onLoad={() => {
							this.setState({ imageLoaded: true });
						}}
						onError={() => {
							this.setState({ loadFailed: true });
						}}
						key={this.props.post.full[0]}
					/>
				</div>
				<div className={styles.info} onClick={this._resetPan}>
					{Math.round(this.state.scale * 100)}%
				</div>
			</div>
		);
	}
}

class Interactive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadFailed: false
		};
	}

	render() {
		return (
			<div className={classNames({ [styles.post]: true, [styles.failed]: this.state.loadFailed })}>
				{["mp4", "webm"].includes(this.props.post.kind) ? (
					<video controls loop autoPlay poster={this.props.post.sample[0]} src={this.props.post.full[0]} />
				) : this.props.on ? (
					<embed
						src={this.props.post.full[0]}
						width={this.props.post.full[1]}
						height={this.props.post.full[2]}
					/>
				) : (
					""
				)}
			</div>
		);
	}
}

class PostView extends React.Component {
	componentDidMount() {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape" && this.props.in) {
				(document.querySelector("video") || { pause: () => {} }).pause();
				this.props.stopViewingPost();
			}
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

				{["mp4", "webm", "swf"].includes(this.props.postView.post.kind) ? (
					<Interactive
						post={this.props.postView.post}
						key={"img_" + this.props.postView.post.id}
						on={this.props.postView.on}
					/>
				) : (
					<Image post={this.props.postView.post} key={"img_" + this.props.postView.post.id} />
				)}
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
