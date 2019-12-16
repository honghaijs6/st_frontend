import React from 'react';
import Loadable from 'react-loadable'

 

function Loading() {
  return <div>Loading...</div>;
}


const Dashboard = Loadable({
  loader:()=> import('./pages/Dashboard'),
  loading:Loading
});

const Employee =  Loadable({
  loader:()=> import('./pages/Employee'),
  loading:Loading
})


/* NHÀ KHO*/
const Warehouse = Loadable({
  loader:()=> import('./pages/Inventory/Warehouse'),
  loading:Loading
});

const Receipt = Loadable({
  loader:()=> import('./pages/Inventory/Receipt'),
  loading:Loading
});

const Productnew = Loadable({
  loader:()=> import('./pages/Inventory/Productnew'),
  loading:Loading
});

const Po = Loadable({
  loader:()=> import('./pages/Inventory/Po'),
  loading:Loading
});

const CreatePo = Loadable({
  loader:()=> import('./pages/Inventory/AddPo'),
  loading:Loading
})


const InventorySetting = Loadable({
  loader:()=> import('./pages/Inventory/Setting'),
  loading:Loading
});

/* END NHÀ KHO*/

/* SỔ TIỀN*/
const CashflowView = Loadable({
  loader:()=> import('./pages/Cashflow/View'),
  loading:Loading
});

const CashflowSummary = Loadable({
  loader:()=> import('./pages/Cashflow/Summary'),
  loading:Loading
});

const CashflowSetting = Loadable({
  loader:()=> import('./pages/Cashflow/Setting'),
  loading:Loading
})
/* END SỔ TIỀN*/

/* CUSTOMER */
const Customer = Loadable({
  loader:()=> import('./pages/Customer/_S'),
  loading:Loading
});

const CustomerPoint = Loadable({
  loader:()=> import('./pages/Customer/Point'),
  loading:Loading
});

const CustomerSetting = Loadable({
  loader:()=> import('./pages/Customer/Setting'),
  loading:Loading
});


/* END CUSTOMER */

// ISERVICE 
const Tickets = Loadable({
  loader:()=>import('./pages/iservice/tickets'),
  loading:Loading
});

const Delivery = Loadable({
  loader:()=> import('./pages/iservice/delivery'),
  loading:Loading
});

const IserviceReport = Loadable({
  loader:()=> import('./pages/iservice/report'),
  loading:Loading
});

const IserviceSetting = Loadable({
  loader:()=> import('./pages/iservice/setting'),
  loading:Loading 
})

// END ISERVICE 


/* ORDER*/
const OrderView = Loadable({
  loader:()=> import('./pages/Order/_S'),
  loading:Loading
});

//  TẠO BÁO GIÁ
const OrderAddQuot = Loadable({
  loader:()=> import('./pages/Order/AddQuot'),
  loading:Loading 
});


const OrderPromotion = Loadable({
  loader:()=> import('./pages/Order/Promotion'),
  loading:Loading
});

const OrderShippingMethod = Loadable({
  loader:()=> import('./pages/Order/Shippingmethod'),
  loading:Loading
});

const OrderSummary = Loadable({
  loader:()=> import('./pages/Order/Summary'),
  loading:Loading
});

const OrderSetting = Loadable({
  loader:()=> import('./pages/Order/Setting'),
  loading:Loading
});
/* END ORDER*/

/* CRM */
const Crmcampaign = Loadable({
  loader:()=> import('./pages/Crm/Campaign'),
  loading:Loading
});

const Crmemail = Loadable({
  loader:()=> import('./pages/Crm/Email'),
  loading:Loading
});

const Crmsms = Loadable({
  loader:()=> import('./pages/Crm/Sms'),
  loading:Loading
});

const CrmAuutomation = Loadable({
  loader:()=> import('./pages/Crm/Automation'),
  loading:Loading
});

const CrmSetting = Loadable({
  loader:()=> import('./pages/Crm/Setting'),
  loading:Loading
});

