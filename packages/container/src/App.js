import React, { lazy, Suspense,useState } from 'react';


/*import MarketingApp from './components/MarketingApp';
import AuthApp from './components/AuthApp'; 
*/
const MarketingApp = React.lazy(() => import('./components/MarketingApp'));
const AuthApp = React.lazy(() => import('./components/AuthApp'));

import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from './components/Progress';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

export default () => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header onSignOut={()=>setIsSignedIn(false)} isSignedIn={isSignedIn} />
          <Suspense  fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                  <AuthApp onSignIn={()=>setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
