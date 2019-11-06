import * as React from 'react';
import cx from 'classnames';
import {Link} from '@reach/router';
import {connect} from 'react-redux';
import {RootState} from '../../common/store';
import styles from './Node.module.sass';

class NodeComponent extends React.Component<any> {
  render() {
    const {item, location} = this.props;

    if (!item || !item.isFolder) {
      return null;
    }

    return (
      <div
        className={cx(styles.folder, {
          [styles.active]:
            decodeURIComponent(location.pathname) === `/folder${item.fullPath}`
        })}
      >
        <div className={styles.name}>
          <Link to={`/folder${item.fullPath}`} className={styles.link}>
            <div className={styles.hit} />
            <span className={styles.text}>{item.name}</span>
          </Link>
        </div>
        <div className={styles.children}>
          {this.props.items.map((p: string) => (
            <Node key={p} p={p} location={location} />
          ))}
        </div>
      </div>
    );
  }
}

const Node = connect((state: RootState, props: any) => {
  const item = state.data.items[decodeURIComponent(props.p)];
  return {item, items: (item && item.children) || []};
})(NodeComponent);

export default Node;
