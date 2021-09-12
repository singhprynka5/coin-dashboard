import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CoinListingPage from "./container/CoinListingPage";
import CoinDetailsPage from "./container/CoinDetailsPage";
import PageNotFoundPage from "./container/PageNotFoundPage";

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={CoinListingPage}
          />
          <Route
            exact
            path="/trade/:id"
            component={CoinDetailsPage}
          />
          <Route
            exact
            component={PageNotFoundPage}
          />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
