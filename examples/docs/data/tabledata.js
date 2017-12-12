/**
 * @file
 * @author 何文林
 * @date 2017/9/20
 */

const data1 = [
  // 123
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    disable: false
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '数倍直营店',
    type: '杀虫剂',
    brand: '田田云',
    disable: false
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    disable: false
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    disable: true
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    disable: true
  }
]

const data2 = [
  // 123
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: false,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三阿斯兰的空间了框架暗示离开家；是老大复健科；阿拉山口京东方；阿里斯顿会计法；阿拉山口大姐夫',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: false,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: false,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: true,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: true,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: true,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: false,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: false,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  },
  {
    number: Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000),
    name: '张三',
    type: '杀虫剂',
    brand: '田田云',
    specifications: '规格' + Math.ceil(Math.random() * 10000),
    retailPrice: '￥' + Math.ceil(Math.random() * 10000) + '元',
    unit: '包',
    disable: false,
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3528939554,3658010232&fm=27&gp=0.jpg'
  }
]

const data3 = [
  // 123
  {
    name: '张三',
    job: '门店经理',
    mobile: '13187878888',
    number: '1001',
    organization: '田田云',
    department: '田田云',
    time: '2017-09-01',
    status: '在职',
    disable: false
  },
  {
    name: '李四',
    job: '专员',
    mobile: '13145671231',
    number: '10001',
    organization: '田田云',
    department: '田田云',
    time: '2017-09-01',
    status: '离职',
    disable: true
  },
  {
    name: '王五',
    job: '部门经理',
    mobile: '13145671232',
    number: '10002',
    organization: '田田云',
    department: '田田云',
    time: '2017-09-01',
    status: '在职',
    disable: false
  },
  {
    name: '小六',
    job: '专员',
    mobile: '13145671233',
    number: '10003',
    organization: '田田云',
    department: '田田云',
    time: '2017-09-01',
    status: '在职',
    disable: false
  },
  {
    name: '小七',
    job: '专员',
    mobile: '13145671234',
    number: '10004',
    organization: '田田云',
    department: '田田云',
    time: '2017-09-01',
    status: '在职',
    disable: false
  }
]

const data4 = [
  // 123
  {
    roleName: '系统管理员',
    roleInstruction: '门店经理',
    topRole: '13187878888',
    userQuantity: '101',
    disable: false
  },
  {
    roleName: '系统管理员',
    roleInstruction: '门店经理',
    topRole: '',
    userQuantity: '10',
    disable: false
  },
  {
    roleName: '系统管理员',
    roleInstruction: '门店经理',
    topRole: '',
    userQuantity: '1001',
    disable: false
  },
  {
    roleName: '系统管理员',
    roleInstruction: '门店经理',
    topRole: '店长',
    userQuantity: '11',
    disable: false
  },
  {
    roleName: '系统管理员',
    roleInstruction: '门店经理',
    topRole: '',
    userQuantity: '1',
    disable: false
  }
]

export default {
  data1,
  data2,
  data3,
  data4
}
