import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Col, Input, PageHeader, Row, Skeleton} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";
import TextContainer from "../TextContainer";
import {affineDecrypt, affineEncrypt} from "../../utils/crypoFunctions";

class Affine extends Component {

    state = {
        plainText: '',
        cipherText: '',
        plainTextMode: 'Text',
        cipherTextMode: 'text',
    };

    handlePlainTextChange(value) {
        this.setState({
            plainText: value,
            cipherText: affineEncrypt(15, 8, value),
        });
    }

    handleCipherTextChange(value) {
        this.setState({
            plainText: affineDecrypt(15, 8, value),
            cipherText: value,
        });
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
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col lg={11} md={23} sm={23} xs={23}
                             style={{padding: 8, background: '#fff'}}>
                            <TextContainer text={this.state.plainText}
                                           handleTextChange={this.handlePlainTextChange.bind(this)}/>
                        </Col>
                        <Col lg={11} md={23} sm={23} xs={23}
                             style={{padding: 8, background: '#fff'}}>
                            <Skeleton/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col lg={11} md={23} sm={23} xs={23}
                             style={{padding: 8, background: '#fff'}}>
                            <TextContainer text={this.state.cipherText}
                                           handleTextChange={this.handleCipherTextChange.bind(this)}/>
                        </Col>
                        <Col lg={11} md={23} sm={23} xs={23}
                             style={{padding: 8, background: '#fff'}}>
                            <Delayed waitBeforeShow={500}>
                                <CustomGraph type='line'/>
                            </Delayed>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Affine;
