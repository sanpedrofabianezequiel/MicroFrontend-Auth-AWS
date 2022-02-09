import React, { lazy, Suspense,useState ,useEffect} from 'react';
import { BrowserRouter, Route, Switch ,Redirect } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';


/*import MarketingApp from './components/MarketingApp';
import AuthApp from './components/AuthApp'; 
*/
import Header from './components/Header';

const MarketingApp = React.lazy(() => import('./components/MarketingApp'));
const AuthApp = React.lazy(() => import('./components/AuthApp'));
const DashboardApp = React.lazy(()=> import('./components/DashboardApp'));
import Progress from './components/Progress';



const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

const history = createBrowserHistory();

export default () => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if(isSignedIn){
      history .push('/dashboard')
    }
  }, [isSignedIn])
  

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header onSignOut={()=>setIsSignedIn(false)} isSignedIn={isSignedIn} />
          <Suspense  fallback={<Progress />}>
            <Switch> 

              <Route path="/auth">
                  <AuthApp onSignIn={()=>setIsSignedIn(true)} />
              </Route>

              <Route path='/dashboard'>
                  {!isSignedIn && <Redirect to ='/'/>}
                  <DashboardApp />
              </Route>

              <Route path="/" component={MarketingApp} />

            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
