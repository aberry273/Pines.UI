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
        renderField(field) {
            console.log(field);

            return 'aclFieldInput(field, i)'
        },
        render() {
            const html = `
                <template x-for="(field, i) in mxForm_fields" :key="field.id || field.name+i || i">
                    <label :for="field.id || field.name" class="relative" x-show="!field.hidden">
                        <span class="font-medium text-gray-900" x-text="field.label || field.name"></span>
                        <!--
                        <div x-data="aclFieldInput(field)" @oninputchange="onFieldChange"></div>
                        -->
                        <label x-html="renderField(field, i)" :for="field.name" x-show="!field.hidden"></label>

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