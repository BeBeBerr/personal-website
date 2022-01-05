import React from 'react';
import '../styles/contact.css';

class ContactPage extends React.Component {
    componentDidMount() {
        // 设置页面整体背景图片 且禁止滚动
        document.body.style = "background-image: linear-gradient(135deg, #FCCF31 10%, #F55555 100%); background-attachment:fixed;";
    }

    render() {
        return(
            <div className="contactPage">
                <NameBar />
                <ContactList token={this.getQuery().token}/>
            </div>
        );
    }

    getQuery() {
        const url = decodeURI(this.props.location.search);
        let query = {};
        if (url.indexOf("?") !== -1) {
            const str = url.substr(1);
            const pairs = str.split("&");
            for(let i = 0; i < pairs.length; i ++) {
                 const pair = pairs[i].split("=");
                query[pair[0]] = pair[1];
            }
        }
        return query;
    }
}

class NameBar extends React.Component {
    render() {
        return(
            <div className="nameBar">
                <img className="nameBarImage" src={require("../images/contacts/avatar.jpg")} alt={""}></img>
                <div className="nameBarItem">王路远 Luyuan Wang</div>
            </div>
        );
    }
}

class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            status: 0
        }
    }

    componentDidMount() {
        let token = this.props.token;
        fetch("https://api.luyuan.wang/contact/info?token=" + token).then((resp) => resp.json()).then((json) => {
            this.setState({
                data: json.data,
                status: json.status
            });
        });
    }

    render() {
        let itemList = [];
        for (var index in this.state.data) {
            let itemJson = this.state.data[index];
            let imageName = itemJson.icon;
            let text = itemJson.text;
            let action = itemJson.action;

            let item = <ContactItem imageName={imageName} text={text} action={action} key={index}/>;
            itemList.push(item);
        }


        if (this.state.status !== 0) {
            return <NoPermission />;
        }

        return (
            <div className="contactList">
                {itemList}
            </div>
        );
    }
}

class ContactItem extends React.Component {
    render() {
        return (
            <div className="contactItem">
                <img className="contactItemIcon" src={require("../images/contacts/" + this.props.imageName + ".png")} alt={""} onClick={() => this.handleClick()}></img>
                <span className="contactItemText">{this.props.text}</span>
            </div>
        );
    }

    handleClick() {
        if (this.props.action.type === "jump") {
            window.location.href = this.props.action.value;
        } else if (this.props.action.type === "jump_blank") {
            window.open(this.props.action.value, "_blank");
        } else if (this.props.action.type === "copy") {
            this.execCopy(this.props.action.value);
            setTimeout(() => {
                window.alert(this.props.action.hint);
            }, 100);
        }
    }

    // 利用不可见的元素写剪切板
    execCopy(text) {
        const input = document.createElement('INPUT');
        input.style.opacity  = 0;
        input.style.position = 'absolute';
        input.style.left = '-100000px';
        document.body.appendChild(input);
    
        input.value = text;
        input.select();
        input.setSelectionRange(0, text.length);
        document.execCommand('copy');
        input.blur();
        document.body.removeChild(input);
        return true;
    }
}

class NoPermission extends React.Component {
    render() {
        return(
            <div style={{marginTop: "200px"}}>
                Permission Denied. Sorry about that.
            </div>
        );
    }
}

export default ContactPage;