import { NavLink, Link } from "react-router";
import { useState, useRef } from "react";
import cacti from "../assets/cacti.svg";
import { useCart } from "./cart/useCart";

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative pb-1 transition-colors duration-700 ease-in-out ${
          isActive ? "text-black font-bold" : "text-gray-400 hover:text-black"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={`absolute left-0 bottom-0 h-[2px] bg-black rounded-2xl transition-transform duration-500 ease-in-out origin-left ${
              isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
            style={{ width: "100%" }}
          />
        </>
      )}
    </NavLink>
  );
};

const Nav = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 300);
  };

  return (
    <header className="flex gap-10 justify-between px-10 pt-3 pb-3 bg-white border-b-[1px] sticky top-0 left-0 w-full z-50">
      <div className="navLogo flex gap-2 items-end text-2xl font-semibold">
        <p>
          <Link to="/">CACTIX</Link>
        </p>
        <img src={cacti} alt="Logo" />
      </div>

      <nav className="grid grid-cols-[1fr_10em] items-center w-full">
        <div className="homeShop flex gap-10 justify-center">
          <CustomNavLink to="/">Home</CustomNavLink>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CustomNavLink to="/shop">
              <div className="shopNav">Shop</div>
            </CustomNavLink>
          </div>
          {isHovering && (
            <Dropdown
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          )}
        </div>

        <div className="cartSection flex justify-end">
          <CustomNavLink to="/cart">
            <span className="relative inline-block">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </span>
          </CustomNavLink>
        </div>
      </nav>
    </header>
  );
};

const Dropdown = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 top-16 z-40 h-[15em] border-top border-[1px] bg-white flex justify-center gap-[8em]"
    >
      <div className="dpTops dp">
        <h1>Tops</h1>
        <div className="dpDes">
          <p>
            <Link to="/tops">All Tops</Link>
          </p>
          <p>
            <Link to="/tops/t-shirts">T-Shirts</Link>
          </p>
          <p>
            <Link to="/tops/graphic-tees">Graphic Tees</Link>
          </p>
          <p>
            <Link to="/tops/hoodies">Hoodies</Link>
          </p>
          <p>
            <Link to="/tops/jackets">Jackets</Link>
          </p>
        </div>
      </div>
      <div className="dpBottoms dp">
        <h1>Bottoms</h1>
        <div className="dpDes">
          <p>
            <Link to="/bottoms">All Bottoms</Link>
          </p>
          <p>
            <Link to="/bottoms/jeans">Jeans</Link>
          </p>
          <p>
            <Link to="/bottoms/cargo-pants">Cargo Pants</Link>
          </p>
          <p>
            <Link to="/bottoms/sweatpants-&-joggers">Sweatpants & Joggers</Link>
          </p>
          <p>
            <Link to="/bottoms/pants">Pants</Link>
          </p>
        </div>
      </div>
      <div className="dpShoes dp">
        <h1>Shoes</h1>
        <div className="dpDes">
          <p>
            <Link to="/shoes">All Shoes</Link>
          </p>
          <p>
            <Link to="/shoes/casual-&-everyday">Casual & Everyday</Link>
          </p>
          <p>
            <Link to="/shoes/sneakers">Sneakers</Link>
          </p>
          <p>
            <Link to="/shoes/designer-shoes">Designer Shoes</Link>
          </p>
        </div>
      </div>
      <div className="dpAcc dp">
        <h1>Accessories</h1>
        <div className="dpDes">
          <p>
            <Link to="/accessories">All Accessoires</Link>
          </p>
          <p>
            <Link to="/accessories/backpacks">Bagpacks</Link>
          </p>
          <p>
            <Link to="/accessories/handbags">Handbags</Link>
          </p>
          <p>
            <Link to="/accessories/hats-&-headwear">Hats & Headwear</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
