import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../utils/conversions'
import {Card, Input, Layout, Select} from "antd";

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

    render() {
        return (
            <Layout>
                <Card title={this.state.title} bordered={false} extra={<InputGroup compact>
                    <Select style={{width: 150}}
                            defaultValue={this.state.modes[0].value}
                            onChange={this.handleModeChange.bind(this)}>
                        {this.state.modes.map((e, key) => {
                            return <Option key={key} value={e.value}>{e.value}</Option>;
                        })}
                    </Select>
                </InputGroup>}>
                    <TextArea rows={8}
                              onChange={this.handleTextChange.bind(this)}
                              on
                              value={this.state.text}/>
                </Card>
            </Layout>
        );
    }
}

export default TextContainer;
