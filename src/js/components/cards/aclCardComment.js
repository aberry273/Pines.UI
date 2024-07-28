import { mxContent, mxNavigation, mxLink, mxIcon, mxDate, } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxNavigation(params),
        ...mxContent(params),
        ...mxLink(params),
        ...mxIcon(params),
        ...mxDate(params),
        // PROPERTIES
        item: null,
        id: '',
        condense: false,
        showMenu: false,
        label: '',
        metrics: {},
        settings: {},
        taxonomy: {},
        content: {},
        profile: {},
        menu: [],
        actions: [],
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        get dropdownParams() {
            return {
                items: this.menu
            }
        },
        // METHODS
        setValues(params) {
            this.id = params.id;
            this.condense = params.condense;
            this.profile = params.profile || this.profile;
            this.content = params.content;
            this.settings = params.settings;
            this.taxonomy = params.taxonomy;
            this.metrics = params.metrics;
            this.label = params.label;
            this.menu = params.menu;
            this.actions = params.actions;
            this.item = params;
        },
        close() {
            this.open = false;
        },
        executeAction(btn, item) {
            this.$events.Emit(btn.event, item);
        },
        render() {
            const html = `
                <div class="flex max-w bg-white rounded-lg hover:bg-gray-50">
                    <!--Profile image-->    
                    <div class="w-14 h-8 sm:w-10 flex-shrink-0 flex items-center justify-center">
                        <div x-show="!condense" x-data="aclContentImage(profile)"></div>
                        <!-- Updated -->
                        <time x-show="condense && showMenu" x-text="_mxDate_FormatShortString(content.date)" :datetime="content.date" class="pl-2 text-xs text-gray-300 dark:text-gray-300"></time>
                    </div>
                    <!--Comment--> 
                    <div class="ml-3 pt-0 w-full">
                        <div class="font-medium flex rtl:text-right justify-between" x-show="!condense">
                            <div @click="showMenu = !showMenu" class="cursor-pointer">
                                <!-- User Link-->
                                <span x-data="aclCardProfileHover(profile)"></span>
                                <!-- Updated -->
                                <time x-text="_mxDate_FormatString(content.date)" datetime="content.date" class="pl-2 text-sm text-gray-300 dark:text-gray-300"></time>
                            </div>
                            <div class="mr-2 flex">
                                <!-- Rating -->
                                <span x-text="metrics.rating" class="text-sm px-1 pt-1 font-medium text-gray-300 dark:text-gray-300"> 
                                </span>
                                <!--
                                <span class="pt-1" x-data="aclIconsSvg({ mxIcon_name: 'chevronUp', mxIcon_class:'w-5 h-5 text-gray-300 dark:text-gray-300'})"></span>
                                -->
                                <!-- More Button -->
                                <span x-data="aclDropdownMenuButton(dropdownParams)" @onselect="(ev) => { executeAction(ev.detail, item) }"></span>
                            </div>
                        </div> 
                        <!--Content-->
                        <div class="flex">
                            <span @click="showMenu = !showMenu" x-text="content.text" class="align-center cursor-pointer mb-3 font-normal text-gray-700 dark:text-gray-400"></span>
                        </div>
                        <!--Commands-->
                        <div class="flex justify-between mb-2" x-show="showMenu">
                            <!-- Taxonomy -->
                            <div x-show="taxonomy">
                                <span x-show="taxonomy.category" x-text="taxonomy.category" class="cursor-pointer relative rounded-md bg-gray-50 px-3 pt-1 font-medium text-gray-600 hover:bg-gray-100"></span>
                            </div>
                            <!-- Actions -->
                            <div class="flex mr-2">
                                <template x-for="btn in actions">
                                    <div x-data="aclButton(btn)" @onclick="(ev) => { executeAction(btn, item) }"></div>
                                </template>
                                <!-- More Button -->
                                <span x-show="condense" x-data="aclDropdownMenuButton(dropdownParams)"></span>
                            </div>
                        </div>
                    </div>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}