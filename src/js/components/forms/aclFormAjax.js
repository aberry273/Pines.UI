import { mxContent, mxForm } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxForm(params),
        // PROPERTIES
        header: '',
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxContent_title = params.title;
            this.mxContent_subtitle = params.subtitle;
            this.mxContent_text = params.text;
            this.mxForm_formClass = params.class || this.mxForm_formClass;
            this.mxForm_fields = params.fields;
            this.mxForm_method = params.method;
            this.mxForm_action = params.action;
            this.mxForm_buttonLabel = params.buttonLabel || this.mxForm_buttonLabel;
        },
        updateField(ev) {
            const field = ev.detail;
            this._mxForm_SetFieldValue(this.mxForm_fields, field);
        },
        async submit() {
            this.loading = true;
            try {
                const payload = this._mxForm_GetFormData( { fields: this.mxForm_fields } ); 
                const result = await this._mxForm_SubmitAjaxRequest(this.mxForm_action, this.mxForm_method, payload);
            if(this.event) {
                this.$dispatch(this.event, result)
            }
            this.$dispatch(this.localEvent, result)
            
            } catch(e) {
                console.log(e);
            }
            this.loading = false;
        },
        render() {
            const html = `
                <div :class="mxForm_formClass">
                    <h4 :class="mxContent_titleClass" x-text="mxContent_title"></h4>
                    <p :class="mxContent_textClass" x-text="mxContent_text"></p>
                    <form novalidate class="group relative w-full mt-10 space-y-8">
                        <!--Fields-->
                        <div x-data="aclFormFieldset({ fields: mxForm_fields })" @onfieldchange="updateField"></div>
                        <!--Submit-->
                        <div class="relative">
                            <button type="button" @click="submit" role="button" x-text="mxForm_buttonLabel" :class="mxForm_submitClass + ' '+ mxForm_submitInvalidClass" />
                        </div>
                    </form>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}