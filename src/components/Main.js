import React from 'react';
import Cover from './cover';
import About from './about';
import Resume from './resume';
import Footer from './footer';
import NavBar from './navBar';
import '../styles/App.css'
import scrollToComponent from 'react-scroll-to-component';

var componentList = [];

class AppComponent extends React.Component {

	constructor() {
		super();
		this.state = {
			isChinese: true,
            aboutData: aboutDataChinese,
            resumeLink: resumeLinkChinese,
            resumeData: resumeDataChinese,
		};
	}

	componentDidMount() {
		componentList.push(this.cover);
		componentList.push(this.about);
		componentList.push(this.resume);
		window.componentList = componentList;
	}

	scrollToAbout() {
		scrollToComponent(componentList[1], {
			align: 'top',
		});
	}

	onNavBtnClick(index) {
		var component = componentList[index];
		scrollToComponent(component, {
			align: 'top',
			offset: -50,
		});
	}

	onChangeLanguage() {
		if (this.state.isChinese) {
			this.setState({
				isChinese: false,
				aboutData: aboutDataEnglish,
                resumeData: resumeDataEnglish,
                resumeLink: resumeLinkEnglish,
			});
		} else {
			this.setState({
				isChinese: true,
				aboutData: aboutDataChinese,
                resumeData: resumeDataChinese,
                resumeLink: resumeLinkChinese,
			});
		}
	}

	render() {
		return (
			<div className="root">
				<Cover scrollToNextPage={this.scrollToAbout} ref={(cover) => {this.cover = cover;}}/>
				<NavBar onNavBtnClick={this.onNavBtnClick} onChangeLanguage={this.onChangeLanguage.bind(this)}/>
				<About ref={(about) => {this.about = about;}} aboutData={this.state.aboutData} resumeLink={this.state.resumeLink}/>
				<Resume ref={(resume) => {this.resume = resume;}} resumeData={this.state.resumeData}/>
				<Footer />
			</div>
    	);
	}
}




AppComponent.defaultProps = {
};

export default AppComponent;

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

var resumeDataChinese = {
    rowItemModelList: [
        {
            labelText: "教育",
            descriptionList: [
                {
                    title: "University of Missouri - Columbia",
                    info: "2018.08 - 今",
                    detailInfo: "美国密苏里大学哥伦比亚分校，校际交流项目。"
                },
                {
                    title: "华中科技大学",
                    info: "2015.09 - 2019.06",
                    detailInfo: "本科就读于华中科技大学，电子信息与通信学院。通信工程专业，加权成绩排名 33%。主修课程：通信原理、数字信号处理、通信电子线路、电磁场与电磁波、微波技术基础、微机原理、模拟电路与数字系统等。"
                },
                {
                    title: "北京一零一中学",
                    info: "2012.09 - 2015.06",
                    detailInfo: "高中就读于北京一零一中学，理科。"
                }
            ]
        }, {
            labelText: "学生活动",
            descriptionList: [
                {
                    title: "冰岩作坊",
                    info: "2017.03 - 2019.06",
                    detailInfo: "冰岩作坊（www.bingyan.net）是以产品为导向的学生互联网团队，华中科技大学最具影响力的技术团队之一。我在冰岩作坊期间任 iOS 组组长。"
                },
            ]
        }, {
            labelText: "工作",
            descriptionList: [
                {
                    title: "深圳市腾讯计算机系统有限公司",
                    info: "2018.06 - 2018.08",
                    detailInfo: "原腾讯社交网络事业群（SNG）移动客户端开发实习生。"
                },
            ]
        }, {
            labelText: "奖项与荣誉",
            descriptionList: [
                {
                    title: "最佳冰岩人",
                    info: "2017",
                    detailInfo: "“最佳冰岩人”是冰岩作坊内部最高荣誉。"
				},
				{
					title: "雏鹰计划 铜奖",
					info: "2018.06",
					detailInfo: "雏鹰计划是原腾讯 SNG 事业群面向实习生举办的小型比赛。我们组实现了一款通过深度学习识别司机情绪，进而提高行车安全性的 App。",
				},
                {
                    title: "中兴捧月杯软件开发大赛 二等奖",
                    info: "2017",
                    detailInfo: "实现了一款拍照自动识别车牌号的 App，目的是方便学校保卫处处理违规停车行为。团队共 2 人，我负责 iOS 端开发，另一人负责服务器端开发。此项目同时获得“武汉大学移动应用设计大赛”二等奖。"
                },
                {
                    title: "种子杯编程大赛 优胜奖",
                    info: "2017",
                    detailInfo: "通过机器学习技术，预测 NBA 比赛结果。"
                },
            ]
        }, {
            labelText: "项目经验",
            descriptionList: [
                {
                    title: "重医助手",
                    info: "2017.06 - 2017.08",
                    detailInfo: "“重医助手”是一个独立项目，我一人负责从产品到运营的完整流程。“重医助手”是一款课表类应用，方便重庆医科大学的学生查看课程表、查询成绩。通过爬取重医教务系统获取数据，并存入本地数据库。已上架 AppStore，下载量 3000+。"
                },
                {
                    title: "背它",
                    info: "2017.12 - 2018.01",
                    detailInfo: "“背它”是冰岩作坊的团队项目，我独立负责 iOS 端开发。“背它”是一款小众工具类应用，具有图片记背、文字记背等功能。在项目推广期间，我还负责编写了“背它 Lite”小程序，用于临时活动。已上架 AppStore，下载量 1500+。"
                },
                {
                    title: "蛛网",
                    info: "2018.03 - 2018.05",
                    detailInfo: "“蛛网”是冰岩作坊的团队项目，我独立负责 iOS 端开发。“蛛网”是一款内部应用，可以通过日历的形式查看团队活动事项，并编辑参与者。通过 TestFlight 分发。"
                },
            ]
        }, {
			labelText: "技术栈",
			descriptionList: [
				{
					title: "编程语言",
					info: "",
					detailInfo: <div>熟悉：Swift/ Java/ C/ Objective-C<br />了解: Python/ Matlab/ JavaScript/ SQL<br />使用过：Dart/ Lua/ ASM/ Verilog/ Bash</div>,
				},
				{
					title: "技术、技能及框架",
					info: "",
					detailInfo: <div>熟悉：iOS 应用开发<br />了解：React/ Django/ Arduino/ Raspberry-Pi/ 嵌入式系统/ ROS/ 机器人/ Git <br />使用过：Flutter/ MySQL/ Android/ 微信小程序/ CI</div>,
				},
			]
		},
    ]
};


