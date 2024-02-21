import MealItem from './MealItem';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {MealsStore} from '../store/meals-redux';
import {fetchMealData} from '../store/meals-redux';
import { AppDispatch, RootState } from '../store/index';


export default function Meals () {
    const dispatch: AppDispatch = useDispatch();
    const meals = useSelector((state: RootState) => state.meals.meals);

    useEffect (()=> {
        dispatch(fetchMealData());
    }, [dispatch]); 

    return (
        <div id="meals">
            {meals.map((meal) => {
                return <MealItem key={meal.id} meal={meal} />
            })}
        </div>
    );
}