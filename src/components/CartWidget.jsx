import { Link } from "react-router-dom"
import { useContext } from "react"

import carrito from '../assets/cart.svg'
import { ItemsContext } from "../contexts/itemsContext"

export const CartWidget = () => {
    const {items} = useContext(ItemsContext)

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
    <Link to="/cart">
        <img src={carrito} height={30} className="ms-2"/>
        <span className="cartNumber">{totalItems}</span>
    </Link>
    )
}