import { configureStore } from '@reduxjs/toolkit';
import ArrayRowDowns from './ArrayRowDowns'; 
import ArrayRowUps from './ArrayRowUps';
import ArrayRowDowntoUp from './ArrayRowDowntoUp';
import ArrayDeleteAndPrint from './ArrayDeleteAndPrint';
import UserLogin from './UserLogin';
import ArrayStockout from './ArrayStockout';
import DateTimePicker from './Datetimepicker';
import TotalQtyOut from './TotalQtyOut';
import MaterialTable from './array'
import MaterialTableChecked from './MaterialTableChecked';
import ArrayDelivery  from './ArrayDelivery';
import StockoutDetailChecked  from './StockoutCheckedDetail';
import ArrayChemistry  from './ArrayChemistry';
import ArrayDeliverySampleLeft from './ArrayDeliverySampleLeft';
import ArrayDeliverySampleRight from './ArrayDeliverySampleRight';
import ArrayInventory from './ArrayInventory';
import ArrayAccountingCard from './ArrayAccountingCard';
import FOC from './FOC';
import ArrayAccountingCardMaterial from './ArrayAccountingCardMaterial';
import UserERP from './UserERP'
const store = configureStore({
  reducer: {
    MaterialTable,
    ArrayRowDowns,
    ArrayRowUps,
    ArrayRowDowntoUp,
    ArrayDeleteAndPrint,
    UserLogin,
    ArrayStockout,
    DateTimePicker,
    TotalQtyOut,
    MaterialTableChecked,
    ArrayDelivery,
    StockoutDetailChecked,
    ArrayChemistry,
    ArrayDeliverySampleLeft,
    ArrayDeliverySampleRight,
    ArrayInventory,
    ArrayAccountingCard,
    FOC,
    ArrayAccountingCardMaterial,
    UserERP
  }
});

export default store;