import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader";
import Title from "../components/Title";
import NotFoundPage from "./NotFoundPage";

const CocktailDetailsPage = () => {
  const cocktailId = localStorage.getItem('cocktailId');
  const { data: cocktail, loading, error } = useFetchData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);

  const renderIngredients = (data) => {

    let ingredientsHtml = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];

      if (ingredient && measure) {
        ingredientsHtml.push(
          <p key={i} className="bg-[#f9f9f9] border-[1px] border-[solid] border-[#ddd] rounded-[5px] p-[10px] mx-[0] my-[16px] font-normal">{`${measure} ${ingredient}`}</p>
        );
      } else {
        break;
      }
    }
    return ingredientsHtml;
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFoundPage/>;
  }

  if (!cocktail) {
    return null;
  }

  return (
    <div className="max-w-[1080px] w-[90%] mx-auto my-10">
      <Title props={cocktail.drinks[0].strDrink} />
      <div className="flex">
        <div className="w-[45%] mr-[18px]">
          <img
           className="rounded-[10px] w-full [box-shadow:8px_8px_8px_#0000004d]"
           src={cocktail.drinks[0].strDrinkThumb}
            alt={cocktail.drinks[0].strDrink}
         />
         <div>
            <h2 className="text-[24px] mx-[0] my-[16px]">Categories</h2>
           <p className="rounded-[30px] border-[5px] border-[solid] border-[gainsboro] bg-[gainsboro] text-[rgb(0,_140,_255)] uppercase text-[12px] font-bold text-center w-[fit-content]">
             {cocktail.drinks[0].strCategory}
           </p>
          </div>
          <div>
            <h2 className="text-[24px] mx-[0] my-[16px]">Glass</h2>
            <p className="rounded-[30px] border-[5px] border-[solid] border-[gainsboro] bg-[gainsboro] text-[rgb(0,_140,_255)] uppercase text-[12px] font-bold text-center w-[fit-content]">
              {cocktail.drinks[0].strGlass}
           </p>
         </div>
       </div>
       <div className="w-[55%]">
          <div>
           <h2 className="text-[24px]">Ingredients</h2>
            <ul>
              {renderIngredients(cocktail.drinks[0])}
           </ul>
          </div>
         <div>
           <h2 className="text-[24px]">Instructions</h2>
            <p className="bg-[#f9f9f9] border border-gray-300 rounded p-[10px] mt-[16px] font-normal">
              {cocktail.drinks[0].strInstructions}
            </p>
         </div>
       </div>
     </div>
   </div>
  );
};

export default CocktailDetailsPage;