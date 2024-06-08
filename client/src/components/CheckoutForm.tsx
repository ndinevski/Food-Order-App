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
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { postOrderData } from "../store/meals-redux";
import { cartActions } from "../store/cart-redux";
import {Customer } from "../types/types";
import { AppDispatch, RootState } from '../store/index';

export default function CheckoutForm({ handleCartClose}: any) {
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState<Customer>({
    name: "",
    email: "",
    street: "",
    city: "",
    zip: "",
  });

  const isNameError = input.name === "";
  const isMailError = input.email === "";
  const isAddressError = input.street === "";
  const isCityError = input.city === "";
  const isZipError = input.zip === "";
  const isError =
    isNameError || isMailError || isAddressError || isZipError || isCityError;

  const handleInputChange = (value: string, type: string) => {
    setInput({ ...input, [type]: value });
  };

  const handleSubmit = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(postOrderData(cart.cart, input));
  };

  const handleOpenForm = () => {
    onOpen();
    dispatch(cartActions.toggleForm());
  };

  const handleCloseForm = () => {
    onClose();
    dispatch(cartActions.toggleForm());
    handleCartClose();
  };

  return (
    <div className="cart">
      <Button textColor={"#ffc404"} onClick={handleOpenForm}>
        Go to Checkout
      </Button>
    
      {cart.formIsOpen && (
        <Modal isOpen={isOpen} onClose={handleCloseForm}>
          <ModalOverlay />
          <ModalContent bg="#21251c">
            <ModalHeader>Checkout</ModalHeader>
            <ModalCloseButton />
            <p style={{ marginLeft: "23px" }}>
              Total Amount: ${cart.totalPrice}
            </p>

            <ModalBody className="cart">
              <FormControl isInvalid={isError}>
                <FormLabel>Full Name</FormLabel>
                <input
                  type="text"
                  value={input.name}
                  onChange={(e) => handleInputChange(e.target.value, "name")}
                />
                {isNameError && (
                  <FormErrorMessage>Full name is required.</FormErrorMessage>
                )}

                <FormLabel>E-Mail Address</FormLabel>
                <input
                  type="email"
                  value={input.email}
                  onChange={(e) => handleInputChange(e.target.value, "email")}
                />
                {!isMailError ? (
                  <FormHelperText>
                    We'll never share your email address.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}

                <FormLabel>Street</FormLabel>
                <input
                  type="text"
                  value={input.street}
                  onChange={(e) => handleInputChange(e.target.value, "street")}
                />
                {isAddressError && (
                  <FormErrorMessage>Street name is required.</FormErrorMessage>
                )}

                <FormLabel>Postal Code</FormLabel>
                <input
                  type="text"
                  value={input.zip}
                  onChange={(e) => handleInputChange(e.target.value, "zip")}
                />
                {isZipError && (
                  <FormErrorMessage>Postal code is required.</FormErrorMessage>
                )}

                <FormLabel>City</FormLabel>
                <input
                  type="text"
                  value={input.city}
                  onChange={(e) => handleInputChange(e.target.value, "city")}
                />
                {isCityError && (
                  <FormErrorMessage>City name is required.</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={handleCloseForm}>
                Close
              </Button>
            <Button
                isLoading={cart.formIsLoading}
                loadingText="Submitting"
                colorScheme="teal"
                variant="outline"
                textColor="#ffc404"
                onClick={handleSubmit}
            >
                Sumbit Order
            </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
