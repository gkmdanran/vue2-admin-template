<template>
  <div class="home">
    <ez-query-template
      :panel-json="panelJson"
      :search.sync="queryForm"
      :pagination.sync="pageForm"
      :tableTotal="total"
      :tableData="tableList"
      containerColor="#ccc"
      @refreshTable="getTableList"
      ref="query"
    >
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
export default {
  name: "Home",
  components: {},
  data() {
    return {
      panelJson: {
        breadcrumb:{
          separatorClass:'el-icon-edit',
          separator:'22',
          navigations:[
            {name:'222'},
            {name:'3333'}
          ]
        },
        search: {
          setting: {
            searchItems: {
              username: {
                label: "用户姓名",
                type: "input",
                isTrim: true,
              },
              sex: {
                label: "性别",
                type: "select",
                selectOptions: [
                  { label: "男", value: 1 },
                  { label: "女", value: 0 },
                ],
              },
            },
            layout: "310px",
          },
        },
        table: {
          setting: {
            columns: [
              {
                type: "selection",
              },
              {
                label: "用户姓名",
                prop: "username",
                width: "160px",
              },
              {
                label: "备注",
                slotName: "desc",
              },
              {
                label: "爱好",
                slotName: "hobby",
              },
              {
                label: "操作",
                slotName: "handler",
                width: "140px",
              },
            ],
          },
          bindAttrs: {
            border: true,
          },
        },
        pagination: {
          paginationProps: {
            size: "pageSize",
          },
        },
      },
      queryForm: {
        username: "",
        sex: "",
      },
      tableList: [],
      total: 0,
      pageForm: {
        page: 1,
        pageSize: 2,
      },
    };
  },
  methods: {
    clear() {
      this.$refs.query.table.clearSelection();
    },
    getTableList(a) {
      this.total = 5;
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
      alert(2333);
    },
  },
};
</script>
