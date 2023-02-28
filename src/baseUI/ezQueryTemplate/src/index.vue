<template>
  <div class="ez-query-template">
    <div class="breadcrumb" ref="bread">
      <slot name="breadTop"></slot>
      <el-breadcrumb v-bind="getBreadcrumbAttrs()" v-if="panelJson.breadcrumb">
        <el-breadcrumb-item
          v-for="(nav, navIndex) in panelJson.breadcrumb.navigations || []"
          :key="navIndex"
          :to="'path' in nav ? nav.path : undefined"
          :replace="'replace' in nav ? nav.replace : false"
        >
          {{ nav.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <slot name="breadBottom"></slot>
    </div>
    <div
      class="container-box"
      :style="`height:calc(100% - ${breadHeight}px);background: ${containerColor};`"
    >
      <slot name="containerTop"></slot>
      <ez-search
        v-if="panelJson.search"
        :search-json="panelJson.search.setting || {}"
        v-bind="panelJson.search.bindAttrs"
        :value="search"
        @input="emitSearchForm"
        @change="changeSearchForm"
      >
        <template #searchButton>
          <slot name="searchButton"></slot>
        </template>
      </ez-search>
      <slot name="tableTop"></slot>
      <ez-table
        ref="panelTable"
        v-if="panelJson.table"
        :table-json="panelJson.table.setting || {}"
        :data="tableData"
        v-bind="panelJson.table.bindAttrs"
      >
        <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </ez-table>
      <slot name="tableBottom"></slot>
      <div class="pagination" v-if="panelJson.pagination">
        <el-pagination
          v-bind="panelJson.pagination.bindAttrs"
          :current-page="pagination[pageKey]"
          :page-size="pagination[sizeKey]"
          :layout="
            panelJson.pagination.bindAttrs &&
            panelJson.pagination.bindAttrs.layout
              ? panelJson.pagination.bindAttrs.layout
              : 'total, prev, pager, next'
          "
          :total="tableTotal"
          @current-change="changeCurrentPage"
          @size-change="changePageSize"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
        />
      </div>
      <slot name="containerBottom"></slot>
    </div>
  </div>
</template>
<script>
import ezSearch from "../../ezSearch";
import ezTable from "../../ezTable";
export default {
  name: "ezQueryTemplate",
  components: {
    ezSearch,
    ezTable,
  },
  props: {
    panelJson: {
      type: Object,
      default: function () {
        return {};
      },
    },
    search: {
      type: Object,
    },
    pagination: {
      type: Object,
    },
    tableTotal: {
      type: Number,
      default: 0,
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    containerColor: {
      type: String,
      default: "transparent",
    },
  },

  data() {
    return {
      breadHeight: 0,
    };
  },
  computed: {
    pageKey() {
      if (
        this.panelJson.pagination &&
        this.panelJson.pagination.paginationProps &&
        this.panelJson.pagination.paginationProps.page
      ) {
        return this.panelJson.pagination.paginationProps.page;
      } else {
        return "page";
      }
    },
    sizeKey() {
      if (
        this.panelJson.pagination &&
        this.panelJson.pagination.paginationProps &&
        this.panelJson.pagination.paginationProps.size
      ) {
        return this.panelJson.pagination.paginationProps.size;
      } else {
        return "size";
      }
    },
  },
  methods: {
    getBreadcrumbAttrs() {
      const separator = this.panelJson.breadcrumb.separator || "/";
      const separatorClass = this.panelJson.breadcrumb.separatorClass;
      return {
        separator,
        separatorClass
      };
    },
    emitSearchForm(form) {
      this.$emit("update:search", form);
    },
    changeSearchForm(form) {
      this.$emit("changeSearch", form);
      this.$emit("update:pagination", {
        ...this.pagination,
        [this.pageKey]: 1,
      });
      this.refreshTableData(
        { ...form },
        { ...this.pagination, [this.pageKey]: 1 }
      );
    },
    changeCurrentPage(page) {
      this.$emit("update:pagination", {
        ...this.pagination,
        [this.pageKey]: page,
      });
      this.$emit("changePagination", {
        ...this.pagination,
        [this.pageKey]: page,
      });
      this.$emit("currentChange", page);
      this.refreshTableData(
        { ...this.search },
        { ...this.pagination, [this.pageKey]: page }
      );
    },
    changePageSize(size) {
      this.$emit("update:pagination", {
        ...this.pagination,
        [this.sizeKey]: size,
      });
      this.$emit("changePagination", {
        ...this.pagination,
        [this.sizeKey]: size,
      });
      this.$emit("sizeChange", size);
      thnis.refreshTableData(
        { ...this.search },
        { ...this.pagination, [this.sizeKey]: size }
      );
    },
    handlePrevClick(page) {
      this.$emit("prevClick", page);
    },
    handleNextClick(page) {
      this.$emit("nextClick", page);
    },
    refreshTableData(search, pagination) {
      let searchForm = this.panelJson.search ? search : null;
      let paginationForm = this.panelJson.pagination ? pagination : null;
      let combine = { ...searchForm, ...paginationForm };
      this.$emit("refreshTable", {
        combine,
        search: searchForm,
        pagination: paginationForm,
      });
    },
  },
  created() {
    this.refreshTableData({ ...this.search }, { ...this.pagination });
  },
  mounted() {
    this.breadHeight = this.$refs.bread.offsetHeight;
    this.table = this.$refs.panelTable.ezTable;
  },
};
</script>
<style scoped>
.ez-query-template {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.el-breadcrumb {
  padding-bottom: 15px;
}

.container-box {
  box-sizing: border-box;
  padding: 15px;
  color: #666;
}

.ez-search,
.ez-table {
  padding-top: 5px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.el-pagination ::v-deep(.btn-next),
.el-pagination ::v-deep(.btn-prev) {
  background-color: transparent;
}

.el-pagination ::v-deep(.el-pager li) {
  background-color: transparent;
}
</style>