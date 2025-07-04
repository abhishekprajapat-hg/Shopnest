import { createContext, useContext, useReducer } from "react";

// Initial cart state
const CartContext = createContext();

const initialState = {
  cartItems: [],
};

// Reducer function for cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0), // auto remove if qty becomes 0
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
}

// Context provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use context
export function useCart() {
  return useContext(CartContext);
}
