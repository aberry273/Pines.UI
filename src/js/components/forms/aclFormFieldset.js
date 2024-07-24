import { mxContent, mxForm } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxForm(params),
        // PROPERTIES 
        // INIT
        init() {
            this.mxForm_fields = params.fields;
            this.render();
        },
        // GETTERS
        // METHODS
        onFieldChange(ev) {
            this.$dispatch('onfieldchange', ev.detail)
        },
        render() {
            const html = `
                <template x-for="(field, i) in mxForm_fields" :key="field.id || field.name+i || i">
                    <label :for="field.id || field.name" class="relative" x-show="!field.hidden">
                        <span class="font-medium text-gray-900" x-text="field.label || field.name"></span>
                        <div x-data="aclInputField(field)" @oninputchange="onFieldChange"></div>
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