import Cart from './Cart';

export default function Header () {

    return (
        <header id="main-header">
            <div id="title">
                <img src="logo.jpg" alt="React Food App logo" />
                <h1>FOOD ORDERS APP</h1>
            </div>
            <Cart/>
        </header>
    );
}