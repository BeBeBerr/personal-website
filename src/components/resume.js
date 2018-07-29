import React from 'react'
import '../styles/resume.css'

class Resume extends React.Component {
    render() {
        return (
            <div className="resume">
                <RowItem
                    text="教育"
                    descriptionList={[
                        <Description
                            key="1"
                            title="华中科技大学"
                            info="2015.09 - 2019.06"
                            infoDetail="本科就读于华中科技大学，电子信息与通信工程学院。通信工程专业，加权成绩排名 33%。主修课程：通信原理、数字信号处理、通信电子线路、电磁场与电磁波、微波技术基础、微机原理、模拟电路与数字系统等。"
                        />,
                        <Description
                            key="2"
                            title="北京一零一中学"
                            info="2012.09 - 2015.06"
                            infoDetail="高中就读于北京一零一中学，理科。"
                        />
                    ]}
                />
                <RowItem
                    text="学生活动"
                    descriptionList={[
                        <Description
                            key="3"
                            title="冰岩作坊"
                            info="2017.03 - 2019.06"
                            infoDetail="冰岩作坊（www.bingyan.net）是以产品为导向的学生互联网团队，华中科技大学三大技术团队之一。我在冰岩作坊期间任 iOS 组组长。"
                        />,
                    ]}
                />
                <RowItem
                    text="奖项与荣誉"
                    descriptionList={[
                        <Description
                            key="4"
                            title="最佳冰岩人"
                            info="2017"
                            infoDetail="“最佳冰岩人”是冰岩作坊内部最高荣誉。"
                        />,
                        <Description
                            key="5"
                            title="中兴捧月杯软件开发大赛 二等奖"
                            info="2017"
                            infoDetail="实现了一款拍照自动识别车牌号的 App，目的是方便学校保卫处处理违规停车行为。团队共 2 人，我负责 iOS 端开发，另一人负责服务器端开发。此项目同时获得“武汉大学移动应用设计大赛”二等奖。"
                        />,
                        <Description
                            key="6"
                            title="种子杯编程大赛 优胜奖"
                            info="2017"
                            infoDetail="通过机器学习技术，预测 NBA 比赛结果。"
                        />
                    ]}
                />
                <RowItem
                    text="项目经历"
                    descriptionList={[
                        <Description
                            key="7"
                            title="重医助手"
                            info="2017.06 - 2017.08"
                            infoDetail="“重医助手”是一个独立项目，我一人负责从产品到运营的完整流程。“重医助手”是一款课表类应用，方便重庆医科大学的学生查看课程表、查询成绩。通过爬取重医教务系统获取数据，并存入本地数据库。已上架 AppStore，下载量 3000+。"
                        />,
                        <Description
                            key="8"
                            title="背它"
                            info="2017.12 - 2018.01"
                            infoDetail="“背它”是冰岩作坊的团队项目，我独立负责 iOS 端开发。“背它”是一款小众工具类应用，具有图片记背、文字记背等功能。在项目推广期间，我还负责编写了“背它 Lite”小程序，用于临时活动。已上架 AppStore，下载量 1400+。"
                        />,
                        <Description
                            key="9"
                            title="蛛网"
                            info="2018.03 - 2018.05"
                            infoDetail="“蛛网”是冰岩作坊的团队项目，我独立负责 iOS 端开发。“蛛网”是一款内部应用，可以通过日历的形式查看团队活动事项，并编辑参与者。通过 TestFlight 分发。"
                        />
                    ]}
                />
            </div>
        )
    }
}

class Label extends React.Component {
    render() {
        return (
            <div className="resume-label">{this.props.text}</div>
        )
    }
}

class Description extends React.Component {
    render() {
        return (
            <div className="resume-description">
                <h3 className="resume-title">{this.props.title}</h3>
                <p className="resume-info">{this.props.info}</p>
                <p className="resume-info-detail">{this.props.infoDetail}</p>
            </div>
        )
    }
}

class RowItem extends React.Component {
    render() {
        return (
            <div>
                <div className="resume-row-item">
                    <div className="resume-row-item-left">
                        <Label text={this.props.text} />
                    </div>
                    <div className="resume-row-item-right">
                        {this.props.descriptionList}
                    </div>
                </div>
                <hr className="resume-row-item-divider"/>
            </div>
        )
    }
}



export default Resume;