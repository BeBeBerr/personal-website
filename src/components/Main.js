import React from 'react';
import Cover from './cover';
import About from './about';
import Resume from './resume';
import Footer from './footer';
import '../styles/App.css'


class AppComponent extends React.Component {
	render() {
		return (
			<div className="root">
				<Cover />
				<About />
				<Resume />
				<Footer />
			</div>
    	);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
