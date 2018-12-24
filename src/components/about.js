import React from 'react'
import '../styles/about.css'

class About extends React.Component {
    render() {
        return (
            <div className="about-bg">
                <div className="about">
                    <h2 className="about-title">About Me</h2>
                    <div className="about-detail">
                        {this.props.isChinese ? aboutDataChinese : aboutDataEnglish}
                    </div>
                    <h2 className="about-title">Contact Details</h2>
                    <div className="about-detail">
                        GitHub: github.com/BeBeBerr<br />
                        Blog: blog.wangluyuan.cc<br />
                        E-mail: e@wangluyuan.cc<br />
                    </div>
                </div>
                <ResumeButton isChinese={this.props.isChinese}/>
            </div>
        )
    }
}

class ResumeButton extends React.Component {
    handleClick() {
        let link = this.props.isChinese ? resumeLinkChinese : resumeLinkEnglish;
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


var resumeLinkChinese = "http://www.wangluyuan.cc/resume.pdf";
var resumeLinkEnglish = "http://www.wangluyuan.cc/resume_en.pdf"


var aboutDataChinese = <div>我叫王路远，华中科技大学通信工程专业，今年大四。<br />
	自从大一开始接触编程，我就对计算机技术产生了浓厚的兴趣。
	我在大二的时候开始学习 iOS 开发，但也对其他领域的各种技术充满了好奇。软件、硬件都有所涉猎，但遗憾的是没能做到样样皆通。<br />
	除了写代码，我也喜欢看电影、和朋友出去玩儿，以及各种体育运动。羽毛球、游泳、射箭、滑雪……技术不高，也不愿意花时间训练，只是为了开心而已。<br />
	毕竟，做人做重要的就是开心！
	</div>;

var aboutDataEnglish = <div>Hello! My name is Wang, Luyuan. I'm a senior now, and I'm major in Telecommunication Engineering.<br />
	Since I took a programming course when I was a freshman, 
	I found my great interests in computer technologies. 
	I started to learn iOS development at my second college year, 
	but I also curious about all other different kinds of technologies. 
	I play with both hardware and software, 
	although it is impossible to be a all-rounder.<br />
	Besides, I also love watching films, hanging out with my friends, and doing sports. 
	Badminton, swimming, archery, skiing... 
	I'm not a master, and I'm not willing to take too much time on trainning. What I do is just for fun.<br />
	Because, the true meaning of life is joy!
	</div>;