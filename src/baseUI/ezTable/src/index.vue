<template>
  <div class="ez-table">
    <el-table
      style="width: 100%"
      ref="ezTable"
      v-on="$listeners"
      v-bind="$attrs"
      v-loading="loading"
    >
      <template #append>
        <slot name="ezAppend"></slot>
      </template>
      <el-table-column-tree
        :columnNode="item"
        v-for="(item, index) in tableJson.columns || []"
        :key="index"
      >
        <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </el-table-column-tree>
    </el-table>
    <div class="pagination" v-if="$scopedSlots.ezPagination">
      <slot name="ezPagination"></slot>
    </div>
  </div>
</template>

<script>
import ElTableColumnTree from "./ElTableColumnTree.vue";
export default {
  inheritAttrs: false,
  name: "ezTable",
  props: {
    tableJson: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ElTableColumnTree,
  },
  data() {
    return {
      ezTable: null,
    };
  },
  mounted() {
    this.ezTable = this.$refs.ezTable;
  },
};
</script>
<style lang="less" scoped>
.ez-table {
  /deep/ .el-table td {
    padding: 8px 0;
  }
  /deep/ .el-table__header th {
    color: #636365;
    font-weight: 700;
    background-color: #f7f6f9;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
