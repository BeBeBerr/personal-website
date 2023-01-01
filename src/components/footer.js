import React from 'react'
import '../styles/footer.css'

class Footer extends React.Component {
    render() {
        return(
            <div className="footer">
                <span className="footer-text">www.wangluyuan.cc</span>
                <span className="footer-text">© 2023 Luyuan Wang</span>
                <a href="http://beian.miit.gov.cn" className="footer-link-gov">京ICP备17051145号</a>
            </div>
        )
    }
}

export default Footer;