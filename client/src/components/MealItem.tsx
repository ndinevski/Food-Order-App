import {useDispatch} from 'react-redux';
import {cartActions} from '../store/cart-redux';
import {Meal} from '../types/types';

type Props = {
    meal : Meal,
};

export default function MealItem ({meal} : Props) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(cartActions.addMeal(meal));
    };

    return (
        <div className="meal-item">
            <img src={'http://a86d7620a7faf4f13b6105d7795aefb9-71443352.eu-west-1.elb.amazonaws.com/' + meal.image}></img>
            <h3>{meal.name}</h3>
            <article>
                <p className="meal-item-description">{meal.description}</p>
                <p className="meal-item-price">$ {meal.price}</p>
            </article>
            <button className="button meal-item-actions" onClick={handleAddToCart}>Add to Carts</button>
        </div>
    );
}   