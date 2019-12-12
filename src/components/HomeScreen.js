import React from 'react';
import {Button, Result,Icon} from 'antd';
import {Heading, Box} from "rebass";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
//import {fontSize} from "@material-ui/system";

class LandingPage extends React.Component {

    backToHome = (e) => {
        this.props.history.push("/Affine");
    };


    render() {
        return <div>

            <br/>
            <Result
                //icon={<Icon type="smile" theme="twoTone" style={{ fontSize: '100px'}}/>}
                icon={<Icon type={VpnKeyIcon} style={{ fontSize: "large"}}/>}
                title="Welcome to the Ultimate Website for Classical Encryption Techniques!"
                subTitle="Please navigate using the menu on the left."
                // extra={<Button type="primary" onClick={this.backToHome}>Back Home</Button>}
            />
            <Box
                sx={{
                    px: 4,
                    py: 6,
                    backgroundImage: 'url(https://source.unsplash.com/random/1024x768?sky)',
                    backgroundSize: 'cover',
                    borderRadius: 8,
                    color: 'white',
                    bg: 'gray',
                }}>

            </Box>

        </div>;
    }
}

export default LandingPage;