/**
 * Created by Jepson on 2018/6/25.
 */


/*
 * 1. 进行表单校验配置
 *    校验要求:
 *        (1) 用户名不能为空, 长度为2-6位
 *        (2) 密码不能为空, 长度为6-12位
 * */
$(function() {

  // 表单校验初始化
  $('#form').bootstrapValidator({

    //配置图标
    feedbackIcons : {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },


    // 指定校验字段
    fields: {
      username: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          // 配置长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在 2-6位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          // 配置长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在 6-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  //使用submit按钮,进行提交,表单校验插件,会在提交时,进行校验
  /*
  * 1.如果校验成功,会默认提交这次请求,进行跳转我们需要阻止这次提交,用ajax提交
  * 2.如果校验失败,会提示用户,输入有误
  * 需要注册表单校验成功事件, 在成功事件内, 阻止默认的表单提交, 通过 ajax 进行提交
  *
  * */

  $('#form').on("success.form.bv",function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = 'index.html'
        }
        if (info.error === 1000) {
          //alert('用户名错误');
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
        }
        if (info.error === 1001) {
          //alert('密码错误')
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
        }
      }
    })
  })


  /*
  * 重置表单,需要重置内容,并且需要重置校验状态
  * */
  $('[type="reset"]').click(function() {
    $('#form').data('bootstrapValidator').resetForm();
  })


});