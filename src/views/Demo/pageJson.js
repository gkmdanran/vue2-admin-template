export const panelJson = {
    search: {
        setting: {
            searchItems: {
                username: {
                    label: '用户姓名',
                    type: 'input',
                    isTrim: true,
                },
                sex: {
                    label: '性别',
                    type: 'select',
                    selectOptions: [
                        { label: '男', value: 1 },
                        { label: '女', value: 0 },
                    ]
                },

            },
            layout: "310px"
        },
    },
    table: {
        setting: {
            columns: [
                {
                    label: '用户姓名',
                    prop: 'username',
                    width: '160px'
                },
                {
                    label: '备注',
                    slotName: 'desc',
                },
                {
                    label: '爱好',
                    slotName: 'hobby',
                },
                {
                    label: '操作',
                    slotName: 'handler',
                    width: '140px'
                }
            ]
        },
        bindAttrs: {
            border: true
        }
    },
    pagination: {
        paginationProps: {
            size: "pageSize"
        },
    }

}