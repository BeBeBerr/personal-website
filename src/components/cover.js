import React from 'react'
import waves from 'vanta/dist/vanta.waves.min'
import '../styles/cover.css'

class Cover extends React.Component {

    constructor(props) {
        super(props);
        this.onClickNextBtn = this.onClickNextBtn.bind(this);
        this.vantaRef = React.createRef();
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

    componentDidMount() {
        this.vantaEffect = waves({
            el: this.vantaRef.current,
            color: 0x73255,
            shininess: 57.00
        });
    }

    componentWillUnmount() {
        if (this.vantaEffect) {
            this.vantaEffect.destroy();
        }
    }

    render() {
        return(
            <div className="cover" ref={this.vantaRef}>
                <div className="cover-main">
                    <h1 className="title">I'm Luyuan Wang.</h1>
                    <p className="intro">Sometimes You Win, Sometimes You Learn.</p>
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
                <IconButton iconName="fa fa-linkedin-square" title="LinkedIn" url="https://www.linkedin.com/in/luyuanwang/"/>
                <IconButton iconName="fa fa-link" title="My Blog" url="http://blog.wangluyuan.cc"/>
                <IconButton iconName="fa fa-weibo" title="Sina Weibo" url="http://weibo.com/BeBeBerr"/>
                <IconButton iconName="fa fa-envelope" title="E-mail" url="mailto:mail@luyuan.wang"/>
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