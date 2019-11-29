import React from 'react'
import '../styles/resume.css'

class Resume extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        fetch("/data.json").then((resp) => resp.json()).then((json) => {
            this.setState({
                data: json
            });
        });
    }

    render() {
        if (!this.state.data.resume) {
            return (<div></div>);
        }
        var model = this.props.isChinese ? this.state.data.resume.cn : this.state.data.resume.i18n;
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
                {resumeView}
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
                <span>More</span>
                <i className="fa fa-chevron-right fa-1x" style={{paddingLeft: 10}}></i>
            </div>
        )
    }
}

//每栏中的一项 包括题目/时间/细节等 如华中科技大学
class Description extends React.Component {
    render() {
        return (
            <div className="resume-description">
                <h3 className="resume-title">{this.props.title}</h3>
                <div className="resume-info">{this.props.info}</div>
                <div className="resume-info-detail">{this.props.infoDetail}</div>
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



export default Resume;