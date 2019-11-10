import * as React from 'react';
import {RouteComponentProps} from '@reach/router';

interface HomeProps extends RouteComponentProps {}

const Home = (props: HomeProps) => {
  return (
    <div style={{maxWidth: 720, margin: '0 auto'}}>
      <p>Hi! This is Importa. There will be something great.</p>
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
      <p>© <a href="https://nikitin.dev">Sergey Nikitin</a> · <a href="https://github.com/mrnix/importa">GitHub</a></p>
    </div>
  );
};


export default Home