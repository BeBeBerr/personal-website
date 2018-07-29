import React from 'react'
import '../styles/cover.css'

class Cover extends React.Component {
    onClickNextBtn() {
        var height = document.documentElement.clientHeight;
        window.scroll({
            left: 0,
            top: height,
            behavior: 'smooth' 
        });
        
    }

    render() {
        return(
            <div className="cover">
                <div className="cover-main">
                    <h1 className="title">I'm Luyuan Wang.</h1>
                    <p className="intro">Welcome to my website! I'm Luyuan Wang, a college student from Beijing, China. My major is Telecommunication Engineering, and I love software programming.<br /><br />Let's start scrolling and learn more about me.</p>
                    <hr className="divider" />
                </div>
                <div className="cover-next">
                    <i className="fa fa-chevron-down fa-2x" style={{color: 'white', cursor: 'pointer'}} onClick={this.onClickNextBtn}></i>
                </div>
            </div>
        )
    }
}

export default Cover;