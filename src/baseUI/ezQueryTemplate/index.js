import ezQueryTemplate from "./src/index.vue";
ezQueryTemplate.install = function(Vue) {
  Vue.component(ezQueryTemplate.name, ezQueryTemplate);
};
export default ezQueryTemplate;
