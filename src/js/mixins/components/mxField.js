export default function (data) {
    return {
        mxField_inputClass: 'block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50',
        // PROPERTIES
        mxField_type: 'text',
        mxField_placeholder: null,
        mxField_cssClass: null,
        mxField_id: null,
        mxField_name: null,
        mxField_min: null,
        mxField_max: null,
        mxField_class: null,
        mxField_disabled: null,
        mxField_value: null,
        mxField_required: null,
        mxField_readOnly: null,
        mxField_autocomplete: null,
        mxField_ariaInvalid: null,
        mxField_areaDescribedBy: null,
        mxField_pattern: null,
        init() {
            console.log('mxField')
        },
        // GETTERS  
        get mxField_inputInvalidClass() { return 'invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 '},     
        get mxField_inputEmailRegex() { return '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' },
        // METHODS
        _mxField_onChange(ev) {
            const field = {
                id: this.mxField_id,
                name: this.mxField_name,
                value: this.mxField_value
            }
            this.$dispatch('oninputchange', field)
        },
    }
}