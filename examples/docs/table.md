<script>
  import tableData from './data/tabledata.js';
  import treeTableData from './data/tree-table.js';
  const columns1 = [
    {
      title: '机构编号',
      key: 'number',
      width: 85,
      textAlign: 'left'
    },
    {
      title: '机构名称',
      key: 'name',
      width: 292,
      textAlign: 'left',
      textLine: 2,
      selectText: true
    },
    {
      title: '类型',
      key: 'type',
      width: 180,
      textAlign: 'center'
    },
    {
      title: '状态',
      key: 'brand',
      width: 82,
      textAlign: 'center',
      click: true
    }
  ]
  const columns2 = [
    {
      title: '商品编号',
      key: 'number',
      width: 150,
      textAlign: 'center'
    },
    {
      title: '商品名称',
      key: 'name',
      width: 250,
      textAlign: 'left',
      textLine: 2,
      selectText: true
    },
    {
      title: '商品类别',
      key: 'type',
      width: 150,
      textAlign: 'right'
    },
    {
      title: '品牌',
      key: 'brand',
      width: 180,
      textAlign: 'center'
    },
    {
      title: '规格',
      key: 'specifications',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '图片',
      key: 'image',
      type: 'img',
      width: 76,
      textAlign: 'center'
    },
    {
      title: '零售价',
      key: 'retailPrice',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '基本单位',
      key: 'unit',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '测试测试',
      key: 'brand',
      width: 150,
      textAlign: 'left'
    }
  ]
  export default {
    data () {
      console.log(tableData.data1)
      return {
        demo1Id: 'demo1',
        dropdownData: ['xls', 'json', 'txt', 'xml', 'doc', 'image', 'pdf'],
        tableData: tableData.data1,
        tableColumns: columns1,
        tableColumns2: columns2,
        tableData2: tableData.data2,
        pagination: {
          maxSize: 5,
          total: 88,
          hidePagination: false,
          pageSizes: [10, 20, 25, 50, 100, 200, 500]
        },
        treeTableData: treeTableData,
        treeColumns: [
          {
            title: '组织/部门名称',
            key: 'name',
            width: '264'
          }, {
            title: '编码',
            key: 'code',
            width: '110',
            align: 'center'
          }, {
            title: '简称',
            key: 'short_name',
            width: '208',
            align: 'center'
          }, {
            title: '类型',
            key: 'type',
            width: '110',
            align: 'center'
          }, {
            title: '法人/负责人',
            key: 'admin',
            width: '124',
            align: 'center'
          }, {
            title: '状态',
            key: 'status',
            width: '82',
            align: 'center'
          }
        ]
      }
    },
    methods: {
      tableSelectItem() {
        console.log('tableSelectItem')
      },
      edit(e) {
        console.log(e)
      },
      changePage(e) {
        console.log(e)
      },
      selectType (type) {
      },
      clickStatus (data) {
        console.log('选择了status那一栏', data)
      }
    },
    mounted() {
      this.$refs.orgTable.initToggle()
    }
  };
</script>

# Table 表格
----
### 基础用法
最基础形态小表格,配置`tableColumns`和`data`就可了，配置`td-brand`可单独单击`brand`那一列有事件

<div class="demo-block">
  <t-table :data="tableData"
           :columns="tableColumns"
           :show-handle="true"
           :tdHeight="40"
           :tableId="demo1Id"
           @td-brand="clickStatus"
           @click-item="tableSelectItem">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="delete(scope.item)">删除</span>
      <span @click="disable(scope.item)">禁用</span>
    </template>
  </t-table>
</div>

::: demo
```html
<div class="demo-block">
  <t-table :data="tableData"
           :columns="tableColumns"
           :show-handle="true"
           :tdHeight="40"
           :tableId="demo1Id"
           @click-item="tableSelectItem">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="delete(scope.item)">删除</span>
      <span @click="disable(scope.item)">禁用</span>
    </template>
  </t-table>
</div>

<script>
  const data1 = [
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
  const columns1 = [
    {
      title: '机构编号',
      key: 'number',
      width: 85,
      textAlign: 'left'
    },
    {
      title: '机构名称',
      key: 'name',
      width: 292,
      textAlign: 'left',
      textLine: 2,
      selectText: true
    },
    {
      title: '类型',
      key: 'type',
      width: 180,
      textAlign: 'center'
    },
    {
      title: '状态',
      key: 'brand',
      width: 82,
      textAlign: 'center',
      click: true
    }
  ]
  export default {
    data () {
      console.log(tableData.data1)
      return {
        demo1Id: 'demo1',
        tableData: tableData.data1,
        tableColumns: columns1
      }
    },
    methods: {
      tableSelectItem() {
        console.log('tableSelectItem')
      }
    }
  };
</script>
```
:::

