import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Detail from './views/Detail';
import Home from './views/Home';

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/park/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}
