function Main(){
    var self = this
    self.dropNavItem = $(".layout .left-aside .nav-aside .nav-wrapper .nav-list .nav-item .drop-item")
    self.tabItem = $(".layout .app-container .container-right-aside .right-aside .right-tabs-container .tab-header .item")
    self.tabContentList = $(".layout .app-container .container-right-aside .right-aside .right-tabs-container .tab-content-list")
    self.tabLine = $(".layout .app-container .container-right-aside .right-aside .right-tabs-container .bottom-line .line")
    self.rewardType = $(".reward-container .reward-main .reward-header span")
    self.rewardImg = $(".reward-container .reward-main .img-box .pay-box")
    self.getCaptchaBtn = $("#getCaptchaBtn")
    self.loginMobileInput = $(".auth-container .auth-box .login-wrapper-box .login-box input[name='mobile']")
    self.loginCaptchaInput = $(".auth-container .auth-box .login-wrapper-box .login-box input[name='code']")
    self.headerUserItem = $("#Header .header .header-right .user-item")
    self.lineTabHeaderItem = $(".line-tab-header .item")
    self.lineTabContentList = $(".line-tab-content-list")
    self.lineTabLine = $(".line-tab-line .line")
    self.commentInput = $(".message-container .message-box .comment-textarea")
}
Main.prototype.listenNavDropEvent = function (){
    var self = this
    self.dropNavItem.on('click', function (){
        $(this).next().stop().slideToggle()
    })
}

Main.prototype.listenRightTabEvent = function (){
    var self = this
    var tabWidth = self.tabItem.parent().width() / 3
    self.tabItem.on('click', function (){
        var tab_index = $(this).index()
        self.tabContentList.children().hide()
        self.tabContentList.children().eq(tab_index).fadeIn()
        self.tabLine.stop().animate({'left': tab_index * tabWidth + 'px'},300)
    })
}

Main.prototype.listenLineTabEvent = function (){
    var self = this
    var tabWidth = 100
    self.lineTabHeaderItem.on('click', function (){
        var tab_index = $(this).index()
        self.lineTabContentList.children().hide()
        self.lineTabContentList.children().eq(tab_index).fadeIn()
        self.lineTabLine.stop().animate({'left': tab_index * tabWidth + 'px'},300)
    })
}


Main.prototype.listenRewardEvent = function (){
    var self = this
    self.rewardType.on('click', function (){
        console.log()
        self.rewardType.removeClass('active')
        $(this).addClass('active')
        self.rewardImg.hide()
        self.rewardImg.eq($(this).index()).fadeIn()
    })
}

Main.prototype.listenShowHideRewardEvent = function (){
    $(".reward-show-btn").on('click', function (){
        $(".reward-container").stop().slideToggle()
    })
    $("#reward").on('click', function (){
        $(".reward-container").stop().slideToggle()
    })
    $(".reward-container").on("click", function (e){
        if (e.target.className ==="reward-container"){
            $(this).slideToggle()
        }
    })
}


Main.prototype.AuthBtnEvent = function (){
    var self = this
    $("#AuthBtn").on('click', function (){
        $(".auth-container").fadeIn()
        self.loginMobileInput.val("")
        self.loginCaptchaInput.val("")
    })
    $(".AuthBtn").on('click', function (){
        $(".auth-container").fadeIn()
        self.loginMobileInput.val("")
        self.loginCaptchaInput.val("")
    })
    $(".auth-container").on('click', function (e){
        if (e.target.className ==="auth-container"){
            $(this).fadeOut()

        }
    })
}

Main.prototype.listenGetCaptchaBtnEvent = function (){
    var self = this
    var reg_mobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;    //11位手机号码正则
    self.getCaptchaBtn.on('click', function (){
        var mobile = self.loginMobileInput.val()
        if (!mobile){
            cocoMessage.error("请输入手机号码")
            return
        }
        if (!reg_mobile.test(mobile)){
            cocoMessage.error("手机号码格式错误")
            return
        }

        more_ajax.post({
            "url":"/send_code/",
            "data":{
                "mobile":mobile
            },
            'success':function (res){
                if (res.code === 200){
                    self.listenCodeSuccessEvent()
                }else {
                    cocoMessage.error(res.message)
                }
            },
            "fail":function (err){
                cocoMessage.error("网络错误")
            }
        })
    })
}

Main.prototype.listenCodeSuccessEvent = function (){
    var self = this
    cocoMessage.success("短信验证码发送成功")
    self.getCaptchaBtn.addClass('disable')
    var count = 60;
    self.getCaptchaBtn.unbind('click')
    var timer = setInterval(function () {
        self.getCaptchaBtn.text(count + 's');
        count -= 1;
        if (count <= 0) {
            clearInterval(timer);
            self.getCaptchaBtn.removeClass('disable');
            self.getCaptchaBtn.text('获取验证码');
            self.listenGetCaptchaBtnEvent();
        }
    }, 1000);
}