var resumeDataEnglish = {
    rowItemModelList: [
        {
            labelText: "Education",
            descriptionList: [
                {
                    title: "University of Missouri - Columbia",
                    info: "2018.08 - Present",
                    detailInfo: "Inter-school program."
                },
                {
                    title: "Huazhong University of Science and Technology",
                    info: "2015.09 - 2019.06",
                    detailInfo: "Major in Telecommunication Engineering. GPA rank 33%."
                },
                {
                    title: "Beijing 101 Middle School",
                    info: "2012.09 - 2015.06",
                    detailInfo: "Science."
                }
            ]
        }, {
            labelText: "Student Activities",
            descriptionList: [
                {
                    title: "Bingyan Studio",
                    info: "2017.03 - 2019.06",
                    detailInfo: "Bingyan Studio (www.bingyan.net) is one of the most infulential student technology team in HUST. I was the leader of iOS group."
                },
            ]
        }, {
            labelText: "Work Experience",
            descriptionList: [
                {
                    title: "Tencent Inc.",
                    info: "2018.06 - 2018.08",
                    detailInfo: "iOS intern."
                },
            ]
        }, {
            labelText: "Awards",
            descriptionList: [
                {
                    title: "Best Bingyaner",
                    info: "2017",
                    detailInfo: "The highest award of Bingyan Studio."
				},
				{
					title: "Mini Project (Brozen Award)",
					info: "2018.06",
					detailInfo: "Tencent SNG.",
				},
                {
                    title: "ZTE Cup (Second Award)",
                    info: "2017",
                    detailInfo: "Together with second award of \"WHU Cup\"."
                },
                {
                    title: "Seed Cup (Winner Award)",
                    info: "2017",
                    detailInfo: "HUST."
                },
            ]
        }, {
            labelText: "Projects",
            descriptionList: [
                {
                    title: "CQMU Schedule",
                    info: "2017.06 - 2017.08",
                    detailInfo: "Personal project."
                },
                {
                    title: "Beita",
                    info: "2017.12 - 2018.01",
                    detailInfo: "Team project."
                },
            ]
        }, {
			labelText: "Technology Stack",
			descriptionList: [
				{
					title: "Programming Languages",
					info: "",
					detailInfo: <div>Familiar with：Swift/ Java/ C/ Objective-C<br />Know a little of: Python/ Matlab/ JavaScript/ SQL<br />Have tried：Dart/ Lua/ ASM/ Verilog/ Bash</div>,
				},
				{
					title: "Technologies, Skills, and Frameworks",
					info: "",
					detailInfo: <div>Familiar with：iOS Development<br />Know a little of：React/ Django/ Arduino/ Raspberry-Pi/ Embedded System/ ROS/ Robotics/ Git <br />Have tried：Flutter/ MySQL/ Android/ Wechat Mini Program/ CI</div>,
				},
			]
		},
    ]
};