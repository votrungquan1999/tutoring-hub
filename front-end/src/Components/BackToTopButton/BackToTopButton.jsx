import React, { Component } from 'react';
import './BackToTopButton.css';

class BackToTopButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e) => {
        var currentScrollAmt = window.scrollY;
        this.setState({ visible: currentScrollAmt > this.props.minScrollAmt });
    };

    onClick(e) {
        if (this.props.preventDefault) {
            e.preventDefault();
        }
        window.scrollTo(0, 0);
    }

    render() {
        if (!this.state.visible) { return null; }
        return (
            <div className="BackToTopButton-Component">
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.onClick}
                    data-toggle="tooltip"
                    title="Back to Top"
                >
                    <label htmlFor="backToTop"><i className="fas fa-arrow-alt-circle-up"></i></label>
                </button>
            </div>
        );
    }
}

export default BackToTopButton;