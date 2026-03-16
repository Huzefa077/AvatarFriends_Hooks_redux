import React, { useEffect } from 'react';  // no need for useState anymore
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import './App.css';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';

import { useSelector, useDispatch } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';  // action creators

function App() {
  const searchField = useSelector(state => state.searchRobots?.searchField || '');

  const robots = useSelector(state => state.requestRobots?.robots || []);
  const isPending = useSelector(state => state.requestRobots?.isPending || false);
  const error = useSelector(state => state.requestRobots?.error || '');

  const dispatch = useDispatch();

  // Handler for search input
  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value));
  };

  // Fetch robots via Redux Thunk once on mount
  useEffect(() => {
    dispatch(requestRobots());  // ← this dispatches pending → fetch → success/failed
  }, [dispatch]);  // dispatch is stable, runs once

  // Filter using Redux values
  const filteredRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchField.toLowerCase())
  );

  // Handle loading / error states from Redux
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
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
}

export default App;