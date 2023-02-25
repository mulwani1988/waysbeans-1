import "./App.css";
import NavbarSection from "./components/Navbar";
import { useState } from "react";
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
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import CustomerRoute from "./components/CustomerRoute";
import AdminRoute from "./components/AdminRoute";
import UnregisteredEmailModal from "./components/UnregisteredEmailModal";
import WrongPasswordModal from "./components/WrongPasswordModal";

function App() {
  const navigate = useNavigate();

  const [Users, SetUsers] = useState(UsersData);
  const [Transactions, SetTransactions] = useState(TransactionsData);
  const [Products, SetProducts] = useState(ProductsData);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const[LoggedInUser, setLoggedInUser] = useState({
    id:0,
  });

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
        setLoggedInUser(() => ({
          id: User.id,
        }));
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
      name: "",
      email: "",
      password: "",
    }));

    setModalRegisterShow(false);
    setModalLoginShow(true);
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
    const lastProductId = Products[Products.length - 1].id;
    const autoId = lastProductId + 1;
    const newProductWithAutoId = {
      ...formAddProduct,
      id: autoId,
      photo: imageUrl,
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
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalUnregisteredEmail, setModalUnregisteredEmail] = useState(false);
  const [modalWrongPassword, setModalWrongPassword] = useState(false);

  return (
    <>
      <SuccessTransactionModal 
          show={modalSuccessTransaction} 
          onHide={() => setmodalSuccessTransaction(false)} 
      />
      <SuccessAddProductModal 
          show={modalSuccessAddProduct} 
          onHide={() => setmodalSuccessAddProduct(false)} 
      />
      <SuccessUpdateProductModal 
          show={modalSuccessUpdateProduct} 
          onHide={() => setmodalSuccessUpdateProduct(false)} 
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
        onHide={() => setModalUnregisteredEmail(false)} 
        changeModal={() => {
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
        LoggedInUser={LoggedInUser} 
        Users={Users} 
        Products={Products}
        showModalLogin={() => setModalLoginShow(true)} 
        showModalRegister={() => setModalRegisterShow(true)} 
        isLogin={isLogin} 
        isAdmin={isAdmin} 
        logout={() => {
          setIsLogin(false);
          setIsAdmin(false);
        }} 
        admin={() => setIsAdmin(true)} 
      />
      <Routes>
        <Route path="/" element={isAdmin ? <AdminDashboard 
          Users={Users} 
          Transactions={Transactions} 
          /> : <Home Products={Products} />} />
        <Route path="/product-details/:id" element={<ProductDetails 
          isLogin={isLogin} 
          showModalLogin={() => setModalLoginShow(true)} 
          Products={Products} 
          Users={Users} 
          LoggedInUser={LoggedInUser} 
          SetUsers={SetUsers} 
        />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<CustomerRoute isLogin={isLogin} />}>
          <Route path="/cart" element={<Cart 
            Users={Users} 
            LoggedInUser={Users.find(data => data.id === LoggedInUser.id)} 
            Products={Products} 
            SetUsers={SetUsers} 
            Transactions={Transactions} 
            SetTransactions={SetTransactions} 
            showModalSuccessTransaction={() => setmodalSuccessTransaction(true)} 
          />} />
          <Route path="/profile" element={<Profile 
            LoggedInUser={Users.find(data => data.id === LoggedInUser.id)} 
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
