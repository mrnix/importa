import * as React from 'react';
import {connect} from 'react-redux';
import {Location} from '@reach/router';
import styles from './FolderTree.module.sass';
import {RootState} from '../../common/store';

import Node from './Node';

class FolderTree extends React.PureComponent<any, any> {
  state = {
    active: null
  };

  handleClick = (node: any) => {
    console.log('handleClick', node);
  };
  render() {
    return (
      <Location>
        {({location}) => (
          <div className={styles.tree}>
            <div className={styles.scroll}>
              {/* <a href="importa://test">test</a> */}
              <Node p={this.props.p} location={location} />
            </div>
          </div>
        )}
      </Location>
    );
  }
}

export default connect((state: RootState) => {
  return {
    p: state.data.dir,
    dir: state.data.dir
  };
})(FolderTree);
