<template>
   
        <el-container style="margin-top: 40px;">
            <el-aside width="auto">
                <el-cascader-panel :options="options" style="height: 100vh;" />
            </el-aside>
            <el-main>

            </el-main>
        </el-container>
    
</template>


<script>
export default {
    data() {
        return {
            selectedValue: [],

            options: [
                {
                    value: 'guide',
                    label: 'Guide',
                    children: [
                        {
                            value: 'disciplines',
                            label: 'Disciplines',
                            
                        },
                        {
                            value: 'navigation',
                            label: 'Navigation',
                            
                        },
                    ],
                },
                {
                    value: 'component',
                    label: 'Component',
                    children: [
                        {
                            value: 'basic',
                            label: 'Basic',
                            children: [
                                {
                                    value: 'layout',
                                    label: 'Layout',
                                },
                                {
                                    value: 'color',
                                    label: 'Color',
                                },
                                {
                                    value: 'typography',
                                    label: 'Typography',
                                },
                                {
                                    value: 'icon',
                                    label: 'Icon',
                                },
                                {
                                    value: 'button',
                                    label: 'Button',
                                },
                            ],
                        },
                        {
                            value: 'form',
                            label: 'Form',
                            children: [
                                {
                                    value: 'radio',
                                    label: 'Radio',
                                },
                                {
                                    value: 'checkbox',
                                    label: 'Checkbox',
                                },
                                {
                                    value: 'input',
                                    label: 'Input',
                                },
                                {
                                    value: 'input-number',
                                    label: 'InputNumber',
                                },
                                {
                                    value: 'select',
                                    label: 'Select',
                                },
                                {
                                    value: 'cascader',
                                    label: 'Cascader',
                                },
                                {
                                    value: 'switch',
                                    label: 'Switch',
                                },
                                {
                                    value: 'slider',
                                    label: 'Slider',
                                },
                                {
                                    value: 'time-picker',
                                    label: 'TimePicker',
                                },
                                {
                                    value: 'date-picker',
                                    label: 'DatePicker',
                                },
                                {
                                    value: 'datetime-picker',
                                    label: 'DateTimePicker',
                                },
                                {
                                    value: 'upload',
                                    label: 'Upload',
                                },
                                {
                                    value: 'rate',
                                    label: 'Rate',
                                },
                                {
                                    value: 'form',
                                    label: 'Form',
                                },
                            ],
                        },
                        {
                            value: 'data',
                            label: 'Data',
                            children: [
                                {
                                    value: 'table',
                                    label: 'Table',
                                },
                                {
                                    value: 'tag',
                                    label: 'Tag',
                                },
                                {
                                    value: 'progress',
                                    label: 'Progress',
                                },
                                {
                                    value: 'tree',
                                    label: 'Tree',
                                },
                                {
                                    value: 'pagination',
                                    label: 'Pagination',
                                },
                                {
                                    value: 'badge',
                                    label: 'Badge',
                                },
                            ],
                        },
                        {
                            value: 'notice',
                            label: 'Notice',
                            children: [
                                {
                                    value: 'alert',
                                    label: 'Alert',
                                },
                                {
                                    value: 'loading',
                                    label: 'Loading',
                                },
                                {
                                    value: 'message',
                                    label: 'Message',
                                },
                                {
                                    value: 'message-box',
                                    label: 'MessageBox',
                                },
                                {
                                    value: 'notification',
                                    label: 'Notification',
                                },
                            ],
                        },
                        {
                            value: 'navigation',
                            label: 'Navigation',
                            children: [
                                {
                                    value: 'menu',
                                    label: 'Menu',
                                },
                                {
                                    value: 'tabs',
                                    label: 'Tabs',
                                },
                                {
                                    value: 'breadcrumb',
                                    label: 'Breadcrumb',
                                },
                                {
                                    value: 'dropdown',
                                    label: 'Dropdown',
                                },
                                {
                                    value: 'steps',
                                    label: 'Steps',
                                },
                            ],
                        },
                        {
                            value: 'others',
                            label: 'Others',
                            children: [
                                {
                                    value: 'dialog',
                                    label: 'Dialog',
                                },
                                {
                                    value: 'tooltip',
                                    label: 'Tooltip',
                                },
                                {
                                    value: 'popover',
                                    label: 'Popover',
                                },
                                {
                                    value: 'card',
                                    label: 'Card',
                                },
                                {
                                    value: 'carousel',
                                    label: 'Carousel',
                                },
                                {
                                    value: 'collapse',
                                    label: 'Collapse',
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'resource',
                    label: 'Resource',
                    children: [
                        {
                            value: 'axure',
                            label: 'Axure Components',
                        },
                        {
                            value: 'sketch',
                            label: 'Sketch Templates',
                        },
                        {
                            value: 'docs',
                            label: 'Design Documentation',
                        },
                    ],
                },
            ]

        };
    },
    methods: {
        fetchTerritories() {
            // API调用获取辖区和对应的文件夹
            // 假设API返回的数据结构如下:
            // [
            //   { id: '1', name: '辖区1', children: [{ name: '2023-01-01' }, { name: '2023-01-02' }] },
            //   { id: '2', name: '辖区2', children: [{ name: '2023-01-03' }, { name: '2023-01-04' }] }
            // ]
            // axios.get('/your-api-endpoint')
            //     .then(response => {
            //         this.options = response.data.map(item => ({
            //             value: item.id,
            //             label: item.name,
            //             children: item.children.map(subItem => ({
            //                 value: subItem.name,
            //                 label: subItem.name
            //             }))
            //         }));
            //     })
            //     .catch(error => {
            //         console.error('Error fetching territories and folders:', error);
            //     });
        },
        handleChange(value) {
            console.log('Selected:', value);
            // 根据选中的值加载对应的内容
            // value是一个数组，例如['1', '2023-01-01']表示选择了辖区1和日期2023-01-01
        }
    },
    mounted() {
        this.fetchTerritories();
    }
};
</script>


<style scoped>
.containner {
    margin-top: 20px;
}

.el-table /deep/ .warning-row td {
    background: rgba(204, 224, 255, 0.477) !important;

}



.el-table /deep/ .error-row {
    background: #fae9e4 !important;
}

.el-cascader-panel {
    height: 600px;
}
</style>
