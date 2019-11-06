import * as React from 'react';
import {connect} from 'react-redux';
import {API, graphqlOperation} from 'aws-amplify';
import {RootState} from '../../common/store';
import Modal from '../Modal/Modal';
import ShareForm from './ShareForm';
import {listReviews} from '../../backend/graphql/queries';

const Share = (props: any) => {
  React.useEffect(() => {
    console.log(1);
    
    async function request() {
      const request = await API.graphql(graphqlOperation(`query ListReviews {
        listReviews {
         items {
           id
           identityId
           fileId
           resume
           owner
         }
       }
     }`, {
        filter: {
          fileId: {eq: '450175c7-f1bd-4869-bc97-61415b69c700'}
        }
        // limit: 10, 
        // nextToken: null,
        // completed: true,
        // authMode: 'AWS_IAM'
      }));
      console.log(request);
    }
    request();
  }, []);
  return (
    <Modal title="Share" {...props}>
      {props.isOpen && <ShareForm {...props} />}
    </Modal>
  );
};

export default connect((state: RootState, props: any) => {
  return {};
})(Share);