Main.prototype.listenClickNavUserItemEvent = function (){
    var self = this
    self.headerUserItem.on('click', function (){
        $(this).children().eq(-1).stop().slideToggle()
    })
}

Main.prototype.listenSubmitLoginEvent = function (){
    var self = this
    $("#loginBtn").on('click', function (){
        var mobile = self.loginMobileInput.val()
        var code = self.loginCaptchaInput.val()
        console.log(mobile)
        console.log(code)
        if(!mobile){
            cocoMessage.error("请输入手机号码")
            return
        }
        if (!code){
            cocoMessage.error("请输入短信验证码")
            return;
        }
        more_ajax.post({
            "url":"/login/",
            "data":{
                "mobile":mobile,
                "code":code
            },
            "success":function (res){
                if (res.code===200){
                    cocoMessage.success("登录成功", 2000, function (){
                        $(".auth-container").fadeOut()
                        self.loginMobileInput.val("")
                        self.loginCaptchaInput.val("")
                        location.reload()
                    })
                }
            },
            "fail":function (err){
                cocoMessage.error("登录失败！请稍后重试!")
            }
        })
    })
}

Main.prototype.listenCommentSubmitEvent = function (){
    var self = this
    $(".comment-btn").on('click', function (){
        var articleId = $(this).parent().parent().prev().attr("article-id")
        var userId = $(this).parent().parent().prev().attr("user")
        var preId = $(this).parent().parent().prev().attr("pre")
        var requestPath = location.pathname

        more_ajax.post({
            'url':"/comment/",
            'data':{
                "requestPath":requestPath,
                "articleId":articleId,
                "userId":userId,
                "content":$(this).parent().parent().prev().val(),
                "pre_id":preId
            },
            'success':function (res){
                if (res.code===200){
                    cocoMessage.success("评论成功", 1000, function (){
                        location.reload()
                    })

                }
            }
        })


    })
}

Main.prototype.listenReplayCommentBtnEvent = function (){
    var self = this
    $(".replay-comment-btn").on('click', function (){
        self.commentInput.stop().slideToggle()
        $(".message-container .message-box .comment-button-group").stop().slideToggle()
        $(this).parent().next().stop().slideToggle()
        var text = $(this).text();
        if (text === '回复') {
            $(this).text('取消回复');
        } else {
            $(this).text('回复');
        }

    })
}

Main.prototype.listenGiteeLoginBtnEvent = function (){
    $("#giteeLoginBtn").on('click', function (){
        var pageURL = $(location).attr("href");
        localStorage.setItem("login_page_url", pageURL)
        location.href = 'https://gitee.com/oauth/authorize?client_id=c08ef54fe45de812ff8e93c5c4793707b03e8236bd7aa8e6c099b4bb6f5236ae&redirect_uri=https://www.wouldmissyou.com/check_gitee/&response_type=code'
    })
}

Main.prototype.listenGitHubLoginBtnEvent = function (){
    $("#githubLoginBtn").on('click', function (){
        var pageURL = $(location).attr("href");
        localStorage.setItem("login_page_url", pageURL)
        location.href = 'https://github.com/login/oauth/authorize?client_id=7b55e98bd5b4d6fd1419&redirect_uri=https://www.wouldmissyou.com/check_github&scope=user&state=random_string'
    })
}

Main.prototype.listenQQLoginBtnEvent = function (){
    $("#qqLoginBtn").on('click', function (){
        var pageURL = $(location).attr("href");
        localStorage.setItem("login_page_url", pageURL)
        location.href = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=102044865&redirect_uri=https://www.wouldmissyou.com/check_qq&state=wouldmissyou'
    })
}

