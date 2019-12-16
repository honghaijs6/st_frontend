
export  const MAIN_COLOR = '#18A689';
export const ORDER_STATUS = [
    { code:0, icon:'fa-clock-o',color:'#C64333' ,name:'Chờ Duyệt', action:'Duyệt' },
    { code:1,icon:'fa-shopping-cart',color:'#00ACD7',name:'Đã Duyệt', action:'Xác nhận mua' },
    { code:2,icon:'fa-cube', color:'#0067A4',name:'Đã Xác Nhận Mua', action:'Lập xuất kho' },
    { code:3,icon:'fa-truck',color:'#16957B',name:'Đang Thi Công', action:'Hoàn tất' },   
    { code:4,icon:'fa-heart' ,color:'#DA8C10',name:'Đã Hoàn Tất',action:'Lập phiếu thu' },
    { code:5,icon:'fa-check',color:'#643BAD',name:'Kết thúc', action:'Kết húc' }       
];
export const DATE_FORMAT = 'yyyy-MM-dd';

export const PURCHASE_STATUS = [
    { code:0, icon:'fa-clock-o',color:'#C64333' ,name:'Đề xuất', action:'Duyệt' },
    { code:1,icon:'fa-shopping-cart',color:'#00ACD7',name:'Đã Duyệt', action:'Lập phiếu nhập kho' },
    { code:2,icon:'fa-cube', color:'#0067A4',name:'Đã lập phiếu nhập kho', action:'Lập phiếu chi' },
    { code:3,icon:'fa-truck',color:'#16957B',name:'Đã lập phiếu chi', action:'' }

];

export const WAREHOUSE_RECEIPT = [
    { code:0, icon:'fa-clock-o',color:'#C64333' ,name:'Đang xử lý', action:'Duyệt' },
    { code:1,icon:'fa-check',color:'#00ACD7',name:'Hoàn thành', action:'Nhập hàng' },
];


export const WAREHOUSE_TYPES = {
    in:{
        icon:'fa fa-reply',
        code:'bg-green',
        name:'Phiếu Nhập'
    },
    out:{
        icon:'fa fa-share',
        code:'bg-red',
        name:'Phiếu Xuất'
    }
}

export const WAREHOUSE_TRACKS = {
    in:[
        { code:'muahang',name:'Mua hàng'},
        {code:'nhaptra',name:'Nhập trả'},
        {code:'dieuchuyen',name:'Điểu chuyển kho'},
        {code:'canbang',name:'Cân bằng kho'},
        {code:'khac',name:'Khác'}   
    ],
    out:[
        {code:'banhang',name:'Bán hàng'},
        {code:'xuattra',name:'Xuất trả'},
        {code:'xuatdomat',name:'Xuất do mất'},
        {code:'xuatdohu',name:'Xuất do hư'},
        {code:'dieuchuyen',name:'Điều chuyển kho'},
        {code:'canbang',name:'Cần bằng kho'},
        {code:'khac',name:'Khác'}
    ]
}  

export const BILL_ACC_TYPES = [
    { code:'tm',name:'Tiền mặt' },
    { code:'ck',name:'Ngân hàng' },
    { code:'voucher',name:'Voucher/ Giftcard' },
    { code:'point',name:'Điểm tích luỹ' },
    { code:'debit',name:'Debit/ Credit card' },
    { code:'cod',name:'COD' }   
];


export const ISERVICE_TYPES = {  
    osv:{
        icon:'fa fa-support',
        color:'#0067A4',
        name:'Phiếu dịch vụ'
    },
    isv:{
        icon:'fa fa-bug',
        color:'#00A65A',
        name:'Phiếu tiếp nhận'
    },
    onl:{
        color:'#F39C12',
        name:'Online'
    },
    tra:{
        color:'#643BAD',
        name:'Giao hàng'
    }
  
}

export const JOB_TYPES = [
    { code:0, name:'Nhân viên chính thức' },
    { code:1, name:'Bán thời gian' },
    { code:2, name:'Thử việc' },
    { code:3, name:'Làm thêm ngoài giờ' },
    { code:4, name:'Nhân viên thời vụ' },
    { code:5, name:'Làm dự án' }

];

export const JOB_LEVELS = [
    { code:0, name:'Mới tốt nghiệp' },
    { code:1, name:'Thực tập' },
    { code:2, name:'Nhân viên' },
    { code:3, name:'Trưởng nhóm/ Giám sát' },
    { code:4, name:'Phó phòng' },
    { code:5, name:'Trưởng phòng' },
    { code:6, name:'Phó cửa hàng' },
    { code:7, name:'Trưởng cửa hàng' },
    { code:8, name:'Phó giám đốc' },
    { code:9, name:'Giám đốc' },
    { code:10, name:'Giám đốc điều hành' },
    { code:11, name:'Phó chủ tịch' },
    { code:12, name:'Chủ tịch' }
];

export const PRICE_SETTING = {
    b:"(a *0.3) + a",
    c:"(b *0.2) + b",
    d:"(c *0.1) + c"
}


export const DEFAULT_PASSWORD = 'admin@333';