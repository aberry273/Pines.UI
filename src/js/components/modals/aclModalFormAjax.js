import { mxIcon, mxContent, mxLink, mxModal, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxLink(params),
        ...mxContent(params),
        ...mxIcon(params),
        ...mxModal(params),
        ...mxEvent(params),
        // PROPERTIES
        component: 'aclFormAjax',
        form: {},
        // INIT
        init() {
            this.setValues(params);
            this.setEvents();
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxEvent_event = params.event;
            this.mxContent_title = params.title;
            this.mxModal_component = params.component || 'aclFormAjax';
            this.form = params.form;
            this.mxModal_clickOutside = params.clickOutside;
        },
        setEvents() {
            if (!this.mxEvent_event) return;
            const self = this;
            this._mxEvent_On(this.mxEvent_event, (val) => {
                self.mxModal_open = true;
            })
        },
        render() {
            const html = `
            <div
                @keydown.escape.window="_mxModal_ClickOutside"
                :class="{ 'z-40': mxModal_open }" class="relative w-auto h-auto">
                
                <template x-teleport="body">
                    <div x-show="mxModal_open" class="fixed top-0 left-0 z-[99] flex items-center justify-center w-screen h-screen" x-cloak>
                        <div x-show="mxModal_open"
                            x-transition:enter="ease-out duration-300"
                            x-transition:enter-start="opacity-0"
                            x-transition:enter-end="opacity-100"
                            x-transition:leave="ease-in duration-300"
                            x-transition:leave-start="opacity-100"
                            x-transition:leave-end="opacity-0"
                            @click="mxModal_open=false" class="absolute inset-0 w-full h-full bg-white backdrop-blur-sm bg-opacity-70"></div>
                        <div x-show="mxModal_open"
                            x-transition:enter="ease-out duration-300"
                            x-transition:enter-start="opacity-0 -translate-y-2 sm:scale-95"
                            x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                            x-transition:leave="ease-in duration-200"
                            x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                            x-transition:leave-end="opacity-0 -translate-y-2 sm:scale-95"
                            class="relative w-full py-6 bg-white border shadow-lg px-7 border-neutral-200 sm:max-w-lg sm:rounded-lg">
                                
                                <!-- Modal Content -->
                                <div class="flex items-center justify-between pb-3">
                                    <h3 class="text-lg font-semibold" x-text="mxContent_title"></h3>
                                    <button @click="mxModal_open=false" class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 mt-5 mr-5 text-gray-600 rounded-full hover:text-gray-800 hover:bg-gray-50">
                                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>  
                                    </button>
                                </div>
                                
                                <div x-data="${this.mxModal_component}(form)"></div>
                        </div>
                    </div>
                </template>
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}