### 左右固定形态表格

左右两列固定，中间滚动，需要配置显示显示出来左右`:show-select="true",:show-handle="true"`再`:select-fixed="true"`(选择固定)和`:handle-fixed="true"`（操作固定），`pagination`分页传入

<div class="demo-block">
  <t-table :data="tableData2"
              :columns="tableColumns2"
              :show-select="true"
              :show-handle="true"
              :select-fixed="true"
              :handle-fixed="true"
              :pagination="pagination"
              :orderNumber="true"
              @click-item="tableSelectItem"
              @change-page="changePage">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="edit(scope.item)">删除</span>
      <span @click="edit(scope.item)">禁用</span>
    </template>
  </t-table>
</div>

::: demo
```html
<div class="demo-block">
  <t-table :data="tableData2"
              :columns="tableColumns2"
              :show-select="true"
              :show-handle="true"
              :select-fixed="true"
              :handle-fixed="true"
              :pagination="pagination"
              :orderNumber="true"
              @click-item="tableSelectItem"
              @change-page="changePage">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="edit(scope.item)">删除</span>
      <span @click="edit(scope.item)">禁用</span>
    </template>
  </t-table>
</div>

<script>
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
  const columns2 = [
    {
      title: '商品编号',
      key: 'number',
      width: 150,
      textAlign: 'center'
    },
    {
      title: '商品名称',
      key: 'name',
      width: 250,
      textAlign: 'left',
      textLine: 2,
      selectText: true
    },
    {
      title: '商品类别',
      key: 'type',
      width: 150,
      textAlign: 'right'
    },
    {
      title: '品牌',
      key: 'brand',
      width: 180,
      textAlign: 'center'
    },
    {
      title: '规格',
      key: 'specifications',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '图片',
      key: 'image',
      type: 'img',
      width: 76,
      textAlign: 'center'
    },
    {
      title: '零售价',
      key: 'retailPrice',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '基本单位',
      key: 'unit',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '测试测试',
      key: 'brand',
      width: 150,
      textAlign: 'left'
    }
  ]
  export default {
    data () {
      console.log(tableData.data1)
      return {
        demo1Id: 'demo2',
        tableColumns2: columns2,
        tableData2: data2,
        pagination: {
          maxSize: 5,
          total: 88,
          hidePagination: false,
          pageSizes: [10, 20, 25, 50, 100, 200, 500]
        }
      }
    },
    methods: {
      tableSelectItem() {
        console.log('tableSelectItem')
      },
      edit(e) {
        console.log(e)
      },
      changePage(e) {
        console.log(e)
      },
      selectType (type) {
      },
      clickStatus (data) {
        console.log('aaa', data)
      }
    }
  };
</script>


```
:::


### 左边选择固定

需要配置显示显示出来左右`:show-select="true"`再`:select-fixed="true"`(选择固定)，`pagination`分页传入

<div class="demo-block">
  <t-table :data="tableData2"
            :columns="tableColumns2"
            :show-select="true"
            :show-handle="true"
            :select-fixed="true"
            :handle-fixed="false"
            :pagination="pagination"
            @click-item="tableSelectItem"
            @change-page="changePage">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="edit(scope.item)">删除</span>
      <span @click="edit(scope.item)">禁用</span>
    </template>
  </t-table>
</div>

