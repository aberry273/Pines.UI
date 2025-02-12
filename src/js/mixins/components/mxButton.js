export default function (data) {
    return {
        // PROPERTIES
        mxButton_label: '',
        mxButton_text: '',
        mxButton_event: null,
        mxButton_href: null,
        mxButton_value: null,
        mxButton_tooltip: '',
        mxButton_name: '',
        mxButton_showTooltip: false,
        mxButton_override: false,
        mxButton_disabled: false,
        mxButton_items: [],
        init() {},
        // GETTERS  
        get mxButton_class() { return 'relative flex cursor-default select-none hover:bg-neutral-100 items-center rounded px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50' },
        get mxButton_classIconRounded() { return 'flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-sm cursor-pointer hover:bg-neutral-100 focus-visible:ring-gray-400 focus-visible:ring-2 focus-visible:outline-none active:bg-white border-neutral-200/70' },
        get mxButton_iconClass() { return "inline-block  focus:ring-4 hover:bg-gray-200 dark:hover:bg-gray-200 focus:outline-none 0 rounded-lg text-sm p-1.5" },
        get mxButton_iconClassMuted() { return "inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" },
        get mxButton_labelClass() { return 'ml-auto text-xs tracking-widest opacity-60' },

        // METHODS
    }
}