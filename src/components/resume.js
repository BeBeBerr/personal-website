import React from 'react'
import '../styles/resume.css'

class Resume extends React.Component {
    render() {
        var model = this.props.resumeData;
        var resumeView = [];
        for (var index in model.rowItemModelList) {
            var rowItemModel = model.rowItemModelList[index];
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
                    </div>
                </div>
                <hr className="resume-row-item-divider"/>
            </div>
        )
    }
}



export default Resume;