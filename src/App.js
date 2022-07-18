import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './css/App.css';
import Header from './components/Header';
import Main from './components/Main';
import { setData, setDataCopy } from './redux/reducers/productsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('frontend_data.json')
      .then(response => response.json())
      .then(data => {
        dispatch(setData(data));
        dispatch(setDataCopy(data))
      })
      .catch(error => console.log(`Error: ${error}`));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  )

}

export default App;