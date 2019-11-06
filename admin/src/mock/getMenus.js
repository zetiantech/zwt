export default [
  {
    path: '/news',
    component: 'Layout',
    children: [
      {
        path: 'list',
        component: 'views/news/list/index',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '资讯列表'
        },
        name: 'News',
        type: '2',
        url: ''
      },
      {
        path: 'category',
        component: 'views/news/category/index',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '分类管理'
        },
        name: 'Category',
        type: '2',
        url: ''
      },
      {
        path: 'push',
        component: 'views/news/push/index',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '推送管理'
        },
        name: 'Push',
        type: '2',
        url: ''
      },
      {
        path: 'modal',
        component: 'views/news/modal/index',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '模板管理'
        },
        name: 'Modal',
        type: '2',
        url: ''
      }
    ],
    meta: {
      noCache: false,
      icon: 'info',
      requireAuth: true,
      title: '资讯管理'
    },
    name: '资讯管理',
    type: '1',
    url: ''
  },
  {
    path: '/car',
    component: 'Layout',
    children: [
      {
        path: 'carMarkApply',
        component: 'views/car/CarMarkApply',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '补换领机动车合格标志'
        },
        name: 'CarMarkApply',
        type: '2',
        url: ''
      },
      {
        path: 'registCertApply',
        component: 'views/car/RegistCertApply',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '换领机动车登记证书'
        },
        name: 'RegistCertApply',
        type: '2',
        url: ''
      },
      {
        path: 'yearAuditApply',
        component: 'views/car/YearAuditApply',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '机动车年审预约'
        },
        name: 'YearAuditApply',
        type: '2',
        url: ''
      },
      {
        path: 'transferApply',
        component: 'views/car/TransferApply',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '机动车转移登记'
        },
        name: 'TransferApply',
        type: '2',
        url: ''
      },
      {
        path: 'handleIllegalApply',
        component: 'views/car/HandleIllegalApply',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '交通违法办理预约'
        },
        name: 'HandleIllegalApply',
        type: '2',
        url: ''
      },
      {
        path: 'drivingLicenseApply',
        component: 'views/car/DrivingLicenseApply',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '有效期满换证'
        },
        name: 'DrivingLicenseApply',
        type: '2',
        url: ''
      },
      {
        path: 'redemptionPlatesApply',
        component: 'views/car/RedemptionPlatesApply',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '换领机动车号牌'
        },
        name: 'RedemptionPlatesApply',
        type: '2',
        url: ''
      },
      {
        path: 'replenishPlatesApply',
        component: 'views/car/ReplenishPlatesApply',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '补领机动车号牌'
        },
        name: 'ReplenishPlatesApply',
        type: '2',
        url: ''
      }
    ],
    meta: {
      noCache: false,
      icon: 'user',
      requireAuth: true,
      title: '车主服务'
    },
    name: 'OwnerService',
    type: '1',
    url: ''
  },
  {
    path: '/house',
    component: 'Layout',
    meta: {
      noCache: false,
      icon: 'user',
      requireAuth: true,
      title: '不动产专题'
    },
    alwaysShow: true,
    name: 'house',
    type: '1',
    url: '',
    children: [
      {
        path: 'estatemanage/estateAppointment',
        component: 'views/estatemanage/estateAppointment',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '不动产预约'
        },
        name: 'estateAppointment',
        type: '2',
        url: ''
      }
    ]
  },
  {
    path: '/justice',
    component: 'Layout',
    meta: {
      noCache: false,
      icon: 'user',
      requireAuth: true,
      title: '司法公证'
    },
    alwaysShow: true,
    name: 'justice',
    type: '1',
    url: '',
    children: [
      {
        path: 'justicemanage/notaryAppointment',
        component: 'views/justicemanage/notaryAppointment',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '公证预约'
        },
        name: 'notaryAppointment',
        type: '2',
        url: ''
      }
    ]
  },
  {
    path: '/system',
    component: 'Layout',
    children: [
      {
        path: 'user',
        component: 'views/system/user/index',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '账号管理'
        },
        name: 'User',
        type: '2',
        url: ''
      },
      {
        path: 'role',
        component: 'views/system/role/index',
        meta: {
          noCache: false,
          icon: '',
          requireAuth: true,
          title: '角色管理'
        },
        name: 'Role',
        type: '2',
        url: ''
      }
    ],
    meta: {
      noCache: false,
      icon: 'user',
      requireAuth: true,
      title: '系统管理'
    },
    name: 'System',
    type: '1',
    url: ''
  }
]
