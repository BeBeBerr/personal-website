import React from 'react';
import '../styles/resume.css';

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
    componentDidMount() {
        var graph = document.getElementById("timeline");
        var graph2 = document.getElementById("timeline2");
        var config = {
            startOnLoad: true,
            theme: 'neutral',
            securityLevel: 'loose',
        };

        const script = document.createElement('script');
        script.src = "https://cdn.bootcdn.net/ajax/libs/mermaid/8.8.2/mermaid.min.js";
        script.id = "mermaid-script";
        document.body.appendChild(script);

        script.onload = () => {
            const mermaid = window.mermaid;
            mermaid.initialize(config);
            var graphDefinition = `gantt
            todayMarker off
            title TIMELINE
            dateFormat  YYYY-MM
            axisFormat  %y-%m

            section Education
            Undergraduate: done, 2015-09 , 2019-06
            
            section University
            HUST : 2015-09, 2018-08
            Mizzou: 2018-08, 2019-06

            section Work
            Tencent: 2018-06, 2018-08
            ByteDance: 2019-07, 2019-12

            section Others
            Bingyan Studio: 2017-03, 2018-08
            VPC Lab: 2019-02, 2019-06
            `;
            mermaid.render("graph", graphDefinition, function(svgCode) {
                graph.innerHTML = svgCode;
            });

            var graphDefinition2 = `gantt
            title TIMELINE - Continue
            dateFormat  YYYY-MM
            axisFormat  %y-%m

            section Education
            Postgraduate: done, 2021-02, 2023-05
            
            section University
            CMU : 2021-02, 2023-05

            section Work
            ByteDance: 2019-07, 2020-12

            section Others
            VIS Lab: 2020-12, 2021-06
            `;
            mermaid.render("graph2", graphDefinition2, function(svgCode) {
                graph2.innerHTML = svgCode;
            });
        };
    }
    render() {
        return (
            <div>
                <div id="timeline" className="timeline-graph"></div>
                <div id="timeline2" className="timeline-graph"></div>
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