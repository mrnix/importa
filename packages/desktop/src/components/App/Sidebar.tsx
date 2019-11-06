import * as React from 'react';
// import {Link} from '@reach/router';
import Auth from '@aws-amplify/auth';
import styles from './Sidebar.module.sass';
import FolderTree from '../FolderTree/FolderTree';
import {connect} from 'react-redux';
import {RootState} from '../../common/store';
import Button from '../Button/Button';
import Head from '../Head/Head';

class Sidebar extends React.PureComponent<any> {
  handleClickLogin = () => {
    // @ts-ignore
    Auth.federatedSignIn({provider: 'Google'});
  };
  render() {
    return (
      <div className={styles.sidebar}>
        <Head />
        <div className={styles.profile}>
          {this.props.user && (
            <>
              <span className={styles.name}>
                {this.props.attributes && this.props.attributes.name}
              </span>
              <Button small intent="primary" onClick={() => Auth.signOut()}>
                Sign Out
              </Button>
            </>
          )}
          {!this.props.user && (
            <Button small fat intent="primary" onClick={this.handleClickLogin}>
              Login
            </Button>
          )}
        </div>
        {/* <Link to="/">Home</Link> */}
        <FolderTree />
      </div>
    );
  }
}

export default connect((state: RootState) => ({
  user: state.auth.user,
  attributes: state.auth.userAttributes
}))(Sidebar);
