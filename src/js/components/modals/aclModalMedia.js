import { mxIcon, mxContent, mxLink, mxModal, mxMedia, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxLink(params),
        ...mxContent(params),
        ...mxIcon(params),
        ...mxModal(params),
        ...mxMedia(params),
        ...mxEvent(params),
        // PROPERTIES 
        // INIT
        init() {
            this.setValues(params);
            this.setEvents();
            this.render();
            this.$watch('mxModal_open', function(value){
                if(value === true){
                    document.body.classList.add('overflow-hidden');
                }else{
                    document.body.classList.remove('overflow-hidden');
                }
            })
        },
        // GETTERS 
        // METHODS
        setValues(params) {
            this.mxEvent_event = params.event || this.mxEvent_event;
            this.mxMedia_alt = params.alt || this.mxMedia_alt;
            this.mxModal_clickOutside = params.clickOutside || this.mxModal_clickOutside;
            this.mxModal_eventNext = params.eventNext || this.mxModal_eventNext;
            this.mxModal_eventPrev = params.eventPrev || this.mxModal_eventPrev;
            this.setMediaValues(params);
        },
        setMediaValues(params) {
            this.mxContent_title = params.title || this.mxContent_title;
            this.mxContent_text = params.text || this.mxContent_text;
            this.mxMedia_src = params.src || this.mxMedia_src;
            this.mxMedia_alt = params.alt || this.mxMedia_alt;
            this.mxModal_showNext = params.showNext;
            this.mxModal_showPrev = params.showPrev;
        },
        setEvents() {
            if (!this.mxEvent_event) return;
            const self = this;
            this._mxEvent_On(this.mxEvent_event, (val) => {
                self.setMediaValues(val);
                self.mxModal_open = true;
            })
        },
        render() {
            const html = `
                <template x-teleport="body" >
                    <div 
                        x-show="mxModal_open"
                        x-transition:enter="transition ease-out duration-100"
                        x-transition:enter-start="opacity-0"
                        x-transition:enter-end="opacity-100"
                        x-transition:leave="transition ease-in duration-100"
                        x-transition:leave-start="opacity-100"
                        x-transition:leave-end="opacity-0"
                        class="flex fixed top-0 left-0  inset-0 z-[99] w-screen h-screen bg-white overscroll-none">
                        <span 
                            @onClick="mxModal_open=false;"
                            x-data="aclButton({ 
                                icon: 'close', 
                                class: 'absolute top-0 right-4 z-30 flex items-center justify-center px-3 py-2 mt-3 mr-3 space-x-1 text-xs font-medium uppercase border rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                            })">
                        </span>

                        <div class="relative flex flex-wrap items-center w-full h-full px-8">
                            <div class="relative w-full h-full mx-auto lg:mb-0">
                                <div class="relative justify-center text-center">
                                    <div class="flex flex-col mb-6 space-y-2">
                                        <h1 class="text-2xl font-semibold tracking-tight" x-text="mxContent_title"></h1>
                                        <p class="text-sm text-neutral-500" x-text="mxContent_text"></p>
                                    </div> 
                                </div>
                                <div class="relative w-auto pb-8 w-full h-full justify-center text-center">
                                    <div x-data="aclMediaImage({
                                        src: this.mxMedia_src,
                                        alt: this.mxMedia_alt,
                                        class: 'select-none h-auto w-auto bg-gray-200 rounded cursor-pointer'
                                    })"></div>
                                    <figcaption class="flex h-max-full items-top justify-center">
                                        <img :src="mxMedia_src" class="select-none h-auto w-auto bg-gray-200 rounded cursor-pointer" /> 
                                    </figcaption>
                                </div>
                            </div>
                            
                            <!-- Prev -->
                            <span
                                x-show="mxModal_showPrev"
                                @click="_mxEvent_Emit(mxModal_eventPrev)"
                                x-data="aclButton({ 
                                    icon: 'chevronLeft', 
                                    class: 'absolute left-4 z-30 flex items-center justify-center px-3 py-2 mt-3 mr-3 space-x-1 text-xs font-medium uppercase border rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                                })">
                            </span>
                            <!-- Next -->
                            <span 
                                x-show="mxModal_showNext"
                                @click="_mxEvent_Emit(mxModal_eventNext)" 
                                x-data="aclButton({ 
                                    icon: 'chevronRight', 
                                    class: 'absolute right-4 z-30 flex items-center justify-center px-3 py-2 mt-3 mr-3 space-x-1 text-xs font-medium uppercase border rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                                })">
                            </span>
                        </div>
                    </div>
                </template>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}
  