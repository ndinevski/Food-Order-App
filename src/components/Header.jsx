import Cart from './Cart';

export default function Header () {

    return (
        <header id="main-header">
            <div id="title">
                <img src="logo.jpg" alt="React Food App logo" />
                <h1>FOODAPP</h1>
            </div>
            <Cart/>
        </header>
    );
}