import "./App.scss";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { ThemeProvider, CssBaseline } from "@mui/material";



// const PrivateRoutes = () => {
//   const location = useLocation();
//   location.state.Userid
//   const auth = {'token': location.state.Userid ? true : false}
//   return(
//       auth.token ? <Outlet/> : <Navigate to="/"/>
//   )
// }

// import
import StockoutScreen from "./screens/StockoutScreen/StockoutForm";
import StampPrintScreen from "./screens/StampPrintScreenv2";
import ErrorScreen from "./screens/ErrorScreen";
import InventoryScreen from "./screens/InventoryScreen";
import ReportChemistryScreen from "./screens/ReportScreen/ChemistryForm";
import Stockin from "./screens/StockinScreenv2/StockinForm";
import ListStockin from "./screens/StockinScreenv2/ListStockinForm";
import DeliveryScreen from "./screens/DeliveryScreen/DeliveryForm";
import ListStockout from "./screens/StockoutScreen/ListStockOutForm";
import DeleteOrder from "./screens/SettingsScreen/DeleteOrderForm";
import LabelSplit from "./screens/LabelSplitScreen";
import PermissionRack from "./screens/SettingsScreen/PermissionRackForm";
import UserForm from "./screens/SettingsScreen/UserForm";
import { useSelector } from 'react-redux';
import DataHistoryPrintScreen from "./screens/PrintOtherScreen/DataHistoryPrintScreen";
import PrintDecorateScreen from "./screens/PrintOtherScreen/PrintDecorateScreen";
import PrintChemistryScreen from "./screens/PrintOtherScreen/PrintChemistryScreen";
import PrintSampleScreen from "./screens/PrintOtherScreen/PrintSampleScreen";
import PrintInventoryScreen from "./screens/PrintOtherScreen/PrintInventoryScreen";
import PrintShelveCode from "./screens/PrintOtherScreen/PrintShelveCodeScreen";
import DeliverySampleScreen from "./screens/DeliveryScreen/DeliverySampleForm";
import WareHouseF from "./screens/Inventory Statistics/WareHouseForm";
import MaterialDetailForm from "./screens/Inventory Statistics/MaterialDetailForm";
import PermissionPrintScreen from "./screens/SettingsScreen/PrintPermissionForm";
import CheckData from "./screens/DeliveryScreen/CheckData";
import RegisterLabel from "./screens/StampPrintScreenv2/RegisterLabel";
import InventoryIn from "./screens/StockinScreenv2/InventoryInForm";
import { getFactory, getWareHouse, setFactory } from "./utils/localStorage";
import PrintFOC from "./screens/PrintOtherScreen/PrintFOCScreen";
import AccountingCardSole from "./screens/ReportScreen/AccountingCardSole";
const ProtectedRoutes = ({ authenticate }: { authenticate: boolean }) => {

  if (!authenticate) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

function App() {
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(false)

  useEffect(() => {
    if (dataUser != '') {
      setAuthenticate(true)
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);



  return (

    <section className={"App"}>
      <Routes>
        <Route element={<ProtectedRoutes authenticate={authenticate} />}>
          <Route path={"/stock-in"} element={<Stockin />}></Route>
          <Route path={"/"} element={<HomeScreen />}></Route>
          <Route path={"/stock-out"} element={<StockoutScreen />}></Route>
          <Route path={"/stamp-print"} element={<StampPrintScreen />}></Route>
          <Route path={"/inventory"} element={<InventoryScreen />}></Route>
          <Route path={"/accounting-card"} element={<ReportChemistryScreen />}></Route>
          <Route path={"/list-stockin"} element={<ListStockin />}></Route>
          <Route path={"/delivery"} element={<DeliveryScreen />}></Route>
          <Route path={"/list-stockout"} element={<ListStockout />}></Route>
          <Route path={"/delete-order"} element={<DeleteOrder />}></Route>
          <Route path={"/label-split"} element={<LabelSplit />}></Route>
          <Route path={"/priority-rack"} element={<PermissionRack />}></Route>
          <Route path={"/user-form"} element={<UserForm />}></Route>
          <Route path={"/history-print"} element={<DataHistoryPrintScreen />}></Route>
          <Route path={"/decorate-print"} element={<PrintDecorateScreen />}></Route>
          <Route path={"/chemistry-print"} element={<PrintChemistryScreen />}></Route>
          <Route path={"/sample-print"} element={<PrintSampleScreen />}></Route>
          <Route path={"/foc-print"} element={<PrintFOC />}></Route>
          <Route path={"/inventory-print"} element={<PrintInventoryScreen />}></Route>
          <Route path={"/shelve-code"} element={<PrintShelveCode />}></Route>
          <Route path={"/delivery-sample"} element={<DeliverySampleScreen />}></Route>
          <Route path={"/warehouse"} element={<WareHouseF />}></Route>
          <Route path={"/material-detail"} element={<MaterialDetailForm />}></Route>
          <Route path={"/permission-print"} element={<PermissionPrintScreen />}></Route>
          <Route path={"/check-data"} element={<CheckData />}></Route>
          <Route path={"/register-label"} element={<RegisterLabel />}></Route>
          <Route path={"/inventory-in"} element={<InventoryIn />}></Route>
          <Route path={"/accountingcard-sole"} element={<AccountingCardSole />}></Route>
        </Route>
        <Route path={"/login"} element={<LoginScreen />} />
        <Route path={"/*"} element={<ErrorScreen />} />
      </Routes>
    </section>
  );
}

export default App;
