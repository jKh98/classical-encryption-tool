import React from 'react';
import {Button, Result} from 'antd';

class NotFoundPage extends React.Component {

    backToHome = (e) => {
        this.props.history.push("/admin/dashboard");
    };

    render() {
        return <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you requested was not found."
                extra={<Button type="primary" onClick={this.backToHome}>Back Home</Button>}
            />
        </div>;
    }
}

export default NotFoundPage;