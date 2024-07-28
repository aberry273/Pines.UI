export default function (params) {
    return {
        // PROPERTIES
        mxToast_event: 'on:toast',
        mxToast_items: [],
        init() {
            this.mxToast_items = params.mxToast_items;
        },
        // GETTERS  
        get mxToast_itemClass() { return '' },
        // METHODS
        _mxToast_Add(text, type = 'default', description = '') {
            $events.Emit(
                this.mxToast_event, 
                {
                    title: title,
                    type: type,
                    description: description
                }
            );
        }
    }
}