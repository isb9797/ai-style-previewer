import {defineStore} from "pinia";


const STORE_NAME = 'editor'
export const useEditorStore = defineStore(STORE_NAME, () => {


    const components = ref([
        {
            id: 0,
            type: 'block',
            content: 'Тестовый блок',
            style: '.block {\n' +
                '  background-color: #000;\n' +
                '  text-align: center;\n' +
                '  color: orange;\n' +
                '}',
        },
        {
            type: 'string',
            content: 'Тестовая строка',
        }
    ]);

    const code = `
.test {
    color: orange;
}
    `

    const css = '';

    const classes = [];

    function updateCode() {
        classes.forEach((item, index) => {
            console.log(index, item);
            components[index] = {type: item, content: 'ТЕКСТ'};
        })
    }

    return {components, code, css, classes, updateCode}
})