::: demo
```html
<div class="demo-block">
  <t-table :data="tableData2"
            :columns="tableColumns2"
            :show-select="true"
            :show-handle="true"
            :select-fixed="true"
            :handle-fixed="false"
            :pagination="pagination"
            @click-item="tableSelectItem"
            @change-page="changePage">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="edit(scope.item)">删除</span>
      <span @click="edit(scope.item)">禁用</span>
    </template>
  </t-table>
</div>


<script>
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
  const columns2 = [
    {
      title: '商品编号',
      key: 'number',
      width: 150,
      textAlign: 'center'
    },
    {
      title: '商品名称',
      key: 'name',
      width: 250,
      textAlign: 'left',
      textLine: 2,
      selectText: true
    },
    {
      title: '商品类别',
      key: 'type',
      width: 150,
      textAlign: 'right'
    },
    {
      title: '品牌',
      key: 'brand',
      width: 180,
      textAlign: 'center'
    },
    {
      title: '规格',
      key: 'specifications',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '图片',
      key: 'image',
      type: 'img',
      width: 76,
      textAlign: 'center'
    },
    {
      title: '零售价',
      key: 'retailPrice',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '基本单位',
      key: 'unit',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '测试测试',
      key: 'brand',
      width: 150,
      textAlign: 'left'
    }
  ]
  export default {
    data () {
      console.log(tableData.data1)
      return {
        demo1Id: 'demo2',
        tableColumns2: columns2,
        tableData2: data2,
        pagination: {
          maxSize: 5,
          total: 88,
          hidePagination: false,
          pageSizes: [10, 20, 25, 50, 100, 200, 500]
        }
      }
    },
    methods: {
      tableSelectItem() {
        console.log('tableSelectItem')
      },
      edit(e) {
        console.log(e)
      },
      changePage(e) {
        console.log(e)
      },
      selectType (type) {
      },
      clickStatus (data) {
        console.log('aaa', data)
      }
    }
  };
</script>


```
:::


### 右边操作固定,左边不固定

右边操作固定,左边不固定`:show-select="true",:show-handle="true"`再`:handle-fixed="true"`(操作固定)，`pagination`分页传入

<div class="demo-block">
  <t-table :data="tableData2"
              :columns="tableColumns2"
              :show-select="true"
              :show-handle="true"
              :select-fixed="false"
              :handle-fixed="true"
              :pagination="pagination"
              @click-item="tableSelectItem"
              @change-page="changePage">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="edit(scope.item)">删除</span>
      <span @click="edit(scope.item)">禁用</span>
    </template>
  </t-table>
</div>

::: demo
```html
<div class="demo-block">
  <t-table :data="tableData2"
              :columns="tableColumns2"
              :show-select="true"
              :show-handle="true"
              :select-fixed="false"
              :handle-fixed="true"
              :pagination="pagination"
              @click-item="tableSelectItem"
              @change-page="changePage">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="edit(scope.item)">删除</span>
      <span @click="edit(scope.item)">禁用</span>
    </template>
  </t-table>
</div>

<script>
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
  const columns2 = [
    {
      title: '商品编号',
      key: 'number',
      width: 150,
      textAlign: 'center'
    },
    {
      title: '商品名称',
      key: 'name',
      width: 250,
      textAlign: 'left',
      textLine: 2,
      selectText: true
    },
    {
      title: '商品类别',
      key: 'type',
      width: 150,
      textAlign: 'right'
    },
    {
      title: '品牌',
      key: 'brand',
      width: 180,
      textAlign: 'center'
    },
    {
      title: '规格',
      key: 'specifications',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '图片',
      key: 'image',
      type: 'img',
      width: 76,
      textAlign: 'center'
    },
    {
      title: '零售价',
      key: 'retailPrice',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '基本单位',
      key: 'unit',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '测试测试',
      key: 'brand',
      width: 150,
      textAlign: 'left'
    }
  ]
  export default {
    data () {
      console.log(tableData.data1)
      return {
        demo1Id: 'demo2',
        tableColumns2: columns2,
        tableData2: data2,
        pagination: {
          maxSize: 5,
          total: 88,
          hidePagination: false,
          pageSizes: [10, 20, 25, 50, 100, 200, 500]
        }
      }
    },
    methods: {
      tableSelectItem() {
        console.log('tableSelectItem')
      },
      edit(e) {
        console.log(e)
      },
      changePage(e) {
        console.log(e)
      },
      selectType (type) {
      },
      clickStatus (data) {
        console.log('aaa', data)
      }
    }
  };
</script>
```
:::


### 左右固定 上下固定
左右固定 上下固定需要指定高度`:scroll-height="300"` 和 `:title-fixed="'fixed'`，其他的跟上面例子一样

<div class="demo-block">
  <t-table :data="tableData2"
              :columns="tableColumns2"
              :show-select="true"
              :show-handle="true"
              :title-fixed="'fixed'"
              :scroll-height="300"
              :select-fixed="true"
              :handle-fixed="true"
              :pagination="pagination"
              @click-item="tableSelectItem"
              @change-page="changePage">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="edit(scope.item)">删除</span>
      <span @click="edit(scope.item)">禁用</span>
    </template>
  </t-table>
</div>

