/**
 * Created by JHPC on 2018/6/25.
 */

if (location.href.indexOf('login.html') === -1) {
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function(info) {
      if (info.success) {
        console.log('当前用户已登录');
      }
      if (info.error === 400) {
        location.href = 'login.html';
      }
    }
  })
}


//进度条
$(document).ajaxStart(function() {
  NProgress.start();
});

$(document).ajaxStop(function() {
  setTimeout(function(){
    NProgress.done()
  },50000)
})

//公共功能
$(function() {
  //1.左侧二级菜单切换显示
  $('.lt_aside .category').click(function () {
    $('.lt_aside .child').stop().slideToggle();
  })
  //2.左侧整个侧边栏显示隐藏功能
  $('.lt_topbar .icon_menu').click(function () {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  })


  //3.点击头部退出按钮,显示退出模态框
  $('.lt_topbar .icon_logout').click(function() {
    $('#logoutModal').modal('show')
  })

  //4.点击模态框中的退出按钮,需要进行退出操作(ajax)
  $('#logoutBtn').click(function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        if(info.success) {
          location.href = 'login.html';
        }
      }
    })
  })

})