import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../utils/conversions'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Alert, Button, Card, Icon, Input, Layout, message , Select} from "antd";
import {checkIfBinary, checkIfHex} from "../utils/generalFunctions";

const {Option} = Select;
const InputGroup = Input.Group;
const {TextArea} = Input;

class TextContainer extends Component {

    state = {
        title: this.props.title,
        modes: [
            {key: 1, value: 'Text'},
            {key: 2, value: 'Binary'},
            {key: 3, value: 'Hexadecimal'},
        ],
        mode: this.props.mode,
        text: this.props.text,
        error: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.text !== prevState.text) {
            this.setState({text: this.props.text});
        }
        if (this.props.mode !== prevState.mode) {
            this.setState({mode: this.props.mode});
        }
    }

    handleModeChange(value) {
        console.log(value);
        this.props.handleModeChange(value);
    }

    handleTextChange(event) {
        this.props.handleTextChange(event.target.value);
    }

    openNotificationWithIcon(type, title) {
        message.success(title)
        // notification[type]({
        //     message: title,
        //     placement: 'topLeft'
        // });
    }
    ;

    render() {
        return (
            <Layout>
                <Card title={this.state.title} bordered={false} extra={<InputGroup compact>
                    <CopyToClipboard text={this.state.text}>
                        <Button
                            onClick={this.openNotificationWithIcon.bind(this, "success", "Text was successfully copied.")}>
                            <Icon type="copy"/>
                        </Button>
                    </CopyToClipboard>
                    <Select style={{width: 150}}
                            defaultValue={this.state.modes[0].value}
                            onChange={this.handleModeChange.bind(this)}>
                        {this.state.modes.map((e, key) => {
                            return <Option key={key} value={e.value}>{e.value}</Option>;
                        })}
                    </Select>
                </InputGroup>}>
                    <TextArea rows={7}
                              onChange={this.handleTextChange.bind(this)}
                              value={this.state.text}/>
                    <div style={{height: 50}}>
                        <br/>
                        {
                            (this.state.mode === "Binary" && !checkIfBinary(this.state.text.toString())) ||
                            (this.state.mode === "Hexadecimal" && !checkIfHex(this.state.text.toString())) ?
                                <Alert message="Binary and Hexadecimal content cannot be interpreted as text."
                                       type="error" showIcon/>
                                : <Alert message={(this.state.text).length + " characters "}
                                         type="info" showIcon/>
                        }
                    </div>
                </Card>
            </Layout>
        );
    }
}

export default TextContainer;
