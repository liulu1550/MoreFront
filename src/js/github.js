function GitHub(){
    var self = this
    self.githubListWrapper = $(".github-list")
    // self.githubItemWrapper = $(".github-item")
    self.githubLoading = $(".github-list .loading")
}

GitHub.prototype.listenUserRespEvent = function (){
    var self = this
   var html = ''
   // var item = []
    more_ajax.get({
        "url":"https://api.github.com/users/liulu1550/repos",
        "success":function (res){
            self.githubLoading.hide()
            for (var i=0;i<res.length;i++){
                html += '<div class="github-item">\n' +
                    '                                        <div class="title line1">'+res[i]['name']+'</div>\n' +
                    '                                        <div class="desc line1">'+res[i]['description']+'</div>\n' +
                    '                                        <div class="options">\n' +
                    '                                            <div class="item">\n' +
                    '                                                <i class="iconfont icon-star"></i><span>'+res[i]['stargazers_count']+'</span>\n' +
                    '                                            </div>\n' +
                    '                                            <div class="item">\n' +
                    '                                                /\n' +
                    '                                            </div>\n' +
                    '                                            <div class="item">\n' +
                    '                                                <i class="iconfont icon-fork"></i><span>'+res[i]['forks_count']+'</span>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                        <a href="'+res[i]['clone_url']+'" class="to-github" target="_blank">\n' +
                    '                                            <i class="iconfont icon-hand-up"></i><span>访问</span>\n' +
                    '                                        </a>\n' +
                    '                                        <span class="github-type">'+res[i]['language']+'</span>\n' +
                    '                                    </div>'
            }
            self.githubListWrapper.html(html)
        }
    })
    // console.log(item)

}

GitHub.prototype.run = function (){
    var self = this
    self.listenUserRespEvent()
}

$(function (){
    var github = new GitHub()
    github.run()
})
