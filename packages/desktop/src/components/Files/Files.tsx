import * as React from 'react';
import {connect} from 'react-redux';
import styles from './Files.module.sass';
import Head from '../Head/Head';
import {RootState} from '../../common/store';
import Grid from '../Grid/Grid';
import Button from '../Button/Button';
import {requestThumbs} from '../../common/store/data/actions';
import Share from '../Share/Share';
import {Item} from '../../common/store/data/reducer';

const isHome = ['/', '/index.html'];

class Files extends React.PureComponent<{
  p?: string;
  item?: Item;
  requestThumbs: any;
  userReady: boolean;
}> {
  state = {
    share: false
  };
  componentDidMount() {
    const {item} = this.props;

    if (item) {
      this.props.requestThumbs({items: item.children});
    }
  }

  handleClickShare = () => {
    this.setState({share: true});
  };

  handleCloseShare = () => {
    this.setState({share: false});
  };

  render() {
    const {item, userReady} = this.props;

    return (
      <div className={styles.files}>
        {item && item.name !== 'data' && (
          <Share
            key={item.fullPath}
            item={item}
            items={item.children}
            isOpen={this.state.share}
            onClose={this.handleCloseShare}
          />
        )}
        <Head />
        {item && (
          <div className={styles.head}>
            <div>
              <h1>{item.name}</h1>
              <div>{item.children.length} files</div>
            </div>
            <div>
              <Button
                fat
                disabled={!userReady}
                intent="primary"
                onClick={this.handleClickShare}
              >
                Share
              </Button>
            </div>
          </div>
        )}
        {item && <Grid items={item.children} />}
      </div>
    );
  }
}

export default connect(
  (state: RootState, props: any) => {
    const {pathname} = props.location;

    const p = isHome.includes(pathname)
      ? state.data.dir
      : decodeURI(
          pathname.startsWith('/folder')
            ? pathname.replace('/folder', '')
            : pathname
        );

    return {
      item: (p && state.data.items[p]) || undefined,
      p,
      userReady: state.auth.userReady
    };
  },
  {requestThumbs}
)(Files);
