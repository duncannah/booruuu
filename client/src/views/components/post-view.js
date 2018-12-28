import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import { postActions } from "../../core/post";

import { Sidebar } from "./";

import "./post-view.scss";

const PLACEHOLDER = {
	_: {
		needsTags: false,
		needsInfo: false,

		needsNotes: false
	},

	id: -1,
	tags: [],
	description: "",
	score: 0,
	fav: 0,
	time: 0,
	author: "Anonymous",
	sources: [],
	fileSize: 0,
	md5: "",
	rating: 0,

	thumb: ["data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 1, 1],

	sample: ["data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 1, 1],

	full: ["data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 1, 1]
};

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
		window.addEventListener("resize", this._updateNotes);

		this._updateNotes();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this._resetPan);
		window.removeEventListener("resize", this._updateNotes);
	}

	componentDidUpdate() {
		this._updateNotes();
	}

	_updateNotes = () => {
		const node = ReactDOM.findDOMNode(this);

		if (node instanceof HTMLElement) {
			const img = node.querySelector(`.viewport img`);
			node.querySelectorAll(`.note`).forEach((el) => {
				el.style.width = `${(parseInt(el.dataset.w) * img.offsetWidth) /
					this.props.post.full[1]}px`;
				el.style.height = `${(parseInt(el.dataset.h) * img.offsetHeight) /
					this.props.post.full[2]}px`;
				el.style.top = `${img.offsetTop +
					(parseInt(el.dataset.y) * img.offsetHeight) / this.props.post.full[2]}px`;
				el.style.left = `${img.offsetLeft +
					(parseInt(el.dataset.x) * img.offsetWidth) / this.props.post.full[1]}px`;

				el.setAttribute(
					"data-align",
					parseInt(el.dataset.x) / this.props.post.full[1] <= 0.5 ? "left" : "right"
				);
			});
		}
	};

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
					post: true,
					failed: this.state.loadFailed
				})}
				onWheel={this._wheel}
				onMouseDown={this._mouseDown}
				onMouseMove={this._mouseMove}
				onMouseUp={this._mouseUp}
				style={{ cursor: this.state.mouseDown ? "grabbing" : "grab" }}>
				<div
					className="viewport"
					style={{
						transform: `scale(${this.state.scale}) translate(${this.state.offsetX}px, ${
							this.state.offsetY
						}px)`
					}}>
					{(this.props.post.notes || []).map((n) => (
						<div className="note" key={`${n.x}.${n.y}`} data-w={n.w} data-h={n.h} data-x={n.x} data-y={n.y}>
							<div className="noteBody">{n.b.replace(/<(.|\n)*?>/g, "")}</div>
						</div>
					))}
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
							this._updateNotes();
						}}
						onError={() => {
							this.setState({ loadFailed: true });
						}}
						key={this.props.post.full[0]}
					/>
				</div>
				<div className="info" onClick={this._resetPan}>
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
			<div className={classNames({ post: true, failed: this.state.loadFailed })}>
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
			if (this.props.in) {
				if (e.key === "Escape") {
					(document.querySelector("video") || { pause: () => {} }).pause();
					this.props.stopViewingPost();
				} else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
					if (e.key === "ArrowLeft" && this.props.postView.post !== 0)
						this.props.startViewingPost(this.props.postView.post - 1);
					else if (e.key === "ArrowRight" && this.props.postView.post + 1 < this.props.posts.length)
						this.props.startViewingPost(this.props.postView.post + 1);
				}
			}
		});
	}

	render() {
		const post =
			this.props.postView.post !== -1 && this.props.posts.hasOwnProperty(this.props.postView.post)
				? this.props.posts[this.props.postView.post]
				: PLACEHOLDER;

		return (
			<div className={classNames({ postView: true, on: this.props.postView.on })}>
				<Sidebar
					openSettingsPopup={this.props.openSettingsPopup}
					postView
					key={"side_" + this.props.postView.post}
				/>

				{["mp4", "webm", "swf"].includes(post.kind) ? (
					<Interactive post={post} key={"img_" + this.props.postView.post} on={this.props.postView.on} />
				) : (
					<Image post={post} key={"img_" + this.props.postView.post} />
				)}
			</div>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		posts: state.post.posts,
		postView: state.post.postView
	};
};

const mapDispatchToProps = {
	startViewingPost: postActions.startViewingPost,
	stopViewingPost: postActions.stopViewingPost
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostView);
