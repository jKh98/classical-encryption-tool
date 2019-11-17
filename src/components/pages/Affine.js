import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Col, PageHeader, Row, Skeleton} from "antd";
import CustomGraph from "../charts/CustomGraph";
import Delayed from "../Delayed";

class Affine extends Component {

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
                            <Skeleton/>
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
