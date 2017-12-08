/**
* @file
* @author 程亮
* @date 2017/11/06
*/
<template>
	<div class="tree" :class="model.permissions.length < 1 ? 'flex' : ''">
        <div class="nodeItem" :class="{bold: isFolder}"
                    @click="toggle"
                    @dblclick="changeType"
                    v-if="model.permissions.length">
            <span class="showorhide" 
            v-if="isFolder"
            :class="model.permissions.length < 1 ? 'visibility' : ''">{{open ? '-' : '+'}}</span>
						<t-checkbox @change="parentCheckAllChange" v-model="parentCheck">全选</t-checkbox>
            {{model.name}}
        </div>
        <ul v-show="open"
            v-if="model.permissions.length">
            <li class="tree-li" v-for="(model, index) in model.permissions">
              <div class="model-name">{{model.name}}</div>
								<!-- <b-checkbox v-model="model.isCheckAll" 
                            @change="handleCheckAllChange(index, $event)" 
                            class="check-class" 
                            v-if="model.permission && model.permission.length">全选</b-checkbox> -->
                <t-checkbox v-model="model.isCheckAll" 
                            @change="handleCheckAllChange(index, $event, 'more')" 
                            class="check-class"
                            v-if="model.permissions.length">全选</t-checkbox>
                <t-checkbox v-else
                            v-model="model.isCheckAll" 
                            @change="handleCheckAllChange(index, $event, 'singel')" 
                            class="check-class"></t-checkbox>            
								<t-checkbox-group v-model="model.checkedRoles" :index="index" @change="handleCheckedRolesChange">
                	<t-checkbox v-for="(role, index) in model.permissions.data" :label="role.id" :key="role.name">{{role.name}}</t-checkbox>
              	</t-checkbox-group>
            </li>
        </ul>
        <!-- <div v-else class="special-role">
          <b-checkbox-group v-model="model.permissions[0].checkedRoles" @change="handleChange">
            <b-checkbox v-for="role in model.permissions[0].parentData" :label="role.id" :key="role.name">{{role.name}}</b-checkbox>
          </b-checkbox-group>
        </div> -->
	</div>
</template>

<script>

import {TCheckbox, TCheckboxGroup} from '../../checkbox/index'

export default {
  components: {
    TCheckbox,
    TCheckboxGroup
  },
  name: 'treeNode',
  props: {
    model: Object
  },
  data: function() {
    return {
      open: false,
      checkAll: '',
      isChecked: true,
      parentCheck: false,
      checkArr: []
    }
  },
  computed: {
    isFolder: function() {
      return this.model.permissions && this.model.permissions.length
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function() {
      if (!this.isFolder) {
        this.$set(this.model, 'children', [])
        this.open = true
      }
    },
    // 最外层全选
    parentCheckAllChange(event) {
      if(this.model.permissions.length < 1) {
        let idArr = []
        this.model.permissions[0].parentData.forEach((item, index) => {
          idArr.push(item.id)
        })
        this.model.permissions[0].checkedRoles = event.target.checked ? idArr : []
        this.model.permissions[0].isCheckAll = event.target.checked
        return
      }
      let that = this
      this.open = event.target.checked ? this.isChecked : this.open
      this.model.permissions.forEach((item, index) => {
        item.isCheckAll = event.target.checked ? that.isChecked : !that.isChecked
        let idArr = []
        if(item.permissions.data.length) {
          item.permissions.data.forEach((item, index) => {
            idArr.push(item.id)
          })
        } else {
          idArr.push(item.id)
        }
        item.checkedRoles = event.target.checked ? idArr : []
      })
    },
    // 模块全选
    handleCheckAllChange(index, event, type) {
      let that = this
      let idArr = []
      this.checkArr = []
      this.model.permissions[index].permissions.data.forEach((item, index) => {
        idArr.push(item.id)
      })
      if(type === 'singel') {
        idArr.push((this.model.permissions[index].id))
      }
      this.model.permissions[index].checkedRoles = event.target.checked ? idArr : []
      this.model.permissions.forEach((item, index) => {
        if(item.isCheckAll) {
          that.checkArr.push(true)
        }
      })
      this.parentCheck = this.checkArr.length === this.model.permissions.length
    },
    // 单个选择
    handleCheckedRolesChange(value, index) {
      let checkedCount = value.length
      let that = this
      this.checkArr = []
      this.model.permissions[index].isCheckAll = checkedCount === this.model.permissions[index].permissions.data.length
      this.model.permissions.forEach((item, index) => {
        if(item.isCheckAll) {
          that.checkArr.push(true)
        }
      })
      this.parentCheck = this.checkArr.length === this.model.permissions.length
    },
    handleChange(value) {
      this.parentCheck = this.model.permissions[0].isCheckAll = value.length === this.model.permissions[0].parentData.length
    }
  }
}
</script>

<style lang="less" scoped>
li,
ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item {
  cursor: pointer;
}
ul {
  padding-left: 25px;
  line-height: 1.5em;
  list-style-type: dot;
}
.showorhide {
  border: 1px solid #333333;
  width: 16px;
  height: 16px;
  display: inline-block;
  line-height: 14px;
  text-align: center;
  margin-right: 5px;
}
.nodeItem {
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #333333;
}

.tree-li {
  display: flex;
  font-size: 14px;
  color: #333333;
  line-height: 30px;
}
.check-class {
  padding-left: 119px;
}
.tree-li {
  .model-name {
    height: 30px;
    position: absolute;
    width: 109px;
    text-align: right;
  }
}

.visibility {
  visibility: hidden;
}

.flex {
  display: flex;
}

.tree {
  color: #333333;
  
  .special-role {
    padding-left: 11px;
  }
}
</style>	