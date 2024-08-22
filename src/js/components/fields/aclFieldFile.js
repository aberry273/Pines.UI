import { mxField } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxField(params),
        // PROPERTIES
        type: '',
        value: null,
        placeholder: '',
        cssClass: '',
        mediaItems: [],
        // INIT
        init() {
            this.setValues(params);
            this.render(); 
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxField_type = params.type || 'text';
            this.mxField_placeholder = params.placeholder;
            this.mxField_cssClass = params.cssClass;
            this.mxField_id = params.id;
            this.mxField_name = params.name;
            this.mxField_min = params.min;
            this.mxField_max = params.max;
            this.mxField_disabled = params.disabled;
            this.mxField_class = params.class;
            this.mxField_multiple = params.multiple;
            this.mxField_value = params.value;
            this.mxField_required = params.required;
            this.mxField_readOnly = params.readOnly;
            this.mxField_autocomplete = params.autocomplete;
            this.mxField_ariaInvalid = params.ariaInvalid;
            this.mxField_areaDescribedBy = params.areaDescribedBy;
            this.mxField_pattern = params.pattern;
        },
        onChange($ev) {
            const files = Array.from($ev.target.files);
            if(files == null || files.length == 0) return;
            const items = files.map(x => 
            {
                return {
                    type: this.mxField_type,
                    name: x.name,
                    caption: x.name,
                    src: this._mxField_GetFilePreview(x)
                }
            });
            // media items
            this.mediaItems = items;   
            
            if (!this.mxField_multiple) {
                this.mxField_value = files[0]
            } else {
                this.mxField_value = files
            }
            
            this._mxField_onChange();
        },
        removeFile(index) {
            this.mediaItems.splice(index, 1);
            if (!this.mxField_multiple) {
                this.mxField_value = null;
            } else {
                this.mxField_value.splice(index, 1);
            }
        },
        render() {
            const html =  `
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" :for="mxField_id">Upload multiple files</label>
                <input 
                    :id="mxField_id"
                    :name="mxField_name"
                    :aria-invalid="mxField_ariaInvalid"
                    :placeholder="mxField_placeholder"
                    :disabled="mxField_disabled"
                    :min="mxField_min"
                    :max="mxField_max"
                    :max="mxField_max"
                    data-primary="blue-600"
                    data-rounded="rounded-lg"
                    :accept="mxField_max"
                    :class="mxField_cssClass || mxField_inputClass"
                    x-on:change="onChange"
                    type="file" 
                    multiple
                    class="block w-full py-0 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    >

                <span x-text="field.invalidText || 'Invalid input'" class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                </span>

                <!--Grid-->
                <div 
                    class="max-w-6xl mx-auto duration-1000 delay-300 opacity-0 select-none ease animate-fade-in-view" 
                    style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">
                    <ul x-ref="gallery" id="gallery" class="grid grid-cols-2 gap-2 lg:grid-cols-5">
                        <template x-for="(media, index) in mediaItems" :id="media.id">
                            <li>
                                <div 
                                    x-data="aclMedia({
                                        ...media,
                                        controls: false,
                                        canPlay: false,
                                        class: 'object-cover select-none w-full h-auto bg-gray-200 rounded cursor-pointer aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4]'
                                    })"
                                    @click="(ev) => { imageGalleryOpen(index) }">
                                </div>
                                <figcaption x-show="media.caption" x-text="media.caption" class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"></figcaption>
                                <div 
                                    class="justify-center z-10"
                                    x-data="aclButton({ text: 'Remove file'})"
                                    @click="(ev) => {
                                        ev.preventDefault();
                                        removeFile(index);
                                    }"
                                ></div>
                            </li>
                        </template>
                    </ul>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}