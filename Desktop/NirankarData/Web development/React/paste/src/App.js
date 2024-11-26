import logo from './logo.svg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Paste from './component/Paste';
import View from './component/View';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div>
          <Navbar />
          <Home />
        </div>
    },
    {
      path: "/paste",
      element:
        <div>
          <Navbar />
          <Paste />
        </div>
    },
    {
      path: '/paster/:id',
      element:
        <div>
          <Navbar />
          <View />
        </div>
    },
    {
      path: '/view',
      element:
        <div>
          <Navbar />
          <View />
        </div>
    },
    {
      path: '',
      element:
        <div>

        </div>
    },
  ]
);

function App() {
  return (
    <div>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
