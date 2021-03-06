import React from 'react';
import DataRenderer from './DataRenderer';

export default class News extends React.Component {

	state = {
		rss: [],
		twitter: [],
		facebook: []
	};

	componentDidMount() {
		this.load();
	}

	fetchData = (dataName) => {
		const dataUrl = `https://s3.eu-central-1.amazonaws.com/moje-mesto-serve/${dataName}.json`;
		fetch(dataUrl)
			.then(response => response.json())
			.then(data => {
				const newState = { ...this.state }
				newState[dataName] = data;
				this.setState(newState);
			})
			.catch(err => console.error(dataUrl, err.toString()))
	}

	load = () => {
		['rss', 'twitter', 'facebook'].forEach(dataName => this.fetchData(dataName));
	}

	render() {
		return <>
			<p className="lead mt-5">Výběr novinek pro tvoje město!</p>
			<div className="mt-5">
				<h2 className="mb-3">Facebook</h2>
				<div className="row">
					{this.state.facebook.map((data, idx) => <DataRenderer key={`DataRenderer_${idx}`} dataName={data[0].dataName} data={data} />)}
				</div>
			</div>
			<div className="mt-5">
				<h2 className="mb-3">Twitter</h2>
				<div className="row">
					{this.state.twitter.map((data, idx) => <DataRenderer key={`DataRenderer_${idx}`} dataName={data[0].dataName} data={data} />)}
				</div>
			</div>
			<div className="mt-5">
				<h2 className="mb-3">Pardubice.eu</h2>
				<div className="row">
					{this.state.rss.map((data, idx) => <DataRenderer key={`DataRenderer_${idx}`} dataName={data[0].dataName} data={data} />)}
				</div>
			</div>
		</>
	}

}
