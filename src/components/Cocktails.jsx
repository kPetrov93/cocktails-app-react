import { Link } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import Loader from './Loader';

const Cocktails = () => {
  const { data, loading, error } = useFetchData('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
  
  const setId = (id) => {
    localStorage.setItem('cocktailId', id);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data || !data.drinks) {
    return <div>No cocktails found.</div>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[15px]">
      {data.drinks.map((cocktail) => (
        <div
          key={cocktail.idDrink}
          className="bg-[#fff] border-[1px] border-[solid] border-[#ddd] rounded-[5px] overflow-hidden [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)] [transition:transform_0.2s] hover:scale-105"
          data-id={cocktail.idDrink}
          onClick={() => setId(cocktail.idDrink)}
        >
          <Link to='/details'>
            <img className="w-full h-auto block" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          </Link>
          <p className="p-[10px]">{cocktail.strDrink}</p>
        </div>
      ))}
    </div>
  );
};

export default Cocktails;