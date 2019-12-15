import React from 'react';
import PropTypes from 'prop-types';
import {Skeleton} from "antd";

class Delayed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hidden: true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    render() {
        return this.state.hidden ? <Skeleton /> : this.props.children;
    }
}

Delayed.propTypes = {
    waitBeforeShow: PropTypes.number.isRequired
};

export default Delayed;