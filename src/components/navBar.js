import React from 'react'
import '../styles/navBar.css'

class NavBar extends React.Component {

    constructor() {
        super();
        this.state = {
            isBackgroundTransparent: true,
        }
    }

    componentDidMount() {
        let self = this;
        window.onscroll = () => {
            if (window.pageYOffset > document.body.clientHeight / 2) {
                this.setState({
                    isBackgroundTransparent: false,
                });
            } else {
                this.setState({
                    isBackgroundTransparent: true,
                });
            }
        }
    }

    onClickNavBtn(index) {
        this.props.onNavBtnClick(index);
    }

    render() {
        return (
            <div className="navbar" style={{backgroundColor: this.state.isBackgroundTransparent ? "transparent" : "#333"}}>
                <NavBarButton text="HOME" father={this} index={0}/>
                <NavBarButton text="ABOUT" father={this} index={1}/>
                <NavBarButton text="RESUME" father={this} index={2}/>
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
        return(
            <div className="navbar-button" onClick={this.onClickBtn}>{this.props.text}</div>
        );
    }

}

export default NavBar;