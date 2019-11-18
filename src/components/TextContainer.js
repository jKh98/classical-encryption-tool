import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../utils/conversions'
import {Input, Layout, Select} from "antd";
import {binary2Hex, binary2Text, hex2Binary, hex2Text, text2Binary, text2Hex} from "../utils/conversions";

const {Option} = Select;

const InputGroup = Input.Group;
const {TextArea} = Input;

class TextContainer extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        modes: [
            {key: 1, value: 'Text'},
            {key: 2, value: 'Binary'},
            {key: 3, value: 'Hexadecimal'},
        ],
        mode: 'Text',
        text: this.props.text,
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.text !== prevState.text) {
            this.setState({text: this.props.text});
        }
    }

    handleChange(value) {
        let s;
        switch (value) {
            case 'Binary':
                if (this.state.mode === 'Text')
                    s = text2Binary(this.state.text);
                else if (this.state.mode === 'Hexadecimal')
                    s = hex2Binary(this.state.text);
                break;
            case 'Hexadecimal':
                if (this.state.mode === 'Text')
                    s = text2Hex(this.state.text);
                else if (this.state.mode === 'Binary')
                    s = binary2Hex(this.state.text);
                break;
            case 'Text':
            default:
                if (this.state.mode === 'Binary')
                    s = binary2Text(this.state.text);
                else if (this.state.mode === 'Hexadecimal')
                    s = hex2Text(this.state.text);
                break;
        }
        this.setState({
            mode: value,
            text: s,
        });
    }

    handleTextChange(event) {
        this.props.handleTextChange(event.target.value);
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <Layout style={{background: '#fff'}}>
                <InputGroup compact>
                    <h2 style={{width: '70%'}}>
                        Plain Text
                    </h2>
                    <Select style={{width: '30%'}}
                            defaultValue={this.state.modes[0].value}
                            onChange={this.handleChange.bind(this)}>
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
