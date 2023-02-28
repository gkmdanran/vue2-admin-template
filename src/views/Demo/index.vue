<template>
  <div class="demo-page">
    <ez-query-template
      :panel-json="panelJson"
      :search.sync="queryForm"
      :pagination.sync="pageForm"
      :tableTotal="total"
      :tableData="tableList"
      containerColor="#fff"
      @refreshTable="getTableList"
    >
      <template #searchButton>
        <el-button plain @click="exportFile">导 出</el-button>
      </template>
      <template #desc="scope">
        <ez-collapse-text :text="scope.row.desc" :limit="5"></ez-collapse-text>
      </template>
      <template #hobby="scope">
        <ez-collapse-list :data="scope.row.hobby" :limit="1">
          <template #default="scope">
            <span>{{ scope.index + 1 }}、</span>
            <span>类型：{{ scope.item.type }}:</span>
            <span>详细：{{ scope.item.desc }}</span>
          </template>
        </ez-collapse-list>
      </template>
      <template #handler="scope">
        <ez-button
          type="text"
          :confirm="{ message: '确认删除吗？' }"
          @confirmClick="confirmDel()"
          >删除
        </ez-button>
      </template>
    </ez-query-template>
  </div>
</template>

<script>
import { panelJson } from "./pageJson";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      panelJson: panelJson,
      queryForm: {
        username: "",
        sex: "",
      },
      tableList: [],
      total: 0,
      pageForm: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    getTableList() {
      this.total = 1;
      this.tableList = [
        {
          username: "test01",
          desc: "这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述",
          hobby: [
            {
              type: "运动",
              desc: "我喜欢运动",
            },
            {
              type: "美食",
              desc: "我喜欢美食",
            },
          ],
        },
      ];
    },
    confirmDel() {
      this.$message({
        type: "success",
        message: "删除成功",
      });
      this.getTableList();
    },
    exportFile() {},
  },
};
</script>
