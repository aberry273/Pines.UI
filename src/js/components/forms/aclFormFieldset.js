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
            this.$watch('mxForm_fields', (newVal, oldVal) => {
                console.log(newVal);
                //this.render();
            })
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxForm_fields = params.fields;
        },
        onFieldChange(field) {
            this.$dispatch('onfieldchange', field)
        },
        getFieldComponent(field) {
            const fieldType = field.component || field.type;
            switch(fieldType)
            {
                case 'aclFieldSelect':
                    return 'aclFieldSelect'
                case 'aclFieldSelectCheckbox':
                    return 'aclFieldSelectCheckbox'
                case 'aclFieldContentEditable':
                    return 'aclFieldContentEditable'
                case 'aclFieldFile':
                    return 'aclFieldFile'
            }
        },
        // redundant
        renderField(field) {
            const component = field.component || 'aclFieldInput'
            return `${component}(field)`
        },
        getFieldKey(field) {
            const key = field.id || field.name;
            return `${key}:${field.updated}`;
        },
        render() {
            const html = `
                <template x-for="(field, i) in mxForm_fields" :key="getFieldKey(field)">
                    <div >
                        <label x-cloak :for="field.id || field.name" class="relative" x-show="!field.hidden">
                            <span x-show="field.label" class="font-medium text-gray-900" x-text="field.label"></span>
                            
                            <template x-if="field.component == 'aclFieldInput'">
                                <div x-data="aclFieldInput(field)" @oninputchange="(ev) => { onFieldChange(ev.detail) }"></div>
                            </template>
                            <template x-if="field.component == 'aclFieldTextarea'">
                                <div x-data="aclFieldTextarea(field)" @oninputchange="(ev) => { onFieldChange(ev.detail) }"></div>
                            </template>
                            <template x-if="field.component == 'aclFieldSelect'">
                                <div x-data="aclFieldSelect(field)" @oninputchange="(ev) => { onFieldChange(ev.detail) }"></div>
                            </template>
                            <template x-if="field.component == 'aclFieldSelectCheckbox'">
                                <div x-data="aclFieldSelectCheckbox(field)" @oninputchange="(ev) => { onFieldChange(ev.detail) }"></div>
                            </template>
                            <template x-if="field.component == 'aclFieldContentEditable'">
                                <div x-data="aclFieldContentEditable(field)" @oninputchange="(ev) => { onFieldChange(ev.detail) }"></div>
                            </template>
                            <template x-if="field.component == 'aclFieldEditorJs'">
                                <div x-data="aclFieldEditorJs(field)" @oninputchange="(ev) => { onFieldChange(ev.detail) }"></div>
                            </template>
                            <template x-if="field.component == 'aclFieldFile'">
                                <div x-data="aclFieldFile(field)" @oninputchange="(ev) => { onFieldChange(ev.detail) }"></div>
                            </template>
                            
                            <div x-show="field.helperText != null && field.helperText.length > 0">
                                <small x-text="field.helperText"></small>
                            </div>
                        </label>
                    </div>
                </template>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}