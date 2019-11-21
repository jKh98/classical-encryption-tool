import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Row} from "antd";
import TextContainer from "./TextContainer";

class TextContainerCoupler extends Component {
    state = {
        plainText: this.props.plainText,
        cipherText: this.props.cipherText,
        plainTextMode: this.props.plainTextMode,
        cipherTextMode: this.props.cipherTextMode,
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.plainText !== prevState.plainText || this.props.cipherText !== prevState.cipherText) {
            this.setState({plainText: this.props.plainText, cipherText: this.props.cipherText});
        }
        if (this.props.plainTextMode !== prevState.plainTextMode || this.props.cipherTextMode !== prevState.cipherTextMode) {
            this.setState({
                plainTextMode: this.props.plainTextMode, cipherTextMode: this.props.cipherTextMode
            });
        }
    }

    handlePlainTextChange(value) {
        this.props.handlePlainTextChange(value);
    }

    handleCipherTextChange(value) {
        this.props.handleCipherTextChange(value);
    }

    handlePlainTextModeChange(newMode) {
        this.props.handlePlainTextModeChange(newMode);
    }

    handleCipherTextModeChange(newMode) {
        this.props.handleCipherTextModeChange(newMode);
    }

    render() {
        return (
            <div className="TextContainerCoupler">
                <Row>
                    <TextContainer title={'Plain Text'}
                                   mode={this.state.plainTextMode}
                                   text={this.state.plainText}
                                   handleTextChange={this.handlePlainTextChange.bind(this)}
                                   handleModeChange={this.handlePlainTextModeChange.bind(this)}/>
                </Row>
                <br/>
                <Row>
                    <TextContainer title={'Cipher Text'}
                                   mode={this.state.cipherTextMode}
                                   text={this.state.cipherText}
                                   handleTextChange={this.handleCipherTextChange.bind(this)}
                                   handleModeChange={this.handleCipherTextModeChange.bind(this)}/>
                </Row>
            </div>
        );
    }

}

export default TextContainerCoupler;
