import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Col, PageHeader, Row, Skeleton} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainerCoupler from "../TextContainerCoupler";
import {affineDecrypt, affineEncrypt} from "../../utils/crypoFunctions";
import {convert, convert2Text, convertFromText} from "../../utils/conversions";

class Affine extends Component {

    state = {
        plainText: 'hello',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'Text',
    };

    handlePlainTextChange(value) {
        let ct = convertFromText(affineEncrypt(15, 8, convert2Text(value, this.state.plainTextMode)), this.state.cipherTextMode);
        this.setState({
            plainText: value,
            cipherText: ct,
        });
    }

    handleCipherTextChange(value) {
        let pt = convertFromText(affineDecrypt(15, 8, convert2Text(value, this.state.cipherTextMode)), this.state.plainTextMode);
        this.setState({
            plainText: pt,
            cipherText: value,
        });
    }

    handlePlainTextModeChange(newMode) {
        let pt = convert(this.state.plainText, this.state.plainTextMode, newMode);
        this.setState({
            plainTextMode: newMode,
        }, () => this.handlePlainTextChange(pt));
    }

    handleCipherTextModeChange(newMode) {
        let ct = convert(this.state.cipherText, this.state.cipherTextMode, newMode);
        this.setState({
            cipherTextMode: newMode,
        }, () => this.handleCipherTextChange(ct));
    }

    render() {
        return (
            <div className="Affine">
                <div>
                    <PageHeader
                        title='Affine Cipher'
                    >
                    </PageHeader>
                </div>
                <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col lg={11} md={23} sm={23} xs={23}
                             style={{padding: 8, background: '#fff'}}>
                            <TextContainerCoupler plainText={this.state.plainText}
                                                  cipherText={this.state.cipherText}
                                                  plainTextMode={this.state.plainTextMode}
                                                  cipherTextMode={this.state.cipherTextMode}
                                                  handlePlainTextChange={this.handlePlainTextChange.bind(this)}
                                                  handleCipherTextChange={this.handleCipherTextChange.bind(this)}
                                                  handlePlainTextModeChange={this.handlePlainTextModeChange.bind(this)}
                                                  handleCipherTextModeChange={this.handleCipherTextModeChange.bind(this)}/>
                        </Col>
                        <Col lg={11} md={23} sm={23} xs={23}
                             style={{padding: 8, background: '#fff'}}>
                            <Row style={{minHeight: 240}}>
                                <Skeleton/>
                            </Row>
                            <br/>
                            <Row style={{minHeight: 240}}>
                                <Delayed waitBeforeShow={500}>
                                    <CustomGraph type='bar'/>
                                </Delayed>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Affine;
