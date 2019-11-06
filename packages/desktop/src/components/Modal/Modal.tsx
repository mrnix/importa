import * as React from 'react';
import cx from 'classnames';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import {ReactComponent as CrossIcon} from '../../svg/cross.svg';

import styles from './Modal.module.sass';

ReactModal.setAppElement('#root');

class Modal extends React.Component<any> {
  static defaultProps = {
    classes: {},
    isOpen: false,
    closeButtonLabel: 'Cancel'
    // wrap: renderContent => renderContent()
  };

  closeModal = () => {
    const {onClose} = this.props;

    if (onClose) {
      onClose();
    }
  };

  render() {
    const {
      isOpen,
      wrap,
      classes,
      children,
      title,
      closeButtonLabel,
      withXButton,
      noCloseButton,
      action,
      renderAction,
      error,
      success,
      footer,
      ...restProps
    } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        className={styles.modal}
        overlayClassName={styles.overlay}
        onRequestClose={this.closeModal}
        contentLabel={title}
        {...restProps}
      >
        {title ? <div className={styles.title}>{title}</div> : null}

        <div className={styles.closeIcon} onClick={this.closeModal}>
          <CrossIcon />
        </div>

        <div className={styles.content}>{children}</div>
        {/* {error && <div className={styles.error}>{error}</div>} */}

        <div className={cx(styles.actions, classes.actions)}>
          {footer && <div className={styles.footer}>{footer}</div>}

          <Button
            onClick={this.closeModal}
            minimal={!!action}
            fat
            large
            cap
          >
            {closeButtonLabel}
          </Button>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
