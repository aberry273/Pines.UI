import { mxContent, mxNavigation } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxNavigation(params),
        // PROPERTIES
        
        // INIT
        init() {
            this.mxContent_title = params.title;
            this.mxNavigation_primaryItems = params.primaryItems;
            this.mxNavigation_secondaryItems = params.secondaryItems;
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.open = false;
        },
        // RENDER
        render() {
            const html = `
            <section class="w-full px-8 text-gray-700 bg-white" {!! $attributes ?? '' !!}>
                <div class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
                    <div class="relative flex flex-col md:flex-row">
                        <a href="#_" class="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                            <span class="mx-auto text-xl font-black leading-none text-gray-900 select-none" x-text="mxContent_title">tails</span>
                        </a>
                        <nav class="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                            <template x-for="item in mxNavigation_primaryItems">
                                <a :href="item.href" x-text="item.label" :class="item.class || mxNavigation_headerLinkClass"></a>
                            </template>
                        </nav>
                    </div>
            
                    <div class="inline-flex items-center ml-5 space-x-6 lg:justify-end">
                        <template x-for="item in mxNavigation_secondaryItems">
                            <a :href="item.href" x-text="item.label" :class="item.class || mxNavigation_headerButtonClass"></a>
                        </template>
                    </div>
                </div>
            </section>
        `
        this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}