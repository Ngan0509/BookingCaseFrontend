import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DefaultClass.scss'

class DefaultClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate() {

    }



    render() {

        return (
            <div></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);