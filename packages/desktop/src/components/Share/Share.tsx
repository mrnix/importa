import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../common/store';
import Modal from '../Modal/Modal';
import ShareForm from './ShareForm';

const Share = (props: any) => {
  return (
    <Modal title="Share" {...props}>
      {props.isOpen && <ShareForm {...props} />}
    </Modal>
  );
};

export default connect((state: RootState, props: any) => {
  return {};
})(Share);
