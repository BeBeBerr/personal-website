import React from 'react';
import '../styles/resume.css';
import TimeSheet from '../third-party/timesheet';

class Resume extends React.Component {
    render() {
        if (!this.props.data.resume) {
            return (<div></div>);
        }
        var model = this.props.isChinese ? this.props.data.resume.cn : this.props.data.resume.i18n;
        var resumeView = [];
        for (var index in model.data) {
            var rowItemModel = model.data[index];
            var descriptionViewList = [];
            for (var i in rowItemModel.descriptionList) {
                var desc = rowItemModel.descriptionList[i];
                var descView = <Description 
                    key={i}
                    title={desc.title}
                    info={desc.info}
                    infoDetail={desc.detailInfo}
                    imageURL={desc.imageURL}
                />;
                descriptionViewList.push(descView);
            }
            var rowItemView = <RowItem 
                key={index}
                text={rowItemModel.labelText}
                descriptionList={descriptionViewList}
                jumpURL={rowItemModel.jumpURL}
            />;
            resumeView.push(rowItemView);
        }
        return(
            <div className="resume">
                <TimeLineGraph />
                {resumeView}
                <BottomButtonList />
            </div>
        );
    }
}

class TimeLineGraph extends React.Component {
    // componentDidMount() {
        
    // }
    render() {
        var data = [
            ['09/2015', '06/2019', 'HUST', 'edu'],
            ['03/2017', '08/2018', 'Bingyan Studio', 'activity'],
            ['06/2018', '08/2018', 'Tencent', 'work'],
            ['08/2018', '05/2019', 'Mizzou', 'edu'],
            ['02/2019', '05/2019', 'Mizzou VPC Lab', 'research'],
            ['07/2019', '12/2020', 'ByteDance', 'work'],
            ['12/2020', '08/2021', 'Tsinghua VIS Lab', 'research'],
            ['02/2021', '05/2023', 'Carnegie Mellon', 'edu'],
            ['10/2021', '05/2023', 'CMU Biorobotics Lab', 'research'],
            ['05/2022', '08/2022', 'Apple', 'work'],
            ['07/2023', '09/2023', 'AIM', 'work'],
            ['10/2023', '12/2024', 'Apple', 'work']
        ]
        return (
            <div>
                <TimeSheet data={data} theme={"white"} className="timeline-graph"/>
            </div>
        );
    }
}

class Label extends React.Component {
    render() {
        return (
            <div className="resume-label">{this.props.text}</div>
        )
    }
}

class MoreButton extends React.Component {
    handleClick() {
        //window.location.pathname=this.props.jumpURL;
        window.open(this.props.jumpURL, "_blank");
    }
    render() {
        return (
            <div className="more-btn" onClick={() => this.handleClick()}>
                <span>Read More</span>
                <i className="fa fa-chevron-right fa-1x" style={{paddingLeft: 10}}></i>
            </div>
        )
    }
}

//每栏中的一项 包括题目/时间/细节等 如华中科技大学
class Description extends React.Component {
    render() {
        var image;
        if (this.props.imageURL) {
            image = 
            <div className="resume-info-image-container">
                <img src={this.props.imageURL} alt="" className="resume-info-image"/>
            </div>
        }
        return (
            <div className="resume-description">
                <h3 className="resume-title">{this.props.title}</h3>
                <div className="resume-info">{this.props.info}</div>
                <div className="resume-info-detail">{this.props.infoDetail}</div>
                {image}
            </div>
        )
    }
}

//简历中的一栏 如教育经历/工作经历
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
                        {
                            this.props.jumpURL && // render more button only when jump url is defined
                            <MoreButton jumpURL={this.props.jumpURL}/>
                        }
                    </div>
                </div>
                <hr className="resume-row-item-divider"/>
            </div>
        )
    }
}

class BottomButtonList extends React.Component {
    render() {
        return (
            <div className="bottom-button-list">
                <VisitorMapButton jumpURL={"/visitor"}/>
                <StatisticsButton jumpURL={"/statistics"}/>
            </div>
        );
    }
}

class VisitorMapButton extends React.Component {
    handleClick() {
        //window.location.pathname=this.props.jumpURL;
        window.open(this.props.jumpURL, "_blank");
    }
    render() {
        return (
            <div className="visitor-btn" onClick={() => this.handleClick()} style={{backgroundColor: "#5C80BC"}} >
                <i className="fa fa-globe fa-1x" style={{paddingRight: 10}}></i>
                <span>Visitor Map</span>
            </div>
        )
    }
}

class StatisticsButton extends React.Component {
    handleClick() {
        //window.location.pathname=this.props.jumpURL;
        window.open(this.props.jumpURL, "_blank");
    }
    render() {
        return (
            <div className="visitor-btn" onClick={() => this.handleClick()} style={{backgroundColor: "#228B22"}} >
                <i className="fa fa-bar-chart fa-1x" style={{paddingRight: 10}}></i>
                <span>Statistics</span>
            </div>
        )
    }
}



export default Resume;