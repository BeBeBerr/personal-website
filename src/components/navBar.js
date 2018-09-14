import React from 'react'
import '../styles/navBar.css'
import ReactDOM from 'react-dom'

class NavBar extends React.Component {

    constructor() {
        super();
        this.state = {
            isBackgroundTransparent: true,
            currentPageIndex: 0,
        }
    }

    componentDidMount() {
        //let self = this;
        window.onscroll = () => {
            var aboutY = ReactDOM.findDOMNode(window.componentList[1]).offsetTop - 60;
            var resumeY = ReactDOM.findDOMNode(window.componentList[2]).offsetTop - 60;
            var pageY = window.pageYOffset;
            //设置导航栏背景透明度
            if (pageY > document.body.clientHeight / 2) {
                this.setState({
                    isBackgroundTransparent: false,
                });
            } else {
                this.setState({
                    isBackgroundTransparent: true,
                });
            }
            //随着滚动 自动设置导航栏按钮状态
            var currentPageIndex = 0;
            if (pageY < aboutY) {
                currentPageIndex = 0;
            } else if (pageY >= aboutY && pageY < resumeY) {
                currentPageIndex = 1;
            } else {
                currentPageIndex = 2;
            }
            this.setState({
                currentPageIndex: currentPageIndex,
            });
        }
    }

    onClickNavBtn(index) {
        this.props.onNavBtnClick(index);
    }

    render() {
        return (
            <div className="navbar" style={{backgroundColor: this.state.isBackgroundTransparent ? "transparent" : "#333"}}>
                <NavBarButton text="HOME" father={this} index={0} isHighLight={0 === this.state.currentPageIndex}/>
                <NavBarButton text="ABOUT" father={this} index={1} isHighLight={1 === this.state.currentPageIndex}/>
                <NavBarButton text="RESUME" father={this} index={2} isHighLight={2 === this.state.currentPageIndex}/>
                <SwitchLanguageButton />
            </div>
        );
    }

}

class NavBarButton extends React.Component {

    constructor(props) {
        super(props);
        this.onClickBtn = this.onClickBtn.bind(this);
    }

    onClickBtn() {
        this.props.father.onClickNavBtn(this.props.index);
    }

    render() {
        var styleClassName = this.props.isHighLight ? "navbar-button-highlight" : "navbar-button";
        return(
            <div className={styleClassName} onClick={this.onClickBtn}>{this.props.text}</div>
        );
    }

}

class SwitchLanguageButton extends React.Component {

    onClickBtn() {
        console.log(123);
    }

    render() {
        return(
            <div className="navbar-switch-language" onClick={this.onClickBtn}>中文 / English</div>
        );
    }
}

export default NavBar;