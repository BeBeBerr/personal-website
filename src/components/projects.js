import React from 'react';
import '../styles/projects.css'
import Footer from './footer';
var data = require('../data/data.json');

class ProjectPage extends React.Component {


	render() {

		return (
            <div>
			    <ProjectHeader />
                <ProjectCardListView />
                <Footer />
            </div>
    	);
	}
}

class ProjectCardListView extends React.Component {
    
    render() {

        let cardList = [];
        for (var index in data.project.data) {
            let projectData = data.project.data[index];
            let card = <ProjectCard 
                key={index}
                title={projectData.title} 
                imageSrc={projectData.imageSrc} 
                detail={projectData.detail}/>;
            cardList.push(card);
        }
        return(
            <div className="project-card-list">
                {cardList}
            </div>
        )
    }
}


class ProjectCard extends React.Component {
    render() {
        return(
            <div className="project-card">
                <div className="project-card-title">{this.props.title}</div>
                <ProjectImage imageSrc={this.props.imageSrc}/>
                <div className="project-detail">
                    <p>{this.props.detail}</p>
                </div>
            </div>
        )
    }
}


class ProjectImage extends React.Component {
    render() {
        return(
            <div className="project-image-wrapper">
                <img className="project-image" src={require("../" + this.props.imageSrc)} alt={""}></img>
                <div className="project-image-mask"></div>
            </div>
            
        );
    }
}


class ProjectHeader extends React.Component {

    render() {
        return(
            <div className="project-header">
                My Projects.
            </div>
        )
    }
}



export default ProjectPage;