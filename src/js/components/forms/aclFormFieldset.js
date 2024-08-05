import { mxContent, mxForm } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxForm(params),
        // PROPERTIES 
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxForm_fields = params.fields;
        },
        onFieldChange(ev) {
            this.$dispatch('onfieldchange', ev.detail)
        },
        getFieldComponent(field) {
            const fieldType = field.component || field.type;
            switch(fieldType)
            {
                case 'aclFieldSelect':
                    return 'aclFieldSelect'
                case 'text', 'email', 'password', 'textarea':
                    return 'aclFieldInput'
                case 'select':
                    return 'aclFieldSelect'
                default:
                    return 'aclFieldInput'
            }
        },
        /*
        renderField(field) {
            const filePath = `/src/js/components/fields/${this.getFieldComponent(field.type)}.js`
            return fetch(filePath).then(r => r.text()).then(html => {
                console.log(html);
                return html
            })
        },
        */
        renderField(field) {
            return 'aclFieldInput(field)'
        },
        render() {
            const self = this;
            const htmlFields = this.mxForm_fields.map(x => {
                const component = self.getFieldComponent(x);
                return `<div x-data="${component}(field)" @oninputchange="onFieldChange"></div>`
            })
            const fieldHtml = htmlFields.join('\n');

            console.log(fieldHtml)
            const html = `
                <template x-for="(field, i) in mxForm_fields" :key="field.id || field.name+i || i">
                    <label :for="field.id || field.name" class="relative" x-show="!field.hidden">
                        <span class="font-medium text-gray-900" x-text="field.label || field.name"></span>
                        <div x-data="aclFieldInput(field)" @oninputchange="onFieldChange"></div>
                        <div x-show="field.helperText != null && field.helperText.length > 0">
                            <small x-text="field.helperText"></small>
                        </div>
                    </label>
                </template>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}