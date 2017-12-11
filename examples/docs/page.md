<script>
  module.exports = {
    data () {
      return {
        pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        currentPageSm: 1,
        currentPage: 1,
        currentPageLg: 1,
      }
    },
    methods: {
      changePage(e) {
        console.log(e)
      },
      changeMaxSizefn(size) {
        console.log(size)
      },
    }
  };
</script>

# Page 分页

----
### 基础用法
分页组件

<div class="demo-block">
  <t-page :total-page="50"
          :max-size="6"
          :total="200" 
          :pageSizes="pageSizes"
          v-model="currentPage"
          @change="changePage" 
          @changeMaxSize="changeMaxSizefn"></t-page>
</div>

::: demo
```html

<t-page :total-page="50"
          :max-size="6"
          :total="200" 
          :pageSizes="pageSizes"
          v-model="currentPage"
          @change="changePage" 
          @changeMaxSize="changeMaxSizefn"></t-page>

<script>
  module.exports = {
    data () {
      return {
        pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        currentPageSm: 1,
        currentPage: 1,
        currentPageLg: 1,
      }
    },
    methods: {
      changePage(e) {
        console.log(e)
      },
      changeMaxSizefn(size) {
        console.log(size)
      },
    }
  }
</script>
```
:::


### Options or Attributes

| 参数      | 类型          | 默认参数      | 是否必须   | 描述  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model  | Number   | -  | 是  | 当前页码 |
| boundary-links  | Boolean   |  false  |   | 显示First / Last 按钮 |
|  direction-links |  Boolean  |   |   | 显示  Previous / Next 按钮 |
| total-page  | Number   |  - | 是  | 总页码 |
| max-size  | Number   |  - |  - | 显示所少页 |
| size  | String   | md  |  - | sm / md / lg 大中小三种 |



#### Events 


| 名称      | 参数          | 描述      |
|---------- |-------------- |---------- |
| change   |  index  | 返回当前页码|
