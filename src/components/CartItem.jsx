import {useDispatch} from 'react-redux';
import {cartActions} from '../store/cart-redux';

export default function CartItem ({meal}){
    const previewName = `${meal.name} - ${meal.quantity} x $${meal.price}`;
    const dispatch = useDispatch();

    const handleAddClick = () => {
        dispatch(cartActions.addMeal(meal));
    };

    const handleRemoveClick = () => {
        dispatch(cartActions.removeMeal(meal));
    };


    return (
        <li className="cart-item">
            <p>
                {previewName}
            </p>
            <span className="cart-item-actions">
                <button onClick={handleRemoveClick} className="button meal-item-actions">-</button>
                <span>{meal.quantity}</span>
                <button onClick={handleAddClick} className="button meal-item-actions">+</button>
            </span>
        </li>
    );
}
  
