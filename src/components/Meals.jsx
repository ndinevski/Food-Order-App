import Meal from './Meal';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {fetchMealData} from '../store/meals-redux';


export default function Meals () {
    const dispatch = useDispatch();
    const meals = useSelector((state) => state.meals.meals)

    useEffect (()=> {
        dispatch(fetchMealData());
    }, [dispatch]); 

    return (
        <div id="meals">
            {meals?.map((meal) => {
                return <Meal key={meal.id} meal={meal} />
            })}
        </div>
    );
}