class ChatBoxController {
    constructor($rootScope, $window, $anchorScroll, toastr, $ngBootbox, ChatService, chatBoxService, connectService) {
        this.$rootScope = $rootScope;
        this.$rootScope.chatHistory = [];
        $rootScope.chatHistory = this.$rootScope.chatHistory;
        this.chatService = ChatService;
        this.chatBoxService = chatBoxService;
        this.modelImg;
        this.connectService = connectService;
        this.toastr = toastr;
        $rootScope.isSending = 0;

        this.height_div_log_chat = 'no_div_bot';

        /*
         * author: khanhtc
         * function: get history
         * param: conversation
         */
        $rootScope.getHistory = (Conversation, type_load) => {
            if ($rootScope.isSending > 0) {
                $ngBootbox.confirm('Còn tin nhắn chưa được gửi, bạn có muốn tiếp tục?')
                    .then(function () {
                        $rootScope.isSending = 0;
                        $rootScope.getHistoryAction(Conversation, type_load);
                        $rootScope.get_show_log_all(Conversation);
                    }, function () {
                        if (type_load !== 'click') {
                            $rootScope.activeType = $rootScope.tmpFilterType;
                            $rootScope.activeFanpage = $rootScope.tmpActiveFanpage;
                            $rootScope.listConversation = $rootScope.tempConversation;
                        }
                    });
            }
            else {
                $rootScope.getHistoryAction(Conversation, type_load);
                $rootScope.get_show_log_all(Conversation);
            }
        };

        $rootScope.getHistoryAction = (Conversation, type_load) => {
            $rootScope.replyModel = '';
            if (Conversation) {
                $rootScope.activeConversation = Conversation;

                let data_call = {
                    'from': Conversation.chat_id,
                    'to': Conversation.support_id
                };

                this.chatBoxService.getHistories(data_call, (res) => {
                    if (res.status == 0) {
                        return;
                    }
                    this.$rootScope.chatHistory = res.data;
                    this.$rootScope.chatHistory.forEach((item, index) => {
                        item = JSON.parse(item);
                        item.bodyMsg = JSON.parse(item.bodyMsg);
                        item.sentDate = new Date(item.sentDate * 1000);
                        let id_chat = item.fromChatID.split('@')[0];
                        item.is_type = 'client';
                        item.mesid = item.bodyMsg.mesid;
                        if (typeof(item.fb_user_id) !== 'undefined') {
                            if (item.fb_user_id === item.fb_fanpage_id) {
                                item.is_type = 'support';
                            }
                        } else {

                            if (id_chat === $rootScope.current_user) {
                                item.is_type = 'support';
                            }
                        }
                        $rootScope.chatHistory[index] = item;
                    });
                    $rootScope.filterImageInHistory($rootScope.chatHistory);
                    $rootScope.auto_scroll_top_history(2000);
                    if ($rootScope.activeConversation.type === 'fb_comment') {
                        this.getListCommentStatus();
                    }
                    if (Conversation.unread_message > 0) {

                        /* reset Notification */
                        $rootScope.resetNotification(Conversation);

                    }
                });

                /* get info user */
                $rootScope.getUserInfo(Conversation);

                $rootScope.get_post(Conversation);
            }
        };

        /*
         * author: khanhtc
         * function: get all image of history chat to list
         */
        $rootScope.filterImageInHistory = (history) => {
            $rootScope.listImage = [];
            history.forEach((item) => {
                if (item.bodyMsg.msg) {
                    if (item.bodyMsg.msg.indexOf('?build=image') !== -1 || item.bodyMsg.msg.indexOf('<img') !== -1) {
                        let exp = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))[^target]/ig;
                        let res = exp.exec(item.bodyMsg.msg)[0];
                        let result = res.split('"')[0];
                        $rootScope.listImage.push({url: result});
                    }
                }
            })
        };

        /* 
         * author: tranlongpc
         * function: auto scroll
         */
        $rootScope.auto_scroll_top_history = (time = 1000) => {
            setTimeout(function () {
                var scroll_height = $('.chat-history')[0].scrollHeight ;
                $('#chat-histories').animate({scrollTop:scroll_height}, 1000); 

            }, time);
        };

        $rootScope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            $rootScope.auto_scroll_top_history();
        });

        /*
         * author: khanhtc
         * function: reset notification of conversation
         * param: conversation
         */
        $rootScope.resetNotification = (conversation) => {
            if (conversation.unread_message > 0) {
                let data = {
                    from: conversation.support_id,
                    to: conversation.chat_id,
                    project: $rootScope.project
                };
                if (conversation.fanpage_id) {
                    data.fanpage_id = conversation.fanpage_id
                }
                else {
                    data.fanpage_id = 'web';
                }
                this.chatService.resetUnreadMessage(data, (res) => {
                    $rootScope.activeConversation.unread_message = 0;
                    $rootScope.updateNotiFanpage();
                })
            }
        };

        /*
         * author: khanhtc
         * function: build html from text
         * param: text (string)
         */
        $rootScope.buildHtml = (text) => {
            if (text) {
                //build image
                if (text.indexOf('?build=image') >= 0) {
                    let data = '<a href="' + text + '" target="_blank"><img src="' + text + '" alt="" ></a>';
                    return data;
                }
                else {
                    // build link
                    if (text.indexOf('<a href') === -1) {
                        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                        return text.replace(exp, "<a class='link-mess' target='_blank' href='$1'>$1</a>");
                    }
                    else {
                        text = text.replace(/\n/g, "<br />");
                        return text;
                    }
                }
            }
            else return '';
        };

        this.previewId = 0;

    }

    /*
     * author: khanhtc
     * function: get status of chat history
     */
    getListCommentStatus() {
        // data: (object)
        // *       {project, from, to, comment_id(list)}
        let data = {
            project: this.$rootScope.project,
            from: this.$rootScope.activeConversation.support_id,
            to: this.$rootScope.activeConversation.idChat,
            comment_id: []
        };
        for (let i = 0; i < this.$rootScope.chatHistory.length; i++) {
            let item = this.$rootScope.chatHistory[i];
            data.comment_id.push(item.comment_id);
        }
        this.chatBoxService.getListStatus(data, (res) => {
            if (res.status) {
                res.data.forEach((item) => {
                    let index = this.findChatInListByCommentId(item);
                    if (index !== null) {
                        this.$rootScope.chatHistory[index].is_inbox = item.is_inbox;
                        this.$rootScope.chatHistory[index].status = item.status;
                        this.$rootScope.chatHistory[index].is_liked = item.is_liked;
                        this.$rootScope.chatHistory[index].is_hidden = item.is_hidden;
                    }
                })
            }
        })
    }

    /*
     * author: khanhtc
     * function: get status of chat history
     * param: message (object)
     */
    findChatInListByCommentId(message) {
        for (let i = 0; i < this.$rootScope.chatHistory.length; i++) {
            let item = this.$rootScope.chatHistory[i];
            if (item.comment_id === message.comment_id) {
                return i;
            }
        }
        return null;
    }

    /*
     * author: khanhtc
     * function: replace link to html
     * param: item (string)
     */
    regexLink(item) {
        if (item) {
            let exp = /([^"]\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            return item.replace(exp, "<a target='_blank' href='$1'>$1</a>");
        }
    }

    /*
     * author: khanhtc
     * function: upload image
     * param: file (file)
     */
    uploadImage(file) {
        this.previewId++;
        let preview = this.previewId;
        this.$rootScope.isSending++;
        let newItem = {
            is_type: "support",
            sentDate: new Date(Date.now()).toISOString(),
            bodyMsg: {
                msg: '',
                type: this.$rootScope.activeConversation.type,
                isPreview: true,
                image: file,
                mesid: preview
            },
            previewId: preview
        };
        this.$rootScope.chatHistory.unshift(newItem);
        this.$rootScope.auto_scroll_top_history(100);
        this.chatService.uploadImage(file, (res) => {
            if (res.status) {
                this.$rootScope.isSending--;
                /*upload ok */
                let dataMsg = {
                    'type': 'image_link',
                    'msg': res.link_file + '?build=image'
                };
                //<a href="' + res.link_file + '" target="_blank"><img src="'+ res.link_file +'" alt=""></a>
                this.doSend(dataMsg, (dataNew) => {
                    dataNew.msg = '<a href="' + res.link_file + '" target="_blank"><img src="' + res.link_file + '" alt=""></a>'; //chuyen link anh thanh anh?
                    this.$rootScope.chatHistory.forEach((item) => {
                        if (item.previewId === preview) {
                            item.bodyMsg = {
                                msg: dataNew.msg,
                                name: dataNew.fullname,
                                mesid: dataNew.messid
                            };
                            item.fb_fanpage_id = dataNew.fanpage_id;
                            item.fullname = dataNew.fullname;
                            item.type = dataNew.type;
                            item.sentDate = dataNew.time;
                        }
                    });
                });
            }
        });
    }

    /*
     * author: khanhtc
     * function: log conversation for dev
     * param: conversation (object)
     */
    log(item) {
        console.log(item);
    }

    /*
     * author: khanhtc
     * function: like comment
     * param: item (object)
     */
    postLike(item) {
        let activeConversation = this.$rootScope.activeConversation;

        this.chatBoxService.updateStatusComment({field: 'is_liked', value: 1, message_id: item.comment_id}, (res) => {

        });
        this.chatBoxService.getFanpageToken({
            projectToken: this.$rootScope.project,
            FanpageId: item.fb_fanpage_id
        }, (res) => {
            if (res.status === 1) {
                this.chatBoxService.callLikeFbApi({
                    facebook_id: item.comment_id,
                    access_token: res.projectToken,
                    method: false
                }, (res) => {
                    if (res.success) {
                        item.is_liked = true;
                    }
                    else {
                    }
                });
            }
            else {
                this.chatBoxService.callLikeFbApi({
                    facebook_id: item.comment_id,
                    access_token: res.projectToken,
                    method: true
                }, (res) => {
                    console.log(res)
                })
            }
        });
    }

    /*
     * author: khanhtc
     * function: hide comment
     * param: item (object)
     */
    postHidden(item) {
        let activeConversation = this.$rootScope.activeConversation;
        let is_hidden = true;
        this.chatBoxService.updateStatusComment({
            field: 'comment_status',
            value: 1,
            message_id: item.comment_id
        }, (res) => {

        });
        this.chatBoxService.getFanpageToken({
            projectToken: this.$rootScope.project,
            FanpageId: item.fb_fanpage_id
        }, (res) => {
            if (res.status === 1) {
                this.chatBoxService.callHideFbApi({
                    facebook_id: item.comment_id,
                    access_token: res.projectToken,
                    is_hidden: is_hidden
                }, (res) => {
                    if (res.success) {
                        item.status = 3;
                    }
                    else {
                        this.toastr.error('Không thể ẩn hoặc bỏ ẩn cmt này!');
                    }
                });
            }
        });
    };

    /*
     * author: khanhtc
     * function: hide dropdown comment
     * param: item (object)
     *        $event
     */
    cancelForm(item) {
        // $event.preventDefault();
        // $event.stopPropagation();
        item.isDropdownOpen = false;
    }

    /*
     * author: khanhtc
     * function: reply from comment
     * param: item (object)
     */
    reply_one_comment(item) {
        this.chatBoxService.updateStatusComment({field: 'is_inbox', value: 1, message_id: item.comment_id}, (res) => {
        });
        this.chatBoxService.getFanpageToken({
            projectToken: this.$rootScope.project,
            FanpageId: item.fb_fanpage_id
        }, (res) => {
            if (res.status === 1) {
                this.chatBoxService.callReplyFbApi({
                    facebook_id: item.comment_id,
                    access_token: res.projectToken,
                    message: item.replyModel
                }, (res) => {
                    item.is_inbox = 1;
                });
            }
        });
        this.cancelForm(item);
    }

    /*
     * author: khanhtc
     * function: trigger click send or enter
     * param: text (string)
     */
    replyAction(text) {
        this.$rootScope.resetNotification(this.$rootScope.activeConversation);
        this.previewId++;
        let preview = this.previewId;
        if (text.length === 0) {
            return false;
        }
        let newItem = {
            is_type: "support",
            sentDate: new Date(Date.now()),
            bodyMsg: {
                msg: text,
                type: this.$rootScope.activeConversation.type,
                textPreview: true,
                mesid: preview
            },
            previewId: preview
        };
        let data_msg = {
            type: 'text',
            msg: text,
            mesid: preview
        };
        this.$rootScope.isSending++;
        this.$rootScope.chatHistory.unshift(newItem);
        this.$rootScope.auto_scroll_top_history(100);
        this.$rootScope.replyModel = '';
        this.doSend(data_msg, (dataNew) => {
            this.$rootScope.chatHistory.forEach((item, index) => {
                this.$rootScope.isSending --;
                if (item.previewId === preview) {
                    if (dataNew !== null) {
                        item.bodyMsg = {
                            msg: dataNew.msg,
                            name: dataNew.fullname,
                            mesid: dataNew.messid
                        };
                        item.fb_fanpage_id = dataNew.fanpage_id;
                        item.fullname = dataNew.fullname;
                        item.type = dataNew.type;
                        item.sentDate = dataNew.time;
                        this.$rootScope.activeConversation.time = String(Date.now());
                        this.$rootScope.activeConversation.last_message = dataNew.msg;
                    } else {
                        this.$rootScope.chatHistory.splice(index, 1);
                    }
                }
            });
            console.log('sasaddasd');
        });
    }

    /*
     * author: tranlongpc
     * function: sent message when click or enter
     */

    UIActionSentMsg(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            this.replyAction(this.$rootScope.replyModel);
            e.preventDefault();
        }
    };

    /*
     * author: khanhtc
     * function: add new message to list
     * param: text (string)
     */
    newMsg(data_msg) {
        let bodyMSg = {
            'msg': data_msg.msg,
            'name': data_msg.fullname,
            'mesid': data_msg.messid
        };

        this.$rootScope.chatHistory.unshift({
            bodyMsg: bodyMSg,
            fb_fanpage_id: data_msg.fanpage_id,
            fb_name: data_msg.fullname,
            type: data_msg.type,
            is_type: data_msg.is_type,
            sentDate: data_msg.time,
        });


        this.$rootScope.auto_scroll_top_history(300);
    }


    /* 
     * author: tranlongpc
     * function: sent message
     * param: data (object)
     */
    doSend(data_msg, callback) {
        if (data_msg) {
            data_msg.is_type = 'support';
            data_msg.fullname = this.$rootScope.config.user.fullname;
            data_msg.time = Date.now() * 1000;
            data_msg.messid = 'mesid_' + this.$rootScope.project + '_' + data_msg.time;
            data_msg.sent_to = this.$rootScope.activeConversation.idChat;
            data_msg.sent_to_fullname = this.$rootScope.activeConversation.fullname;
            data_msg.sent_from = this.$rootScope.current_user;
            data_msg.type = this.$rootScope.activeConversation.account_type;
            data_msg.project = this.$rootScope.project;
            data_msg.fanpage_id = this.$rootScope.activeFanpage.id;

            let account_type = this.$rootScope.activeConversation.account_type;

            /* sent facebook */
            if (account_type === 'facebook') {

                data_msg.sent_to = data_msg.sent_to.replace('_fp_' + data_msg.fanpage_id + '_', '');
                data_msg.type = 'facebook';
                this.chatBoxService.sent_to_facebook(data_msg, (res) => {
                    if (res.message_id) {
                        data_msg.messid = res.message_id;
                        callback(data_msg);
                    } else {
                        this.toastr.error(res.error.message);
                        callback(null);
                        //log
                    }
                    this.$rootScope.auto_scroll_top_history(500);
                });
            }

            if (account_type === 'fb_comment') {
                data_msg.sent_to = data_msg.sent_to.replace('fb_comment_fp_' + data_msg.fanpage_id + '_', '');
                data_msg.type = 'facebook_comment';
                data_msg.writelog = 1;
                this.chatBoxService.sent_reply_comment_facebook(data_msg, (res) => {
                    if (res.id) {
                        data_msg.messid = res.id;
                        callback(data_msg);
                    } else {
                        callback(data_msg);
                        //log
                    }
                    this.$rootScope.auto_scroll_top_history(500);
                });
            }

            if (account_type === 'mdc') {
                // xu ly dang mdc

            }

            if (account_type === 'system_chat') {
                //chat web
                console.log('gui tin nhan:' + data_msg.msg);

                data_msg.type = 'chat';
                this.connectService.send.message(data_msg);
                callback(data_msg);
                this.$rootScope.auto_scroll_top_history(100);
            }
        }
    }


}

ChatBoxController.$inject = [
    '$rootScope', '$window', '$anchorScroll', 'toastr', '$ngBootbox',
    'ChatService', 'chatBoxService', 'connectService'
];

export default ChatBoxController;

$(document).ready(function () {
    /* Close dropdown filter khi click outside */
    $('.search_employ').click((event) => {
        event.stopPropagation();
    });

});