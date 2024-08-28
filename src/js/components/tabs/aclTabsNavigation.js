import { mxTab } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxTab(params),
        // PROPERTIES
        // INIT
        init() {
            this._mxTab_init(params);
            this.render();
            this.$watch('mxTab_tabButtons', (newVal, oldVal) => {
                const active = this.mxTab_active
                    ? this.mxTab_items.filter(x => x.text == this.mxTab_active)[0]
                    : this.mxTab_items[0];
                this._mxTab_select(active)
            })
        },
        // GETTERS
        // METHODS
        render() {
            const html = `
                <div x-ref="tabButtons" class="relative items-center justify-center w-full h-10 p-1 text-gray-500 bg-gray-100 rounded-lg select-none">
                    <div x-ref="tabMarker" class="absolute left-0 z-10 w-1/2 h-full duration-300 ease-out">
                        <div class="w-full h-full bg-white rounded-md shadow-sm"></div>
                    </div>    
                    <template x-for="tab in mxTab_items">
                        <a :id="$id(tab.text)"
                            role="button" 
                            class="relative z-20 inline-flex items-center justify-center h-8 px-3 text-sm font-medium transition-all rounded-md cursor-pointer whitespace-nowrap"
                            :href="tab.href"
                            x-text="tab.text">
                        </a>
                    </template>
                </div>
                <span x-init="mxTab_tabButtons = $refs.tabButtons"></span>
            `;
            this.$nextTick(() => {
                this.$root.innerHTML = html;
            })
        },
    }
}