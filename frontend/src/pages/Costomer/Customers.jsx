import { useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { formatCurrency } from "../../utils/currency.js";
import qrCodeImage from "../../assets/images/image.png";

const categories = [
  "All Products",
  "Sun Screen",
  "Serum",
  "Sheet Mask",
  "Cleanser",
];
const memberDiscountRate = 0.1;
const paymentMethods = ["ABA", "ACILIDA", "Wing Bank"];
const paymentDurationSeconds = 300;
const paymentQrImages = {
  ABA: qrCodeImage,
  ACILIDA: qrCodeImage,
  "Wing Bank": qrCodeImage,
};

const products = [
  {
    name: "Beauty Of Joseon SC",
    category: "Sun Screen",
    Stock: 200,
    price: 5.99,
    stock: 20,
    img: "https://i.pinimg.com/1200x/49/38/ac/4938ac66d8613889809cd386ff2554a8.jpg",
  },
  {
    name: "Round Lab SC",
    category: "Sun Screen",
    price: 5.99,
    stock: 70,
    img: "https://i.pinimg.com/736x/03/b1/95/03b195ebbb74027d9866c9ae861b8028.jpg",
  },
  {
    name: "Cellimax SC",
    category: "Sun Screen",
    price: 5.99,
    stock: 100,
    img: "https://i.pinimg.com/1200x/53/31/d3/5331d3b6ba370739e298ff01ddc4b0d0.jpg",
  },
  {
    name: "Innisfree SC",
    category: "Sun Screen",
    price: 5.99,
    stock: 300,
    img: "https://i.pinimg.com/736x/93/9c/08/939c08535fe433ad3dbbf53f09a43891.jpg",
  },
  {
    name: "Thank You Farmer SC",
    category: "Sun Screen",
    price: 5.99,
    stock: 250,
    img: "https://i.pinimg.com/236x/87/12/85/87128512fa0f23c377442d4ec6ae804d.jpg",
  },
  {
    name: "Melixir SC",
    category: "Sun Screen",
    price: 5.99,
    stock: 100,
    img: "https://i.pinimg.com/736x/12/6a/ee/126aee8fa6a58ef2791860d9ff990eca.jpg",
  },
  {
    name: "Innisfree Mineral SC",
    category: "Sun Screen",
    price: 5.99,
    stock: 200,
    img: "https://i.pinimg.com/1200x/67/32/93/6732937a5d1bf02bf53a3e0be31d243c.jpg",
  },
  {
    name: "Cosrx Aloe SC",
    category: "Sun Screen",
    price: 5.99,
    stock: 260,
    img: "https://i.pinimg.com/736x/f6/99/2a/f6992ac0e213b59cb66f2e56a7b888ac.jpg",
  },
  {
    name: "Skin1004 Sun Serum",
    category: "Serum",
    price: 12.0,
    stock: 200,
    img: "https://i.pinimg.com/736x/ec/c8/7d/ecc87db908b896c88b7fa3b5ad85a68c.jpg",
  },
  {
    name: "Axis-y SC",
    category: "Sun Screen",
    price: 5.99,
    stock: 50,
    img: "https://i.pinimg.com/736x/f8/1b/43/f81b43077aa6a04966bc7dda6529d85c.jpg",
  },
  {
    name: "Purito Daily Go-To",
    category: "Sun Screen",
    price: 8.5,
    stock: 180,
    img: "https://i.pinimg.com/1200x/73/aa/07/73aa073da4f211ba62c8445dcc1bcaed.jpg",
  },
  {
    name: "Anua Heartleaf Serum",
    category: "Serum",
    price: 14.25,
    stock: 92,
    img: "https://i.pinimg.com/736x/fa/28/6b/fa286b843041039ece544bd11bd30129.jpg",
  },
  {
    name: "Blue Hyaluronic Mask",
    category: "Sheet Mask",
    price: 2.5,
    stock: 340,
    img: "https://i.pinimg.com/736x/2d/8e/4b/2d8e4b6b399dadc54b82546e8faec26a.jpg",
  },
  {
    name: "Low PH Gel Cleanser",
    category: "Cleanser",
    price: 7.75,
    stock: 145,
    img: "https://i.pinimg.com/1200x/a4/98/ad/a498ad4c9a42812b60ca1e41ad5d16fb.jpg",
  },
  {
    name: "Rice Glow Cleanser",
    category: "Cleanser",
    price: 9.0,
    stock: 120,
    img: "https://i.pinimg.com/736x/9f/53/a8/9f53a80acee12616eaddd52217388860.jpg",
  },
];

function ProductVisual({ category, img, name }) {
  const isMask = category === "Sheet Mask";

  return (
    <div
      className={`customer-product-visual ${isMask ? "mask" : ""} ${img ? "has-image" : ""}`}
    >
      {img ? (
        <img alt={name} src={img} />
      ) : (
        <>
          <span />
          <strong>
            {category === "Serum"
              ? "SERUM"
              : category === "Cleanser"
                ? "CLEANSER"
                : "SPF"}
          </strong>
          <em />
        </>
      )}
    </div>
  );
}

export default function Customers() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [cartItems, setCartItems] = useState([]);
  const [customerType, setCustomerType] = useState("walk-in");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentSecondsLeft, setPaymentSecondsLeft] = useState(
    paymentDurationSeconds,
  );
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [promotion, setPromotion] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    return activeCategory === "All Products"
      ? filteredProducts
      : filteredProducts.slice(0, 4);
  }, [activeCategory, searchTerm]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount =
    promotion === "member" && customerType === "member"
      ? subtotal * memberDiscountRate
      : 0;
  const taxableTotal = Math.max(subtotal - discount, 0);
  const tax = taxableTotal * 0.1;
  const total = taxableTotal + tax;
  const { setUser } = useAuth();
  const selectedQrImage = paymentQrImages[paymentMethod];
  const paymentMinutes = Math.floor(paymentSecondsLeft / 60);
  const paymentSeconds = String(paymentSecondsLeft % 60).padStart(2, "0");
  const isPaymentExpired = paymentSecondsLeft === 0;

  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!isCheckoutOpen || paymentSecondsLeft === 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setPaymentSecondsLeft((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isCheckoutOpen, paymentSecondsLeft]);

  function addToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.name === product.name);

      if (existingItem) {
        return items.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productName, amount) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productName) {
    setCartItems((items) => items.filter((item) => item.name !== productName));
  }

  function handleCustomerTypeChange(event) {
    const nextCustomerType = event.target.value;

    setCustomerType(nextCustomerType);

    if (nextCustomerType !== "member") {
      setPromotion("none");
    }
  }

  function handleCheckoutClick() {
    if (cartItems.length > 0) {
      setPaymentSecondsLeft(paymentDurationSeconds);
      setIsCheckoutOpen(true);
    }
  }

  function handlePaymentDone() {
    setCartItems([]);
    setIsCheckoutOpen(false);
    setPaymentMethod(paymentMethods[0]);
    setPaymentSecondsLeft(paymentDurationSeconds);
  }

  function handleSaveQr() {
    const fileName = `${paymentMethod.toLowerCase().replaceAll(" ", "-")}-payment-qr.jpg`;
    const link = document.createElement("a");

    link.href = selectedQrImage;
    link.download = fileName;
    link.click();
  }

  return (
    <section className="customer-pos-page">
      <div className="customer-pos-shell">
        <header className="customer-pos-header">
          <div className="customer-brand">
            <span className="customer-brand-icon">POS</span>
            <strong>POS SOMROS</strong>
          </div>

          <div className="customer-header-actions">
            <div className="customer-mode">Customer Order</div>
            <button
              type="button"
              className="customer-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="customer-controls">
          <label>
            Customer
            <select value={customerType} onChange={handleCustomerTypeChange}>
              <option value="walk-in">Walk in customer</option>
              <option value="member">Member customer</option>
            </select>
          </label>

          <label>
            Promotion
            <select
              value={promotion}
              onChange={(event) => setPromotion(event.target.value)}
            >
              <option value="none">No Promotion</option>
              <option value="member" disabled={customerType !== "member"}>
                Member Discount
              </option>
            </select>
          </label>
        </div>

        <main className="customer-pos-body">
          <section
            className="customer-products-panel"
            aria-label="Product catalog"
          >
            <div className="customer-search">
              <span>Search</span>
              <input
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search Product..."
                type="search"
                value={searchTerm}
              />
            </div>

            <div
              className="customer-category-row"
              aria-label="Product categories"
            >
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={category === activeCategory ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="customer-product-grid">
              {visibleProducts.map((product) => (
                <article className="customer-product-card" key={product.name}>
                  <div className="customer-card-image">
                    <span
                      className={
                        product.price >= 10
                          ? "customer-new-badge bestseller"
                          : "customer-new-badge"
                      }
                    >
                      {product.price >= 10 ? "Best Seller" : "New"}
                    </span>
                    <ProductVisual
                      category={product.category}
                      img={product.img}
                      name={product.name}
                    />
                  </div>
                  <div className="customer-card-details">
                    <h3>{product.name}</h3>
                    <div className="customer-card-meta flex justify-between w-full ">
                      <p
                        className="customer-rating"
                        aria-label="Rated 5 out of 5"
                      >
                        ★★★★★ <span>(124)</span>
                      </p>
                      <p className="customer-stock" aria-label="Stock level">
                        Stock: {product.stock}
                      </p>
                    </div>
                    <div className="customer-card-meta flex justify-between w-full ">
                      <p className="customer-price ">
                        <strong>{formatCurrency(product.price)}</strong>
                      </p>

                      <button
                        aria-label={`Add ${product.name} to cart`}
                        className="customer-add-cart text-center "
                        onClick={() => addToCart(product)}
                        type="button"
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {visibleProducts.length === 0 && (
                <div className="customer-empty-products">No products found</div>
              )}
            </div>
          </section>

          <aside className="customer-cart-panel" aria-label="Cart summary">
            {cartItems.length === 0 ? (
              <div className="customer-cart-empty">
                <div className="customer-cart-icon">
                  <span />
                </div>
                <strong>Cart is Empty</strong>
                <small>Add Products to Start</small>
              </div>
            ) : (
              <div className="customer-cart-list">
                {cartItems.map((item) => (
                  <article className="customer-cart-item" key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{formatCurrency(item.price)}</span>
                    </div>

                    <div className="customer-qty-controls">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.name, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.name, 1)}
                      >
                        +
                      </button>
                    </div>

                    <strong>
                      {formatCurrency(item.price * item.quantity)}
                    </strong>
                    <button
                      className="customer-remove-item"
                      type="button"
                      onClick={() => removeFromCart(item.name)}
                    >
                      Remove
                    </button>
                  </article>
                ))}
              </div>
            )}

            <div className="customer-cart-summary">
              <dl>
                <div>
                  <dt>Sub Total:</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                <div>
                  <dt>Discount:</dt>
                  <dd>-{formatCurrency(discount)}</dd>
                </div>
                <div>
                  <dt>Tax:</dt>
                  <dd>{formatCurrency(tax)}</dd>
                </div>
              </dl>

              <div className="customer-total">
                <span>Total:</span>
                <strong>{formatCurrency(total)}</strong>
              </div>

              <button
                type="button"
                className="customer-checkout"
                disabled={cartItems.length === 0}
                onClick={handleCheckoutClick}
              >
                <span>PAY</span>
                Check out
              </button>
            </div>
          </aside>
        </main>
      </div>

      {isCheckoutOpen && (
        <div
          className="customer-payment-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-title"
        >
          <section className="customer-payment-modal">
            <div className="customer-payment-header">
              <div>
                <span>Payment</span>
                <h2 id="payment-title">Checkout</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                aria-label="Close payment"
              >
                x
              </button>
            </div>

            <div className="customer-payment-total">
              <div>
                <span>Total Price</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
              <div
                className={
                  isPaymentExpired
                    ? "customer-payment-timer expired"
                    : "customer-payment-timer"
                }
              >
                <span>Pay before</span>
                <strong>
                  {paymentMinutes}:{paymentSeconds}
                </strong>
              </div>
            </div>

            <div
              className="customer-payment-methods"
              aria-label="Payment method"
            >
              {paymentMethods.map((method) => (
                <label
                  className={paymentMethod === method ? "active" : ""}
                  key={method}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>

            <div className="customer-payment-qr">
              <div className="customer-qr-code">
                <img
                  alt={`${paymentMethod} payment QR`}
                  src={selectedQrImage}
                />
              </div>
              <strong>{paymentMethod} Payment QR</strong>
              <small>
                {isPaymentExpired
                  ? "Payment time expired. Close and checkout again."
                  : `Scan QR code to pay ${formatCurrency(total)}`}
              </small>
            </div>

            <div className="customer-payment-actions">
              <button
                type="button"
                className="customer-save-qr"
                onClick={handleSaveQr}
              >
                Save QR
              </button>
            </div>

            <button
              type="button"
              className="customer-payment-done"
              disabled={isPaymentExpired}
              onClick={handlePaymentDone}
            >
              Complete Payment
            </button>
          </section>
        </div>
      )}
    </section>
  );
}
