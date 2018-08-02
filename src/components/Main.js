import React from 'react';
import Cover from './cover';
import About from './about';
import Resume from './resume';
import Footer from './footer';
import NavBar from './navBar';
import '../styles/App.css'
import scrollToComponent from 'react-scroll-to-component';

var coverComponent = null;
var aboutComponent = null;
var resumeComponent = null;

class AppComponent extends React.Component {

	componentDidMount() {
		coverComponent = this.cover;
		aboutComponent = this.about;
		resumeComponent = this.resume;
	}

	scrollToAbout() {
		scrollToComponent(aboutComponent, {
			align: 'top',
		});
	}

	onNavBtnClick(index) {
		var component = null;
		switch(index) {
			case 0:
				component = coverComponent;
				break;
			case 1:
				component = aboutComponent;
				break;
			default:
				component = resumeComponent;
				break;
		}
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
