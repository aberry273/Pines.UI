export default function (params) {
    return {
        // PROPERTIES
        mxModal_open: false,
        mxModal_clickOutside: false,
        init() {},
        // GETTERS  
        get mxModal_buttonRightSvg() { return 'absolute right-0 w-5 h-5 mr-3' },
        // METHODS
        _mxModal_CreateSvgPath(path) {
            return `<path stroke-linecap="round" stroke-linejoin="round" d="${path}" />`
        },
        _mxModal_ClickOutside() {
            // If clickOutside is enabled, don't close the modal on outside click
            console.log('_mxModal_ClickOutside')
            if(this.mxModal_clickOutside) return;
            this.mxModal_open = false;
        },
    }
}