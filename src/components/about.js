import React from 'react'
import '../styles/about.css'

class About extends React.Component {
    render() {
        return(
            <div className="about-bg">
                <div className="about">
                    <h2 className="about-title">About Me</h2>
                    <p className="about-detail">
                        我叫王路远，正在华中科技大学读通信工程专业，今年大三。<br />
                        在大二的时候，我加入了学生互联网团队“冰岩作坊”，开始学习 iOS 开发。我对其他各种技术也充满了好奇，软件、硬件都玩过一点。但遗憾的是多数都浅尝辄止，只有 Hello World 水平。<br />
                        除了写代码，我也喜欢各种体育运动。羽毛球、游泳、射箭、滑雪……技术不高，也不愿意花时间训练，只是为了开心而已。<br />
                        毕竟，做人做重要的就是开心！
                    </p>
                    <h2 className="about-title">Contact Details</h2>
                    <p className="about-detail">
                        GitHub: github.com/BeBeBerr<br />
                        Blog: blog.wangluyuan.cc<br />
                        E-mail: e@wangluyuan.cc<br />
                    </p>
                </div>
                <ResumeButton />
            </div>
            
            
        )
    }
}

class ResumeButton extends React.Component {
    handleClick() {
        window.open("http://www.wangluyuan.cc/resume.pdf", "_blanc");
    }
    render() {
        return(
            <div className="resume-btn" onClick={this.handleClick}>Download Resume</div>
        )
    }
}

export default About;