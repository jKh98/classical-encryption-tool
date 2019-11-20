import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../utils/conversions'
import {Input, Layout, Select} from "antd";

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
            <Layout style={{background: '#fff'}}>
                <InputGroup compact>
                    <h2 style={{width: '70%'}}>
                        {this.state.title}
                    </h2>
                    <Select style={{width: '30%'}}
                            defaultValue={this.state.modes[0].value}
                            onChange={this.handleModeChange.bind(this)}>
                        {this.state.modes.map((e, key) => {
                            return <Option key={key} value={e.value}>{e.value}</Option>;
                        })}
                    </Select>
                </InputGroup>
                < br/>
                <TextArea rows={6}
                          onChange={this.handleTextChange.bind(this)}
                          value={this.state.text}/>
            </Layout>
        );
    }
}

export default TextContainer;
