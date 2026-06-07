import { createContext, useMemo, useState } from 'react'

export const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const value = useMemo(() => ({ items, setItems }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
