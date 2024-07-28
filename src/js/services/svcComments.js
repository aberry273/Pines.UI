import { emit, createClient, connectedEvent, messageEvent } from './utilities.js'

import { mxEvent, mxFetch, mxService, mxToast } from '/src/js/mixins/index.js';

export default function (settings) {
    return {
        ...mxEvent(settings),
        ...mxFetch(settings),
        ...mxService(settings),
        ...mxToast(settings),
        // PROPERTIES
        svcComments_eventCopyLink: 'on:comment:copylink',
        svcComments_eventQuote: 'on:comment:quote',
        svcComments_eventUpvote: 'on:upvote',
        svcComments_eventDownvote: 'on:comment:downvote',
        svcComments_eventDelete: 'on:comment:delete',
        svcComments_eventFlag: 'on:comment:flag',
        
        async init() {
            this._mxEvent_On(this.svcComments_eventCopyLink, this.copyLink)
            this._mxEvent_On(this.svcComments_eventQuote, this.quote)
            this._mxEvent_On(this.svcComments_eventUpvote, this.upvote)
            this._mxEvent_On(this.svcComments_eventDownvote, this.downvote)
            this._mxEvent_On(this.svcComments_eventFlag, this.delete)
            this._mxEvent_On(this.svcComments_eventDelete, this.flag)
        },
        // GETTERS  
        // METHODS
        setEvents() {
            if (!this.mxEvent_event) return;
            const self = this;
            this._mxEvent_On(this.mxEvent_event, (val) => {
                self.mxModal_open = true;
            })
        },
        upvote(item) {
            console.log('upvote');
            console.log(item);
            this.$toast.Add('upvote', 'default', '')
        },
        downvote(item) {
            console.log('downvote');
            console.log(item);
            _mxToast_Add('downvote', 'default', '')
        },
        quote(item) {
            console.log('quote');
            console.log(item);
            _mxToast_Add('quote', 'default', '')
        },
        copyLink(item) {
            console.log('copyLink');
            console.log(item);
            _mxToast_Add('copyLink', 'default', '')
        },
        flag(item) {
            console.log('flag');
            console.log(item);
            _mxToast_Add('flag', 'default', '')
        },
        delete(item) {
            console.log('delete');
            console.log(item);
            _mxToast_Add('delete', 'default', '')
        },
    }
}