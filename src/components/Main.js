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

	constructor() {
		super();
		this.state = {
			isChinese: false, // if current language is Chinese
		};
	}

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

	onChangeLanguage() {
		if (this.state.isChinese) {
			this.setState({
				isChinese: false,
			});
		} else {
			this.setState({
				isChinese: true,
			});
		}
	}

	render() {
		return (
			<div className="root">
				<Cover scrollToNextPage={this.scrollToAbout} ref={(cover) => {this.cover = cover;}}/>
				<NavBar onNavBtnClick={this.onNavBtnClick} onChangeLanguage={this.onChangeLanguage.bind(this)}/>
				<About ref={(about) => {this.about = about;}} isChinese={this.state.isChinese}/>
				<Resume ref={(resume) => {this.resume = resume;}} isChinese={this.state.isChinese}/>
				<Footer />
			</div>
    	);
	}
}

/*
AppComponent.defaultProps = {
}; */

export default AppComponent;
