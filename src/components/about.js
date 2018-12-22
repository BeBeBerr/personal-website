import React from 'react'
import '../styles/about.css'

class About extends React.Component {
    render() {
        return (
            <div className="about-bg">
                <div className="about">
                    <h2 className="about-title">About Me</h2>
                    <div className="about-detail">
                        {this.props.aboutData}
                    </div>
                    <h2 className="about-title">Contact Details</h2>
                    <div className="about-detail">
                        GitHub: github.com/BeBeBerr<br />
                        Blog: blog.wangluyuan.cc<br />
                        E-mail: e@wangluyuan.cc<br />
                    </div>
                </div>
                <ResumeButton resumeLink={this.props.resumeLink}/>
            </div>
        )
    }
}

class ResumeButton extends React.Component {
    handleClick() {
        let link = this.props.resumeLink;
        window.open(link, "_blank");
    }
    render() {
        return (
            <div className="resume-btn" onClick={() => this.handleClick()}>
                <i className="fa fa-download fa-1x" ></i>
                <span className="resume-btn-text">Download Resume</span>
            </div>
        )
    }
}

export default About;