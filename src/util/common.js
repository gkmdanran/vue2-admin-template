import { Message } from "element-ui";

export function copy(txt) {
    var inputTest = document.createElement("input");
    inputTest.value = txt;
    document.body.appendChild(inputTest);
    inputTest.select();
    document.execCommand("Copy");
    inputTest.className = "oInput";
    inputTest.style.display = "none";
    Message({
        type: 'success',
        message: '复制成功'
    })
    inputTest.parentNode.removeChild(inputTest);
}
export function commonDownload(file, fileName) {
    if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");
        elink.style.display = "none";
        if (fileName) {
            elink.download = fileName;
        }
        if (typeof file == "string") {
            elink.href = file;
        } else {
            elink.href = URL.createObjectURL(file);
        }
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
    } else {
        navigator.msSaveBlob(file, fileName);
    }
}
/* 
arr:校验是否重复的目标数组
key:校验数组中对象key下有没有重复的值
value:校验数组中对象key下的value有没有重复
filter:filter值不算入判重
ignoreCase:校验重复时，是否忽略大小写
*/
export function isRepeat(
    arr,
    key = null,
    value = null,
    filter = "",
    ignoreCase = false
) {
    value =
        typeof value === "string" && ignoreCase ? value.toLocaleLowerCase() : value;
    filter =
        typeof filter === "string" && ignoreCase
            ? filter.toLocaleLowerCase()
            : filter;

    if (key === null) {
        //数组每一项是string或者number类型
        arr = [...arr].map(item =>
            typeof item === "string" && ignoreCase ? item.toLocaleLowerCase() : item
        );
        if (value === null) {
            arr = arr.filter(item => item !== filter);
            return !(new Set(arr).size === arr.length);
        } else {
            let newLength = arr.filter(item => item !== value).length;
            return arr.length - newLength > 1;
        }
    } else {
        //数组每一项是对象
        let map = {};
        arr.forEach(item => {
            if (key) {
                let mapKey =
                    typeof item[key] === "string" && ignoreCase
                        ? item[key].toLocaleLowerCase()
                        : item[key];
                map.hasOwnProperty(mapKey)
                    ? (map[mapKey] = true)
                    : (map[mapKey] = false);
            }
        });
        if (value === null) {
            for (let key in map) {
                if (key !== filter && map[key] === true) return true;
            }
            return false;
        } else {
            return value === filter ? false : !!map[value];
        }
    }
}