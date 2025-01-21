import {defineStore} from "pinia";


const STORE_NAME = 'editor'
export const useEditorStore = defineStore(STORE_NAME, () => {


    const components = [
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
            id: 1,
            type: 'string',
            content: 'Тестовая строка',
            style: '.string {\n' +
                '  background-color: #000;\n' +
                '  text-align: center;\n' +
                '  color: blue;\n' +
                '}',
        }
    ];

    const code = `
.test {
    color: orange;
}
    `

    const css = '';

    const classes = [];

    return {components, code, css, classes}
})