::: demo
```html

<div class="demo-block">
  <t-table :data="tableData2"
              :columns="tableColumns2"
              :show-select="true"
              :show-handle="true"
              :title-fixed="'fixed'"
              :scroll-height="300"
              :select-fixed="true"
              :handle-fixed="true"
              :pagination="pagination"
              @click-item="tableSelectItem"
              @change-page="changePage">
    <template slot="operations" scope="scope">
      <span @click="edit(scope.item)">编辑</span>
      <span @click="edit(scope.item)">删除</span>
      <span @click="edit(scope.item)">禁用</span>
    </template>
  </t-table>
</div>
<script>
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
  const columns2 = [
    {
      title: '商品编号',
      key: 'number',
      width: 150,
      textAlign: 'center'
    },
    {
      title: '商品名称',
      key: 'name',
      width: 250,
      textAlign: 'left',
      textLine: 2,
      selectText: true
    },
    {
      title: '商品类别',
      key: 'type',
      width: 150,
      textAlign: 'right'
    },
    {
      title: '品牌',
      key: 'brand',
      width: 180,
      textAlign: 'center'
    },
    {
      title: '规格',
      key: 'specifications',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '图片',
      key: 'image',
      type: 'img',
      width: 76,
      textAlign: 'center'
    },
    {
      title: '零售价',
      key: 'retailPrice',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '基本单位',
      key: 'unit',
      width: 150,
      textAlign: 'left'
    },
    {
      title: '测试测试',
      key: 'brand',
      width: 150,
      textAlign: 'left'
    }
  ]
  export default {
    data () {
      console.log(tableData.data1)
      return {
        demo1Id: 'demo2',
        tableColumns2: columns2,
        tableData2: data2,
        pagination: {
          maxSize: 5,
          total: 88,
          hidePagination: false,
          pageSizes: [10, 20, 25, 50, 100, 200, 500]
        }
      }
    },
    methods: {
      tableSelectItem() {
        console.log('tableSelectItem')
      },
      edit(e) {
        console.log(e)
      },
      changePage(e) {
        console.log(e)
      },
      selectType (type) {
      },
      clickStatus (data) {
        console.log('aaa', data)
      }
    }
  };
</script>
```
:::


### 树形表格组件

<div class="demo-block">
 <t-tree-table
  :items="treeTableData"
  :columns="treeColumns"
  ref="orgTable">
  <template slot="operations" scope="scope">
    <span @click="edit(scope.item)">编辑</span>
    <span @click="edit(scope.item)">删除</span>
    <span @click="edit(scope.item)" v-if = "scope.item.status == 1">禁用</span>
    <span @click="edit(scope.item)" v-else>启用</span>
  </template>
</t-tree-table>
</div>


:::demo
```html

<div class="demo-block">
 <t-tree-table
  :items="treeTableData"
  :columns="treeColumns"
  ref="orgTable">
  <template slot="operations" scope="scope">
    <span @click="edit(scope.item)">编辑</span>
    <span @click="edit(scope.item)">删除</span>
    <span @click="edit(scope.item)" v-if = "scope.item.status == 1">禁用</span>
    <span @click="edit(scope.item)" v-else>启用</span>
  </template>
</t-tree-table>
</div>

<script>
export default {
    data () {
      return {
        treeTableData: [{
          'name': '田田云总公司',
          'code': '23452345',
          'short_name': '田田云总公司',
          'type': '组织',
          'tree_type': 1,
          'admin': '张三',
          'status': 1,
          'children': [{
            'name': '销售部1',
            'code': '45634',
            'type': '组织',
            'tree_type': 1,
            'short_name': '销售部1',
            'admin': '李四',
            'status': 1,
            'children': [{
              'name': '销售部门1',
              'code': '22123',
              'type': '部门',
              'tree_type': 0,
              'short_name': '销售部门1',
              'admin': '销售部门1',
              'status': 1
            }, {
              'name': '销售部门2',
              'code': '22123',
              'type': '部门',
              'tree_type': 0,
              'short_name': '销售部门2',
              'admin': '销售部门2',
              'status': 1
            }, {
              'name': '销售部门3',
              'code': '22123',
              'type': '部门',
              'tree_type': 0,
              'short_name': '销售部门3',
              'admin': '销售部门3',
              'status': 1
            }, {
              'name': '销售部门4',
              'code': '22123',
              'type': '部门',
              'tree_type': 0,
              'short_name': '销售部门4',
              'admin': '销售部门4',
              'status': 0
            }]
          }, {
            'name': '研发部',
            'code': '3234',
            'type': '部门',
            'tree_type': 1,
            'short_name': '研发部',
            'admin': '王五',
            'status': 1,
            'children': [{
              'name': '研发部1',
              'code': '3234',
              'tree_type': 0,
              'short_name': '研发部1',
              'type': '部门',
              'admin': '王五五',
              'status': 1
            }, {
              'name': '研发部2',
              'code': '3234',
              'tree_type': 0,
              'short_name': '研发部2',
              'type': '个人',
              'admin': '王五六',
              'status': 0
            }]
          }, {
            'name': '行政部',
            'code': '何小六',
            'type': '部门',
            'tree_type': 0,
            'short_name': '行政部',
            'admin': '李四',
            'status': 1
          }, {
            'name': '设计部',
            'code': '3234',
            'type': '部门',
            'tree_type': 0,
            'short_name': '设计部',
            'admin': '程晨',
            'status': 1
          }]
        }],
        treeColumns: [
          {
            title: '组织/部门名称',
            key: 'name',
            width: '264'
          }, {
            title: '编码',
            key: 'code',
            width: '110',
            align: 'center'
          }, {
            title: '简称',
            key: 'short_name',
            width: '208',
            align: 'center'
          }, {
            title: '类型',
            key: 'type',
            width: '110',
            align: 'center'
          }, {
            title: '法人/负责人',
            key: 'admin',
            width: '124',
            align: 'center'
          }, {
            title: '状态',
            key: 'status',
            width: '82',
            align: 'center'
          }
        ]
      }
    },
    mounted() {
      this.$refs.orgTable.initToggle()
    }
  };
</script>

```
:::