/* END CRM*/

/* WEB PROTAL*/
const Portal = Loadable({
  loader:()=> import('./pages/Portal'),
  loading:Loading
})
/* END WEB PORTAL*/
/* PROFILE*/
const Profile = Loadable({
  loader:()=> import('./pages/Profile'),
  loading:Loading
});
/* END PROFILE*/


// SETTING & CONFIGS 
const Company = Loadable({
  loader:()=> import('./pages/Setting/Company'),
  loading:Loading
});

const Notification = Loadable({
  loader:()=>import('./pages/Setting/Notification'),
  loading:Loading
});

const Server = Loadable({
  loader:()=>import('./pages/Setting/Server'),
  loading:Loading
})



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  
  { path: '/Dashboard', name:'Dashboard', component:Dashboard },
  
  { path:'/employee', name:'Nhân sự', component:Employee },
  { path: '/inventory/warehouse', exact:true , name:'DS Kho', component:Warehouse},
  { path: '/inventory/receipt', exact:true , name:'Nhập - Xuất Kho', component:Receipt},
  { path: '/inventory/productnew', exact:true , name:'Xem Tồn Kho', component:Productnew},
  { path: '/inventory/po', exact:true , name:'Mua Hàng PO', component:Po},
  { path:'/inventory/po/add', Name:'Tạo PO', component:CreatePo },
    
  { path: '/inventory/setting', name:'Thiết Lập Kho', component:InventorySetting},
  

  { path: '/cashflow/view', exact:true , name:'Phiều thu - Phiếu chi', component:CashflowView},
  { path: '/cashflow/summary', exact:true , name:'Tổng Quan Thu - Chi ', component:CashflowSummary},
  { path: '/cashflow/setting', exact:true , name:'Thiết Lập Sổ Tiền', component:CashflowSetting},

  { path: '/customer/_S', exact:true , name:'Danh sách khách hàng', component:Customer},
  { path: '/customer/point', exact:true , name:'Điểm tích luỹ', component:CustomerPoint},
  { path: '/customer/setting', exact:true , name:'Thiết lập khách hàng', component:CustomerSetting},

  { path:'/services/tickets',name:'Tickets', component:Tickets },
  { path:'/services/delivery',name:'Giao hàng', component:Delivery },
  { path:'/services/report', name:'Báo cáo', component:IserviceReport },
  { path:'/services/setting',  name:'Thiết lập', component:IserviceSetting },

  { path: '/order/_s', exact:true , name:'DS Đơn hàng', component:OrderView},
  { path: '/order/add', name:'Tạo Báo Giá', component:OrderAddQuot },
  { path: '/order/promotion', exact:true , name:'Chương trình khuyến mãi', component:OrderPromotion},
  { path: '/order/shippingmethod', exact:true , name:'Nhà Vận Chuyển', component:OrderShippingMethod},
  { path: '/order/summary', exact:true , name:'Báo cáo', component:OrderSummary},
  { path: '/order/setting', exact:true , name:'Thiết lập bán hàng', component:OrderSetting},



  { path : '/crm/campaign', exact:true, name:'Chiến dịch', component:Crmcampaign},
  { path : '/crm/email', exact:true, name:'E-mail marketing', component:Crmemail},
  { path : '/crm/sms', exact:true, name:'E-mail marketing', component:Crmsms},
  { path : '/crm/automation', exact:true, name:'E-mail marketing', component:CrmAuutomation},
  { path : '/crm/setting', exact:true, name:'E-mail marketing', component:CrmSetting},

  { path : '/profile', name:'Thông tin cá nhân', component:Profile},

  { path : '/portal', name:'Web Portal', component:Portal},
  
  { path :'/setting/company', name:'Công ty', component:Company },
  { path:'/setting/notification', name:'Thông báo', component:Notification },
  { path:'/setting/server', name:'Mail server', component:Server }


];

export default routes;
