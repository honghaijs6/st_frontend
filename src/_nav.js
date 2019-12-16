export default {
  items: [

    {
      code:'default',
      title: true,
      name: 'VI KHANG Co.,ltd ', // TÊN ĐƠN VỊ SỬ DỤNG
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      code:'default',
      name: 'Timeline',
      url: '/dashboard',
      icon: 'fa fa-clock-o',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },



    {
      code:'employee.view',
      name:'Nhân sự',
      url:'/employee',
      icon:'icon-user',
      class:''
    },

    {
      code:'orders.view',
      name: 'Bán Hàng (F4)',
      url: '/order',
      icon: 'icon-screen-desktop',
      class:'',
      children:[
        {
          code:'orders.view',
          name:'B.Giá / Đơn hàng',
          url:'/order/_s',
          icon:'',
          class:''
        },
        /*{
          name:'Q.L Hoá đơn VAT',
          url:'order/invoice',
          icon:''
        },
        {
          name:'Q.L Khuyến Mãi',
          url:'/order/promotion',
          icon:''
        },
        {
          name:'Nhà Vận Chuyển',
          url:'/order/shippingmethod',
          icon:''
        },*/
        {
          code:'orders.summary',
          name:'Báo Cáo',
          url:'/order/summary',
          icon:'',
          class:''
        },
        {
          code:'orders.setting',
          name:'Thiết Lập',
          url:'/order/setting',
          icon:'',
          class:''
        },

      ]
    },
    {
      code:'inventory.view',
      name: 'Nhà Kho',
      url: '/inventory',
      icon: 'icon-drawer',
      class:'',
      children:[
        {
          code:'inventory.warehouse',
          name: 'DS Nhà Kho',
          url: '/inventory/warehouse',
          icon: '',
          class:''
        },
        {
          code:'inventory.add',
          name: 'Nhập - Xuất Kho',
          url: '/inventory/receipt',
          icon: '',
          class:''
        },
        {
          code:'inventory.view',
          name: 'Xem Tồn Kho',
          url: '/inventory/productnew',
          icon: '',
          class:''
        },
        {
          code:'inventory.purchases',
          name: 'Mua Hàng (PO)',
          url: '/inventory/po',
          icon: '',
          class:''
        },

        {
          code:'inventory.purchases',
          name: 'Cài Đặt Kho',
          url: '/inventory/setting',
          icon: '',
          class:''
        },
      ]
    },
    {
      code:'cashflow.view',
      name: 'Sổ Tiền',
      url: '/cashflow',
      icon: 'icon-briefcase',
      children:[
        {
          code:'cashflow.view',
          name:'Phiếu thu - Phiếu chi',
          url:'/cashflow/view',
          icon:'',
          class:''
        },
        {
          code:'cashflow.summary',
          name:'Tổng quan Thu - Chi',
          url:'/cashflow/summary',
          icon:'',
          class:''
        },
        {
          code:'cashflow.setting',
          name:'Cài đặt Sổ Tiền',
          url:'/cashflow/setting',
          icon:'',
          class:''
        },
      ]
    },
    {
      code:'customer.view',
      name: 'Khách Hàng (F2)',
      url: '/customer',
      icon: 'icon-people',
      class:'',
      children:[
        {
          code:'customer.view',
          name:'DS Khách Hàng',
          url:'/customer/_s',
          icon:'',
          class:''
        },
        {
          code:'customer.point',
          name:'Điểm tích luỹ',
          url:'/customer/point',
          icon:'',
          class:''
        },
        /*{
          name:'Lịch sử gủi e-mail',
          url:'/customer/crmemail',
          icon:''
        },
        {
          name:'Lich sử gủi SMS',
          url:'/customer/crmsms',
          icon:''
        },*/

        {
          code:'customer.setting',
          name:'Thiết Lập',
          url:'/customer/setting',
          icon:'',
          class:''
        }

      ]
    },
    {
      code:'services.view',
      name:'Dịch vụ & Hỗ trợ',
      url:'/services',
      icon:'icon-support',
      class:'',
      children:[
        {
          code:'services.view',
          name:'Tickets',
          url:'/services/tickets',
          icon:'fa fa-ticket',
          class:''
        },
        /*{
          name:'Giao hàng',
          url:'/services/delivery',
          icon:'fa fa-truck'
        },*/
        {
          code:'services.report',
          name:'Báo cáo',
          url:'/services/report',
          icon:'fa fa-pie-chart',
          class:''
        },
        {
          code:'services.setting',
          name:'Thiết lập',
          url:'/services/setting',
          icon:'fa fa-wrench',
          class:''
        },

      ]
    },

    {
      code:'crm.view',
      name: 'Marketting (F3)',
      url: '/crm',
      icon: 'icon-magnet',
      class:'',
      children:[
        {
          code:'crm.campaign',
          name:'DS chiến dịch',
          url:'/crm/campaign',
          icon:'',
          class:''
        },
        {
          code:'crm.email',
          name:'E-mail Marketting',
          url:'/crm/email',
          icon:'',
          class:''
        },
        {
          code:'crm.sms',
          name:'SMS Marketting',
          url:'/crm/sms',
          icon:'',
          class:''
        },

        {
          code:'crm.aumation',
          name:'Automation',
          url:'/crm/automation',
          icon:'',
          class:''
        },

        {
          code:'crm.setting',
          name:'Thiết lập',
          url:'/crm/setting',
          icon:'',
          class:''
        },
      ]
    },

    {
      code:'kpi.view',
      name:'KPI (F7)',
      url:'/kpi',
      icon:'fa fa-dashboard',
      class:'',
      children:[
        {
          code:'kpi.view',
          name:'DS KPI',
          url:'/kpi/target',
          icon:'',
          class:''

        },
        {
          code:'kpi.customer',
          name:'Khách Hàng',
          url:'/kpi/customer',
          icon:'',
          class:''
        },
        {
          code:'kpi.employee',
          name:'Nhân viên',
          url:'/kpi/employee',
          icon:'',
          class:''
        },
        {
          code:'kpi.product',
          name:'Sản phẩm',
          url:'/kpi/product',
          icon:'',
          class:''
        }

      ]
    },

    {
      code:'portal.view',
      name: 'Web Portal',
      url: '/portal',
      icon: 'icon-cursor',
      class:''
    },



    {
      code:'setting.app',
      name: 'Thiết lập',
      url: '/settings',
      icon: 'icon-wrench',
      class:'',
      children:[
        {
          code:'setting.company',
          name:'Công ty',
          url:'/setting/company',
          icon:'fa fa-gg-circle',
          class:''
        },
        {
          code:'setting.notification',
          name:'Thông báo',
          url:'/setting/notification',
          icon:'fa fa-bell',
          class:''
        },
        {
          code:'setting.mailserver',
          name:'Mail server',
          url:'/setting/server',
          icon:'fa fa-server',
          class:''
        }
      ]
    }


  ],
};
