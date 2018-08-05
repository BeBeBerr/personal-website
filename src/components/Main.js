import React from 'react';
import Cover from './cover';
import About from './about';
import Resume from './resume';
import Footer from './footer';
import NavBar from './navBar';
import '../styles/App.css'
import scrollToComponent from 'react-scroll-to-component';

var componentList = [];

class AppComponent extends React.Component {

	componentDidMount() {
		componentList.push(this.cover);
		componentList.push(this.about);
		componentList.push(this.resume);
		window.componentList = componentList;
	}

	scrollToAbout() {
		scrollToComponent(componentList[1], {
			align: 'top',
		});
	}

	onNavBtnClick(index) {
		var component = componentList[index];
		scrollToComponent(component, {
			align: 'top',
			offset: -50,
		});
	}

	render() {
		return (
			<div className="root">
				<Cover scrollToNextPage={this.scrollToAbout} ref={(cover) => {this.cover = cover;}}/>
				<NavBar onNavBtnClick={this.onNavBtnClick}/>
				<About ref={(about) => {this.about = about;}}/>
				<Resume ref={(resume) => {this.resume = resume;}}/>
				<Footer />
			</div>
    	);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
