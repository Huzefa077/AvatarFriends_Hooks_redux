import React, { useEffect } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import './App.css';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';

import { useSelector, useDispatch } from 'react-redux';
import { setSearchField, requestAvatars } from '../actions';

function App() {
  const searchField = useSelector(state => state.searchAvatars?.searchField || '');
  const avatars = useSelector(state => state.requestAvatars?.avatars || []);
  const isPending = useSelector(state => state.requestAvatars?.isPending || false);
  const error = useSelector(state => state.requestAvatars?.error || '');

  const dispatch = useDispatch();

  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value));
  };

  useEffect(() => {
    dispatch(requestAvatars());
  }, [dispatch]);

  const filteredAvatars = avatars.filter((avatar) =>
    avatar.name.toLowerCase().includes(searchField.toLowerCase())
  );

  if (isPending) {
    return <h1 className="tc f1">Loading...</h1>;
  }

  if (error) {
    return <h1 className="tc f1 red">Error: {error}</h1>;
  }

  return (
    <div className="tc">
      <h1 className="f1 yellow">Avatar - Friends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList avatars={filteredAvatars} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
}

export default App;