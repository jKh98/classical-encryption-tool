import {Layout, Menu} from 'antd';
import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";

const {Sider} = Layout;

export class MainMenu extends PureComponent {
    state = {
        theme: 'dark',
        current: this.props.selected,
    };

    constructor(props) {
        super(props);
    }

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    handleClick = e => {
        this.setState({
            current: e.key
        });
    };

    render() {
        return (
            <Sider
                breakpoint="lg"
                theme={this.state.theme}
                width='280px'>
                <div className="logo" style={{
                    height: '32px',
                    margin: '16px'
                }}>
                    <h2 style={{color: 'white'}}>
                        Classical Encryption
                    </h2>
                </div>
                <Menu
                    onClick={this.handleClick}
                    theme={this.state.theme}
                    defaultSelectedKeys={['Affine']}
                    selectedKeys={[this.state.current]}
                    mode='inline'>
                    <Menu.Item key="Affine">
                        <Link to={"/Affine"}>
                            <span>Affine Cipher</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="Mono-Alphabetic">
                        <Link to={"/Mono-Alphabetic"}>
                            <span>Mono-Alphabetic Cipher</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="Vigenere">
                        <Link to={"/Vigenere"}>
                            <span>Vigenère Cipher</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="Playfair">
                        <Link to={"/Playfair"}>
                            <span>Playfair Cipher</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="Hill">
                        <Link to={"/Hill"}>
                            <span>Hill Cipher</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="Extended-Euclid">
                        <Link to={"/Extended-Euclid"}>
                            <span>Extended-Euclid Algorithm</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    };
}
