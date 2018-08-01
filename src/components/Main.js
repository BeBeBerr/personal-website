import React from 'react';
import Cover from './cover';
import About from './about';
import Resume from './resume';
import Footer from './footer';
import '../styles/App.css'
import scrollToComponent from 'react-scroll-to-component';

var aboutComponent = null;

class AppComponent extends React.Component {

	componentDidMount() {
		aboutComponent = this.about;
	}

	scrollToAbout() {
		scrollToComponent(aboutComponent, {
			align: 'top',
		});
	}

	render() {
		return (
			<div className="root">
				<Cover scrollToNextPage={this.scrollToAbout}/>
				<About ref={(about) => {this.about = about;}}/>
				<Resume />
				<Footer />
			</div>
    	);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
