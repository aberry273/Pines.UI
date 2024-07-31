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
        self: null,
        async init() {
            this.self = this;
            this._mxEvent_On(this.svcComments_eventCopyLink, (item) => {
                this.upvote(item, this);
                this.sendAlert('copy', 'default', '')
            })
            this._mxEvent_On(this.svcComments_eventQuote, (item) => {
                this.upvote(item, this);
                this.sendAlert('quote', 'default', '')
            })
            this._mxEvent_On(this.svcComments_eventUpvote, (item) => {
                this.upvote(item, this);
                this.sendAlert('upvote', 'default', '')
            })
            this._mxEvent_On(this.svcComments_eventDownvote, (item) => {
                this.upvote(item, this);
                this.sendAlert('downvote', 'default', '')
            })
            this._mxEvent_On(this.svcComments_eventFlag, (item) => {
                this.upvote(item, this);
                this.sendAlert('flag', 'default', '')
            })
            this._mxEvent_On(this.svcComments_eventDelete, (item) => {
                this.upvote(item, this);
                this.sendAlert('delete', 'default', '')
            })
        },
        // GETTERS  
        // METHODS
        setEvents(item, cb) {
            if (!this.mxEvent_event) return;
            const self = this;
            this.upvote(item, this);
            this.sendAlert('upvote', 'default', '')
        },
        sendAlert(title, type, description) {
            this._mxEvent_Emit(
                this.mxToast_event, 
                {
                    title: title,
                    type: type,
                    description: description
                }
            );
        },
        upvote(item) {
            console.log(item); 
        },
        downvote(item) {
            console.log(item);
        },
        quote(item) {
            console.log(item);
        },
        copyLink(item) {
            console.log(item);
        },
        flag(item) {
            console.log(item);
        },
        delete(item) {
            console.log(item);
        },
    }
}