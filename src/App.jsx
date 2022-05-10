import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Detail from './views/Detail';
import Home from './views/Home';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/park/:parkCode">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}
