import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../common/store';
import {createExport} from '../../common/store/data/actions';

class ShareForm extends React.PureComponent<any, any> {
  state = {id: null};
  componentDidMount() {
    const {item, items} = this.props;
    this.props.createExport({item, items});
  }

  render() {
    return <div>Loading</div>;
  }
}

export default connect(
  (state: RootState) => {
    return {};
  },
  {createExport}
)(ShareForm);
