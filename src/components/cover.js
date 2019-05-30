import React from 'react'
import '../styles/cover.css'

class Cover extends React.Component {

    constructor(props) {
        super(props);
        this.onClickNextBtn = this.onClickNextBtn.bind(this);
    }

    onClickNextBtn() {
        /*
        var height = document.documentElement.clientHeight;
        window.scroll({
            left: 0,
            top: height,
            behavior: 'smooth' 
        }); */
        this.props.scrollToNextPage();
    }

    render() {
        return(
            <div className="cover">
                <div className="cover-main">
                    <h1 className="title">I'm Luyuan Wang.</h1>
                    <p className="intro">“长风破浪会有时，直挂云帆济沧海”</p>
                    <hr className="divider" />
                    <IconButtonListView />
                </div>
                <div className="cover-next">
                    <i className="fa fa-chevron-down fa-2x" style={{color: 'white', cursor: 'pointer'}} onClick={this.onClickNextBtn}></i>
                </div>
            </div>
        )
    }
}

class IconButtonListView extends React.Component {
    render() {
        return(
            <div className="cover-icon-list">
                <IconButton iconName="fa fa-github" title="GitHub" url="https://github.com/BeBeBerr"/>
                <IconButton iconName="fa fa-gitlab" title="GitLab" url="https://git.bingyan.net/BeBeBerr"/>
                <IconButton iconName="fa fa-link" title="My Blog" url="http://blog.wangluyuan.cc"/>
                <IconButton iconName="fa fa-weibo" title="Sina Weibo" url="http://weibo.com/BeBeBerr"/>
                <IconButton iconName="fa fa-envelope" title="E-mail" url="mailto:e@wangluyuan.cc"/>
            </div>
        )
    }
}

class IconButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClickBtn = this.onClickBtn.bind(this);
    }
    
    onClickBtn() {
        window.open(this.props.url, "_blank");
    }

    render() {
        return(
            <i className={this.props.iconName} title={this.props.title} style={{color: "white", fontSize: "40px", cursor: "pointer"}} onClick={this.onClickBtn}></i>
        )
    }
}

export default Cover;