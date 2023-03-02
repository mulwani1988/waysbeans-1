import "./App.css";
import NavbarSection from "./components/Navbar";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import UsersData from "./data/users.json";
import TransactionsData from "./data/transactions.json";
import ProductsData from "./data/products.json";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import ListProduct from "./pages/ListProduct";
import PageNotFound from "./pages/PageNotFound";

import SuccessAddProductModal from "./components/SuccessAddProductModal";
import SuccessUpdateProductModal from "./components/SuccessUpdateProductModal";
import SuccessTransactionModal from "./components/SuccessTransactionModal";
import SuccessAddCartModal from "./components/SuccessAddCartModal";
import SuccessRegisterModal from "./components/SuccessRegisterModal";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import CustomerRoute from "./components/CustomerRoute";
import AdminRoute from "./components/AdminRoute";
import UnregisteredEmailModal from "./components/UnregisteredEmailModal";
import WrongPasswordModal from "./components/WrongPasswordModal";
import SuccessLoginToast from "./components/SuccessLoginToast";
import SuccessLogoutToast from "./components/SuccessLogoutToast";
import OutOfStockModal from './components/OutOfStockModal';

function App() {
  const navigate = useNavigate();
  useEffect(() => window.scroll({top: 0, behavior: "smooth"}),[]);

  const [Users, SetUsers] = useState(UsersData);
  const [Transactions, SetTransactions] = useState(TransactionsData);
  const [Products, SetProducts] = useState(ProductsData);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const[LoggedInUserId, setLoggedInUserId] = useState(0);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: ""
  });
  const formLoginHandleOnChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  const formLoginHandleOnSubmit = (e) => {
    e.preventDefault();
    if (Users.some(user => user.email === formLogin.email)) {
      let User = Users.filter(User => User.email === formLogin.email);
      User = User[0];
      if (User.password === formLogin.password) {
        setIsLogin(true);
        setIsAdmin(User.isAdmin);
        setLoggedInUserId(User.id);
        settoastSuccessLogin(true);
      }
      else {
        setIsLogin(false);
        setModalWrongPassword(true);
      }
    }
    else {
      setIsLogin(false);
      setModalUnregisteredEmail(true);
    }

    setFormLogin((formLogin) => ({
      ...formLogin,
      email: "",
      password: ""
    }));

    setModalLoginShow(false);
  };

  const [formRegister, setFormRegister] = useState({
    id:0,
    isAdmin: false,
    picture: "/images/profile-picture-placeholder.webp",
    name: "",
    email: "",
    password: "",
    cart: [],
  });
  const formRegisterHandleOnChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };
  const formRegisterHandleOnSubmit = (e) => {
    e.preventDefault();
    const lastUserId = Users[Users.length - 1].id;
    const autoId = lastUserId + 1;
    const newUserWithAutoId = {
      ...formRegister,
      id: autoId,
    };
    const updatedUsers = [...Users];
    updatedUsers.push(newUserWithAutoId);
    SetUsers(updatedUsers);

    setFormRegister((formRegister) => ({
      ...formRegister,
      id:0,
      isAdmin: false,
      picture: "/images/profile-picture-placeholder.webp",
      name: "",
      email: "",
      password: "",
      cart: [],
    }));

    setModalRegisterShow(false);
    setmodalSuccessRegister(true);
  };

  const [imageUrl, setImageUrl] = useState("/images/product-placeholder.webp");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const [formAddProduct, setformAddProduct] = useState({
    id:0,
    name: "",
    stock: "",
    price: "",
    description: "",
    photo: "",
  });
  const formAddProductHandleOnChange = (e) => {
    setformAddProduct({
      ...formAddProduct,
      [e.target.name]: e.target.value,
    });
  };
  const formAddProductHandleOnSubmit = (e) => {
    e.preventDefault();
    const lastProductIndex = Products.length - 1;
    const lastProduct = Products[lastProductIndex];
    const lastProductId = lastProduct.id;
    const autoId = lastProductId + 1;
    const newProductWithAutoId = {
      ...formAddProduct,
      id: autoId,
      photo: imageUrl,
      stock: parseInt(formAddProduct.stock),
      price: parseInt(formAddProduct.price),
    };
    const updatedProducts = [...Products];
    updatedProducts.push(newProductWithAutoId);
    SetProducts(updatedProducts);
    
    setformAddProduct((formAddProduct) => ({
      ...formAddProduct,
      name: "",
      stock: "",
      price: "",
      description: "",
      photo: "",
    }));
    setImageUrl("/images/product-placeholder.webp");
    setmodalSuccessAddProduct(true);
    navigate("/list-product");
  };

  const [formUpdateProduct, setformUpdateProduct] = useState({
    id:0,
    name: "",
    stock: "",
    price: "",
    description: "",
    photo: "",
  });
  const formUpdateProductHandleOnChange = (e) => {
    setformUpdateProduct({
      ...formUpdateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const formUpdateProductHandleOnSubmit = (e) => {
    e.preventDefault();
    const newProductWithImage = {
      ...formUpdateProduct,
      photo: imageUrl,
      stock: parseInt(formUpdateProduct.stock),
      price: parseInt(formUpdateProduct.price),
    };
    const indexToUpdate = Products.findIndex(item => item.id === newProductWithImage.id);
    if (indexToUpdate !== -1) Products.splice(indexToUpdate, 1, newProductWithImage);
    SetProducts([...Products]);
    
    setformUpdateProduct((formUpdateProduct) => ({
      ...formUpdateProduct,
      name: "",
      stock: "",
      price: "",
      description: "",
      photo: "",
    }));
    setmodalSuccessUpdateProduct(true);
    navigate("/list-product");
  };

  const [modalSuccessUpdateProduct, setmodalSuccessUpdateProduct] = useState(false);
  const [modalSuccessAddProduct, setmodalSuccessAddProduct] = useState(false);
  const [modalSuccessTransaction, setmodalSuccessTransaction] = useState(false);
  const [modalSuccessAddCart, setmodalSuccessAddCart] = useState(false);
  const [modalSuccessRegister, setmodalSuccessRegister] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalUnregisteredEmail, setModalUnregisteredEmail] = useState(false);
  const [modalWrongPassword, setModalWrongPassword] = useState(false);
  const [toastSuccessLogin, settoastSuccessLogin] = useState(false);
  const [toastSuccessLogout, settoastSuccessLogout] = useState(false);
  const [modalOutOfStockShow, setModalOutOfStockShow] = useState(false);

  return (
    <>
      <OutOfStockModal 
        show={modalOutOfStockShow} 
        onHide={() => setModalOutOfStockShow(false)} 
      />
      <SuccessLoginToast 
        show={toastSuccessLogin} 
        onClose={() => settoastSuccessLogin(false)} 
      />
      <SuccessLogoutToast 
        show={toastSuccessLogout} 
        onClose={() => settoastSuccessLogout(false)} 
      />
      <SuccessTransactionModal 
          show={modalSuccessTransaction} 
          onHide={() => setmodalSuccessTransaction(false)} 
      />
      <SuccessRegisterModal  
          show={modalSuccessRegister} 
          onHide={() => {
            setmodalSuccessRegister(false);
            setModalLoginShow(true);
          }} 
      />
      <SuccessAddProductModal
          show={modalSuccessAddProduct} 
          onHide={() => setmodalSuccessAddProduct(false)} 
      />
      <SuccessUpdateProductModal 
          show={modalSuccessUpdateProduct} 
          onHide={() => setmodalSuccessUpdateProduct(false)} 
      />
      <SuccessAddCartModal 
          show={modalSuccessAddCart} 
          onHide={() => setmodalSuccessAddCart(false)} 
      />
      <LoginModal 
        show={modalLoginShow} 
        onHide={() => {
          setModalLoginShow(false);
          setFormLogin((formLogin) => ({
            ...formLogin,
            email: "",
            password: "",
          }));
        }} 
        changeModal={() => {
          setModalLoginShow(false);
          setModalRegisterShow(true);
          setFormLogin((formLogin) => ({
            ...formLogin,
            email: "",
            password: "",
          }));
        }} 
        formLogin={formLogin} 
        loginOnChange={(e) => formLoginHandleOnChange(e)}
        loginOnSubmit={(e) => formLoginHandleOnSubmit(e)}
      />
      <RegisterModal 
        show={modalRegisterShow} 
        onHide={() => {
          setModalRegisterShow(false);
          setFormRegister((formRegister) => ({
            ...formRegister,
            email: "",
            password: "",
            name: "",
          }));
        }} 
        changeModal={() => {
          setModalRegisterShow(false);
          setModalLoginShow(true);
          setFormRegister((formRegister) => ({
            ...formRegister,
            email: "",
            password: "",
            name: "",
          }));
        }}
        formRegister={formRegister} 
        registerOnChange={(e) => formRegisterHandleOnChange(e)}
        registerOnSubmit={(e) => formRegisterHandleOnSubmit(e)}
      />
      <UnregisteredEmailModal 
        show={modalUnregisteredEmail} 
        onHide={() => {
          setModalUnregisteredEmail(false);
          setModalRegisterShow(true);
        }} 
      />
      <WrongPasswordModal 
        show={modalWrongPassword} 
        onHide={() => {
          setModalWrongPassword(false);
          setModalLoginShow(true);
        }} 
      />
      <NavbarSection 
        LoggedInUserId={LoggedInUserId} 
        Users={Users} 
        Products={Products}
        showModalLogin={() => setModalLoginShow(true)} 
        showModalRegister={() => setModalRegisterShow(true)} 
        isLogin={isLogin} 
        isAdmin={isAdmin} 
        logout={() => {
          setIsLogin(false);
          setIsAdmin(false);
          settoastSuccessLogout(true);
        }} 
        admin={() => setIsAdmin(true)} 
      />
      <Routes>
        <Route path="/" element={isAdmin ? <AdminDashboard Transactions={Transactions} /> : <Home Products={Products} />} />
        <Route path="/product-details/:id" element={<ProductDetails 
          isLogin={isLogin} 
          showModalLogin={() => setModalLoginShow(true)} 
          Products={Products} 
          SetProducts={SetProducts} 
          Users={Users} 
          LoggedInUserId={LoggedInUserId} 
          SetUsers={SetUsers} 
          setmodalSuccessAddCart={() => setmodalSuccessAddCart(true)}
            setModalOutOfStockShow={() => setModalOutOfStockShow(true)}
        />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<CustomerRoute isLogin={isLogin} />}>
          <Route path="/cart" element={<Cart 
            Users={Users} 
            LoggedInUserId={LoggedInUserId} 
            Products={Products} 
            SetProducts={SetProducts} 
            SetUsers={SetUsers} 
            Transactions={Transactions} 
            SetTransactions={SetTransactions} 
            showModalSuccessTransaction={() => setmodalSuccessTransaction(true)} 
            setModalOutOfStockShow={() => setModalOutOfStockShow(true)}
          />} />
          <Route path="/profile" element={<Profile 
            Users={Users} 
            SetUsers={SetUsers} 
            LoggedInUserId={LoggedInUserId} 
            Transactions={Transactions} 
            Products={Products}
          />} />
        </Route>
        <Route path="/" element={<AdminRoute isLogin={isLogin} isAdmin={isAdmin} />}>
          <Route path="/add-product-page" element={<AddProductPage 
            formAddProduct={formAddProduct} 
            AddProductOnChange={(e) => formAddProductHandleOnChange(e)} 
            AddProductOnSubmit={(e) => formAddProductHandleOnSubmit(e)} 
            handleImageUpload={handleImageUpload} 
            imageUrl={imageUrl} 
          />} />
          <Route path="/update-product-page/:id" element={<UpdateProductPage 
            formUpdateProduct={formUpdateProduct} 
            UpdateProductOnChange={(e) => formUpdateProductHandleOnChange(e)} 
            UpdateProductOnSubmit={(e) => formUpdateProductHandleOnSubmit(e)} 
            setformUpdateProduct={setformUpdateProduct} 
            Products={Products} 
            handleImageUpload={handleImageUpload} 
            imageUrl={imageUrl} 
          />} />
          <Route path="/list-product" element={<ListProduct 
            Products={Products} 
            SetProducts={SetProducts} 
            setformUpdateProduct={setformUpdateProduct} 
            setImageUrl={setImageUrl} 
          />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
