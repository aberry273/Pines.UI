import { mxContent, mxForm } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxContent(params),
        ...mxForm(params),
        // PROPERTIES
        header: '',
        // INIT
        init() {
            this._mxForm_SetValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        updateField(ev) {
            const field = ev.detail;
            this._mxForm_SetFieldValue(this.mxForm_fields, field);
        },
        getPayload() {
            return !this.mxForm_isFile
                ? this._mxForm_GetFormData({ fields: this.mxForm_fields })
                : this._mxForm_GetFileFormData({ fields: this.mxForm_fields });
        },
        async submit() {
            // else
            this.loading = true;
            try {
                const payload = this.getPayload();
                // if overwriting the submit function
                if (this.mxForm_submit) {
                    this.mxForm_submit(payload);
                    return;
                }
                const result =
                    !this.mxForm_isFile
                        ? await this._mxForm_SubmitAjaxRequest(this.mxForm_method, this.mxForm_action, payload)
                        : await this._mxForm_SubmitAjaxRequest(this.mxForm_method, this.mxForm_action, payload, this.mxForm_FileFormHeaders, false)
                if (result.status == 200) {
                    this.mxForm_responseClass = this.mxForm_successResponseClass;
                }
                this.mxForm_response = result.message;
                
                if (this.event) {
                    this.$dispatch(this.event, result)
                }
                this.$dispatch(this.localEvent, result)

            } catch (e) {
                console.log(e);
            }
            this.loading = false;
        },
        render() {
            const html = `
                <div :class="mxForm_class">
                    <template x-if="mxContent_title">
                        <h4 :class="mxContent_titleClass" x-text="mxContent_title"></h4>
                    </template>
                    <template x-if="mxContent_subtitle">
                        <p :class="mxContent_subtitleClass" x-text="mxContent_subtitle"></p>
                    </template>
                    <template x-if="mxContent_text">
                        <p :class="mxContent_textClass" x-text="mxContent_text"></p>
                    </template>
                    <div novalidate class="group relative w-full space-y-8">
                        <!--Fields-->
                        <div x-data="aclFormFieldset({ fields: mxForm_fields })" @onfieldchange="updateField"></div>
                        <!--Response message-->
                        <template x-if="mxForm_response">
                            <p :class="mxForm_responseClass" x-text="mxForm_response"></p>
                        </template>
                        <!--Submit-->
                        <div class="relative">
                            <button 
                                @click="await submit()"
                                x-text="mxForm_label" 
                                :class="mxForm_submitClass"
                            />
                        </div>
                    </div>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}