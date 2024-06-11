import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import CocktailsPage from './pages/CocktailsPage';
import CocktailsDetailsPage from './pages/CocktailsDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter( 
  createRoutesFromElements(
    <>
      <Route index element= {<CocktailsPage />} />
      <Route path='/details' element= {<CocktailsDetailsPage />} />
      <Route path='*' element= {<NotFoundPage />} />
    </> 
  )
);

const App = () => {
  return <RouterProvider router={router}/>
}

export default App