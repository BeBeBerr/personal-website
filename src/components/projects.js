import React from 'react';
import '../styles/projects.css'
import Footer from './footer';


class ProjectPage extends React.Component {


	render() {

		return (
            <div>
			    <ProjectHeader />
                <ProjectCardListView />
                <Footer />
            </div>
    	);
	}
}

class ProjectCardListView extends React.Component {
    
    render() {

        let cardList = [];
        for (var index in projectData.projectList) {
            let data = projectData.projectList[index];
            let card = <ProjectCard 
                key={index}
                title={data.title} 
                imageSrc={data.imageSrc} 
                detail={data.detail}/>;
            cardList.push(card);
        }
        return(
            <div className="project-card-list">
                {cardList}
            </div>
        )
    }
}


class ProjectCard extends React.Component {
    render() {
        return(
            <div className="project-card">
                <div className="project-card-title">{this.props.title}</div>
                <ProjectImage imageSrc={this.props.imageSrc}/>
                <div className="project-detail">
                    {this.props.detail}
                </div>
            </div>
        )
    }
}


class ProjectImage extends React.Component {
    render() {
        return(
            <div className="project-image-wrapper">
                <img className="project-image" src={require("../" + this.props.imageSrc)} alt={""}></img>
                <div className="project-image-mask"></div>
            </div>
            
        );
    }
}


class ProjectHeader extends React.Component {

    render() {
        return(
            <div className="project-header">
                My Projects.
            </div>
        )
    }
}



export default ProjectPage;


var projectData = {
    projectList: [
        {
            title: "智能道路",
            imageSrc: "images/smart_road_0.jpg",
            detail: <p>通过视觉引导模型车沿车道运动。主要涉及到的知识包括：
                ROS、计算机视觉、图像处理、反馈控制、计算机网络、数字电路等。<br />
                实验平台被4个摄像头覆盖，每个摄像头分别连接一台主机。所有主机以分布式的方式工作、通信。
                摄像头识别出车辆后，会将坐标系变换到世界坐标系下以便于PID控制。模型车经过改装，由一台树莓派接管，并产生PWM波驱动电机。
                为了解决网络切换的耗时问题，小车的Wi-Fi网卡工作在Monitor模式。
                </p>
        },
        {
            title: "基于机器学习的手势识别",
            imageSrc: "images/gesture_ml.jpg",
            detail: <p>基于HOG+LBP特征，利用机器学习实现手部定位、手势识别。
                对比了多种机器学习模型后，最终采用效果最好的SVM进行分类。
                本项目共训练了两个模型。第一个二分类模型用于在滑动窗口的帮助下实现手部定位。
                第二个模型接收上一个模型裁剪出来的手部图片，在5个已知的手势中分类。<br/>
                训练集由我们自行收集。</p>
        },
        {
            title: "LLVM循环优化对比",
            imageSrc: "images/loop_opt.jpg",
            detail: <p>本项目通过4个简单的C语言程序，测试了4种LLVM循环优化算法。对比了优化前
                        和优化后的汇编和LLVM IR代码的差异。使用gem5模拟器测试了在单种优化方式下
                        运行耗时以及缓存性能的差异。最后，4种循环优化算法与无优化、最高级别优化
                        一起应用到了Polybench上进行了对比测试。
                    </p>
        },
        {
            title: "机器人翻倒纠正",
            imageSrc: "images/tipover.jpg",
            detail: <p>通过旋转移动平台上沉重的机械臂控制机器人的重心，使之通过崎岖地形时不易翻倒。
                        模拟器采用了V-REP平台。机器人模型结合了两种V-REP自带的模型，并调整了参数。
                        通过翻倒实验可以估计出机器人的重心。最后，Lua代码和Matlab进行通信，控制算法
                        由Matlab实现。
                    </p>
        },
        {
            title: "机器人协作运输物体",
            imageSrc: "images/arm_robot.jpg",
            detail: <p>桌面上的三台PUMA机器人通过双目摄像头识别、定位并捡起散落在白纸上的黑色圆柱体，
                        放置到地面上的移动机器人上。移动机器人通过编码器和迷宫上粘贴的二维码定位，
                        并在迷宫中按顺序移动到PUMA机器人下方以便接收圆柱体。
                        在迷宫中的导航通过机器人上的红外光传感器和接触传感器以避障的方式实现。所有的机器人（3台PUMA手臂机器人和1台扫地机器人）通过ROS进行通信。
                    </p>
        },
        {
            title: "社团信息管理网站",
            imageSrc: "images/club_web.jpg",
            detail: <p>具有登录、编辑成员和组别、项目管理、财务计算等功能。
                        前端通过React实现，后端通过Django实现。数据库采用了MySQL。
                    </p>
        },
        {
            title: "协程调度器",
            imageSrc: "images/co_scheduler.jpg",
            detail: <p>在C语言上实现了协程，并可在多个协程任务之间调度。
                采用修改函数调用过程中的一系列寄存器实现，因此需要使用汇编语言。
                <br />
                通过简单的调度器，每个任务可以睡眠和“非标准”输出。输出的内容通过Named Pipe
                在另一个Terminal显示以防干扰系统指令的输入。
                支持macOS和Linux平台。</p>
        },
        {
            title: "守门小车",
            imageSrc: "images/car_ball.jpg",
            detail: <p>通过一个连接在电脑上的摄像头识别地面上滚动的网球，并预测网球轨迹。
                在计算出预测的轨迹和“球门”的交点后，电脑通过蓝牙发送指令给小车上的Arduino单片机。
                小车可以提前运动到交点出将网球拦截。
                <br/>
                为了方便调试，在Mac端使用Swift语言开发了带有图形界面的应用程序，可以可视化地展示出网球位置及预测的轨迹。
                蓝牙通信部分使用了CoreBluetooth框架。
            </p>
        },
        {
            title: "背它",
            imageSrc: "images/beta.jpg",
            detail: <p>一款方便学生背诵古诗词、课文的App。已上架App Store。</p>
        },
        {
            title: "蛛网",
            imageSrc: "images/zhuwang.jpg",
            detail: <p>冰岩作坊内部工具。</p>
        },
        {
            title: "重医助手",
            imageSrc: "images/chongyi.jpg",
            detail: <p>重庆医科大学的校园助手。</p>
        },
        {
            title: "超声波体感游戏",
            imageSrc: "images/vga_game.jpg",
            detail: <p>通过在FPGA上下载IP核模拟一颗单片机，根据超声波传感器的读数控制屏幕上两个小球的距离。
                玩家需要控制手掌距离超声波传感器的距离控制小球避开掉落的障碍物。屏幕显示通过操作VGA接口实现。
            </p>
        },
    ]
}