Main.prototype.listenParseVideoEvent = function (){
    var self = this
    var parse_input = $(".parse-video-content .input-content input")
    $("#parseBtn").on('click', function (){

        var parse_val = parse_input.val()
        if (!parse_val){
            cocoMessage.error("请输入解析的视频链接或分享内容")
        }else {
            $(".parse-loading-style").show()
            var html = ''
            $(".parse-result").html(html)
            more_ajax.post({
                "url":"/video_parse/",
                "data":{
                    "share_text":parse_val
                },
                "success":function (res){
                    $(".parse-loading-style").hide()

                    if (res.code ===200){
                        cocoMessage.success("解析成功")
                        // 判断是图集还是视频
                        if (res.data.data.isVideo){
                            html += '<div class="item">\n' +
                                '                    <span class="title">解析标题</span>\n' +
                                '                    <input type="text" value="'+res.data.data.title+'" disabled>\n' +
                                '                    <span class="btn">copy</span>\n' +
                                '                </div>\n' +
                                '                <div class="item">\n' +
                                '                    <span class="title">解析封面</span>\n' +
                                '                    <input type="text" value="'+res.data.data.coverUrls[0]+'" disabled>\n' +
                                '                    <span class="btn">copy</span>\n' +
                                '                </div>\n'+
                                '                <div class="item">\n' +
                                '                    <span class="title">解析视频</span>\n' +
                                '                    <input type="text" value="'+res.data.data.videoUrls[0]+'" disabled>\n' +
                                '                    <span class="btn">copy</span>\n' +
                                '                </div>'
                            $(".parse-result").html(html)
                        }else {
                            html += '<div class="item">\n' +
                                '                    <span class="title">解析标题</span>\n' +
                                '                    <input type="text" value="'+res.data.data.title+'" disabled>\n' +
                                '                    <span class="btn">copy</span>\n' +
                                '                </div>'
                            for (var i =0;i<res.data.data.pics.length;i++){
                                html+= '                <div class="item">\n' +
                                    '                    <span class="title">解析封面'+i+'</span>\n' +
                                    '                    <input type="text" value="'+res.data.data.pics[i]+'" disabled>\n' +
                                    '                    <span class="btn">copy</span>\n' +
                                    '                </div>'
                            }
                            $(".parse-result").html(html)
                        }
                        $(".parse-result .item .btn").on('click', function (){
                            copyText($(this).prev().val())

                            function copyText(text) {
                                var oInput = document.createElement('input');
                                oInput.value = text;
                                document.body.appendChild(oInput);
                                oInput.select(); // 选择对象
                                document.execCommand("Copy"); // 执行浏览器复制命令
                                oInput.className = 'oInput';
                                oInput.style.display='none';
                                cocoMessage.success("复制成功")
                            }
                        })
                    }else {

                    }
                    console.log(res)
                },
            })
        }
    })
}

Main.prototype.listenMp3ParseBtnEvent = function (){
    var self = this
    var parse_input = $(".parse-mp3-content .input-content input")
    $("#parseBtnMp3").on('click', function (){
        var parse_val = parse_input.val()

        if (!parse_val){
            cocoMessage.error("请输入歌手或歌曲名称")
        }else {
            $(".parse-loading-style").show()
            var html = ''
            more_ajax.post({
                "url":"/mp3_parse/",
                "data":{
                    "search_text":parse_val
                },
                "success":function (res){
                    $(".parse-loading-style").hide()
                    if (res.code ===200){
                        console.log(res)
                        cocoMessage.success("解析成功")
                        for (var i =0;i<res.data.data.list.length;i++){
                            html+= '                <div class="item">\n' +
                                '                    <span class="title">歌曲'+i+1+'</span>\n' +
                                '                    <input type="text" value="'+res.data.data.list[i].song_name+'-'+res.data.data.list[i].artist+'" disabled>\n' +
                                '                    <span class="btn" data-url="'+res.data.data.list[i].link+'">copy</span>\n' +
                                '                </div>'
                        }
                        $(".parse-result").html(html)
                        $(".parse-result .item .btn").on('click', function (){
                            var song_link = $(this).attr("data-url")
                            more_ajax.post({
                                "url":"/mp3_download/",
                                "data":{
                                    "song_link":song_link
                                },
                                "success":function (res){
                                    if (res.code===200){
                                        copyText(res.data.data.music.mp3_url)
                                        function copyText(text) {
                                            var oInput = document.createElement('input');
                                            oInput.value = text;
                                            document.body.appendChild(oInput);
                                            oInput.select(); // 选择对象
                                            document.execCommand("Copy"); // 执行浏览器复制命令
                                            oInput.className = 'oInput';
                                            oInput.style.display='none';
                                            cocoMessage.success("复制成功")
                                        }
                                    }
                                }
                            })
                        })
                    }
                }
            })
        }
    })
}


Main.prototype.run = function (){
    var self = this
    self.listenNavDropEvent()
    self.listenRightTabEvent()
    self.AuthBtnEvent()
    self.listenRewardEvent()
    self.listenShowHideRewardEvent()
    self.listenGetCaptchaBtnEvent()
    self.listenClickNavUserItemEvent()
    self.listenSubmitLoginEvent()
    self.listenLineTabEvent()
    self.listenCommentSubmitEvent()
    self.listenReplayCommentBtnEvent()
    self.listenGiteeLoginBtnEvent()
    self.listenGitHubLoginBtnEvent()
    self.listenQQLoginBtnEvent()
    self.listenParseVideoEvent()
    self.listenMp3ParseBtnEvent()
}


$(function (){
    var main = new Main()
    main.run()
})


