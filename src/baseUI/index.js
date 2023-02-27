import ezButton from "./ezButton";
import ezTable from "./ezTable";
import ezCollapseText from "./ezCollapseText";
import ezMenu from "./ezMenu";
import ezSearch from "./ezSearch";
import ezContainer from "./ezContainer";
import ezCollapseList from "./ezCollapseList";
import ezRadioGroup from "./ezRadioGroup";
import ezSwitch from "./ezSwitch";
const components = [
  ezButton,
  ezTable,
  ezCollapseText,
  ezMenu,
  ezSearch,
  ezContainer,
  ezCollapseList,
  ezRadioGroup,
  ezSwitch
];
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default install;
