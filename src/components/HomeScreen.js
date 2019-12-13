import React from 'react';
import {Result, Icon, Layout} from 'antd';
import {Box} from "rebass";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

//import {fontSize} from "@material-ui/system";

class LandingPage extends React.Component {

    backToHome = (e) => {
        this.props.history.push("/Affine");
    };


    render() {
        return (
            <Layout>
                <Result
                    status="403"
                    //icon={<Icon type="smile" theme="twoTone" style={{ fontSize: '100px'}}/>}
                    icon={<Icon type={VpnKeyIcon} style={{fontSize: "large", fontStyle: "bold"}}/>}
                    title="Welcome to the Classical Encryption Tool Application!"
                    subTitle="Please navigate using the menu on the left."

                />
            </Layout>
        )
    }
}

export default LandingPage;