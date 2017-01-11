import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components';

import Icon from './Icon';

const BUTTON_SIZE = 30;

const CloseButton = styled.button.attrs({
  className: 'absolute circle shadow-subtle bg-white bold flex items-center cursor-pointer border border-white p0'
})`
  top: ${-BUTTON_SIZE / 2}px;
  right: ${-BUTTON_SIZE / 2}px;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
`;

const DialogBackdrop = styled.div.attrs({
  className: 'absolute bg-white'
})`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.9;
  z-index: 1001;
`;

const DialogBox = styled.div.attrs({
  className: 'background bg-white transition-popup rounded-3 shadow-subtle center relative mx4'
})`
  padding: 50px 10px;
  width: 500px;
  zIndex: 1002;
  maxWidth: 90vw;
`;

const DialogContainer = styled.span.attrs({
  className: 'block fixed flex items-center justify-center'
})`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
`;

class Dialog extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    closeable: React.PropTypes.bool,
    isOpen: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
  };

  static defaultProps = {
    closeable: true,
    isOpen: false
  };

  constructor(initialProps) {
    super(initialProps);

    let rendered = false;
    let visible = false;

    if (initialProps.isOpen) {
      rendered = visible = true;
    }

    this.state = {
      rendered,
      visible
    };
  }

  componentDidMount() {
    document.documentElement.addEventListener('keydown', this.handleDocumentKeyDown, false);
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    // Opening the dialog
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({ rendered: true }, () => {
        this.setState({ visible: true });
      });
    }

    // Closing the dialog
    if (this.props.isOpen && !nextProps.isOpen) {
      this.setState({ visible: false }, () => {
        // Give the animation some time to finish, then remove the dialog from
        // the DOM
        setTimeout(() => {
          this.setState({ rendered: false });
        }, 150);
      });
    }
  }

  maybeClose = (event) => {
    event.preventDefault();
    if (typeof this.props.onRequestClose === 'function') {
      this.props.onRequestClose();
    }
  };

  handleCloseClick = (event) => {
    this.maybeClose(event);
  };

  handleDocumentKeyDown = (event) => {
    // Close the dialog on hitting the escape key
    if (this.state.visible && event.keyCode === 27) {
      this.maybeClose(event);
    }
  };

  renderBackdrop() {
    if (!this.state.visible) {
      return;
    }

    return <DialogBackdrop />;
  }

  renderCloseButton() {
    if (!this.props.closeable) {
      return;
    }

    return (
      <CloseButton onClick={this.handleCloseClick}>
        <Icon className="mx-auto" icon="close" title="Close" />
      </CloseButton>
    );
  }

  renderDialog() {
    if (!this.state.visible) {
      return;
    }

    return (
      <DialogBox>
        {this.renderCloseButton()}
        {this.props.children}
      </DialogBox>
    );
  }

  render() {
    if (!this.state.rendered) {
      return null;
    }

    return (
      <DialogContainer>
        <ReactCSSTransitionGroup transitionName="transition-slide-up" transitionEnterTimeout={150} transitionLeaveTimeout={300}>
          {this.renderDialog()}
        </ReactCSSTransitionGroup>
        {this.renderBackdrop()}
      </DialogContainer>
    );
  }
}

export default Dialog;
