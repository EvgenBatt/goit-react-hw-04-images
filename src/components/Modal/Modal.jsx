import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalDiv, Button } from './Modal.styled';

export class Modal extends Component {
  handleEsc = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  clickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { bigImageUrl, imageTags } = this.props;
    return (
      <Overlay onClick={this.clickBackdrop}>
        <ModalDiv>
          <Button onClick={this.clickBackdrop}>X</Button>
          <img
            src={bigImageUrl}
            alt={imageTags}
            loading="lazy"
            width="1000px"
          />
        </ModalDiv>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  bigImageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
