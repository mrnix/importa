import * as React from 'react';
import {RouteComponentProps} from '@reach/router';

interface HomeProps extends RouteComponentProps {}

const Home = (props: HomeProps) => {
  return (
    <div style={{maxWidth: 720, margin: '0 auto'}}>
      <p>Hi! This is Importa. There is currently developing something cool. </p>
      <div>
        <img
          style={{
            maxWidth: 720
          }}
          src={
            'https://raw.githubusercontent.com/mrnix/importa/master/screen.jpg'
          }
        />
      </div>
      <p />
      <p />
      <button>Download for Mac</button>
      <button>Download for Windows</button>
      <p>© <a href="https://nikitin.dev">Sergey Nikitin</a></p>
    </div>
  );
};


export default Home