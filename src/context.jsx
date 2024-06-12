import { useContext } from 'react';
import { createContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
// import cartItems from './data';
import { calculateTotals } from './utils';
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(),
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalItems, totalCost } = calculateTotals(state.cart);

  const fetchData = async (url) => {
    try {
      //set Loading to true
      dispatch({ type: LOADING });
      //fetch data from api and return response.
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error Fetching Data`);
      }
      return response.json();
    } catch (error) {
      console.log(error, error.message);
    }
  };

  useEffect(() => {
    const callFetchData = async () => {
      const url = 'https://www.course-api.com/react-useReducer-cart-project';

      const cart = await fetchData(url);
      // const cart = new Map(items.map((item) => [item.id, item]));
      dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
    };
    callFetchData();
  }, []);

  const handleClearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const increaseItem = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decreaseItem = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        handleClearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        totalItems,
        totalCost,
      }}
    >
      {children};
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