### 单独引入

```javascript
import { TTable, TTreeTable } from 'tty-ui';

````


### Options or Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 消息文字 | string | — | — |
| type | 主题 | string | success/warning/info/danger | info |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| closable | 是否显示关闭按钮 | boolean | — | false |

### Methods
调用 `Alert` 或 `this.$alert` 会返回当前 Alert 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |



#### 列的配置（columns）

| 名称  | 默认  | 是否必须  | 说明 |
| ------------ | ------------ | ------------ | ------------ |
| title   | -  |  是 | 表头标题 | 
| key |   | 是  | 数据的 key 值 | 
| width   | -  | 是  | 列的宽度以及最小宽度 | 
| textLine  |  2 | 否  | 指定那一列的单元格文子溢出多少行显示省略号 |
| textAlign   | left  | 否  | 指定那一列的单元格文字的对齐方式left（左对齐） center（ 居中） right(右对齐) |
| image   | -  | 否  | 必须是图片的 url 链接 |


### 表格组件的属性配置说明（table config）

| 名称  |  类型 |  默认 | 是否必须  | 说明 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| tdata  |  Array | -  | 是  | 渲染表格的数据 |
| tcolumns  | Array  | -  | 是  | 表格列的配置 | 
| showSelect | Boolean  |  false  | 否  | 是否显示左侧选择框 |
| showHandle  | Boolean  |  false |  否 | 是否显示右侧操作内容 |
| titleHeight  | Number  | 32  | 否  | 表头高度 | 
| tdHeight  | Number  | 50  | 否  | 单元格高度 |
| titleFixed  | String  | 'auto'  |  否 | 表头是否固定，默认'auto'（不固定），'fixed'(固定),注意：表头固定需指定滚动内容（scrollHight）的高度
|  scrollHight | Numer  | 400  |  否 | 滚动内容的高度
|  selectFixed | Boolean  | false  |   否 | 左侧是否固定
| handleFixed  | Boolean  | false  |   否 | 右侧是否固定
| page  | Object  | -  | 否  | 不配置这个 page 就不显示 底部页码，配置的话{totalPage: 50,maxSize: 5} （totalPage)总页数 ,（maxSize）显示页数

### 事件相关

| 名称  | 是否必须  | 说明  |
| ------------ | ------------ | ------------ |
| clickItem  | 否   | 点击每一行时候触发的事件  |
| changePage |  否 | 页码改变时触发的事件  |
| selectCheck |  否 | 选择左边 chebox 时候触发的事件  |
| td-key |  否 | key 是那个列的 key，表示点点这一列有事件  |


### slot 说明

操作(action)的模板 slot

````
<template slot="operations" scope="scope">
  <span @click="edit(scope.item)">编辑</span>
  <span @click="edit(scope.item)">删除</span>
  <span @click="edit(scope.item)">禁用</span>
</template>

````
	