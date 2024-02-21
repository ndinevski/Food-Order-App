import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react';

import {useSelector, useDispatch} from 'react-redux';

import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

import {cartActions} from '../store/cart-redux';
import {RootState} from '../store/index';


export default function Cart () {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState)=>state.cart);
    const meals = useSelector((state: RootState)=>state.meals.meals);

    const handleCartOpen = () => {
        dispatch(cartActions.toggleCart());
        onOpen();
    }

    const handleCartClose = () => {
        dispatch(cartActions.toggleCart());
        onClose();
    }

    return (
        <div className='cart'>
            <Button textColor={'#ffc404'} onClick={handleCartOpen}>Cart ({cart.totalQuantity})</Button>

            {cart.isOpen && <Modal isOpen={isOpen} onClose={handleCartClose}>
                <ModalOverlay />
                <ModalContent bg="#21251c">
                <ModalHeader>Your Cart</ModalHeader>
                <ModalCloseButton />
                <ModalBody className='cart'>
                    <ul>
                        {cart.cart.map((meal) => {
                            return (
                                <CartItem meal={meal} key={meal.id}/>
                            );
                        }
                        )}
                    </ul>
                </ModalBody>
                <div style={{
                    display: 'flex',
                    justifyContent:'flex-end',
                    alignItems: 'center',
                    padding: '10px',
                    marginLeft: '10px',
                    borderTop: '1px solid #ccc',
                    marginRight: '10px',
                }}><div>${Math.abs(Number(cart.totalPrice.toFixed(2)))}</div></div>
                <ModalFooter>
                    <Button variant="ghost" onClick={handleCartClose}>
                    Close
                    </Button>
                    <CheckoutForm handleCartClose={handleCartClose}/>
                </ModalFooter>
                </ModalContent>
            </Modal>}
        </div>
    );
}
 