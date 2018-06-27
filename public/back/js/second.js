/**
 * Created by JHPC on 2018/6/27.
 */

$(function () {

  var currentPage = 1;
  var pageSize = 5;

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template('tpl',info);
        $('tbody').html(htmlStr);

        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  };

  //添加显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show')

    // 发送 ajax 请求, 获取下拉菜单的数据, 进行渲染下拉菜单
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('categoryTpl',info)
        $('.dropdown-menu').html(htmlStr);
      }
    })


  });



  // 3. 给 dropdown-menu 注册委托事件, 让 a 可以被点击
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownTxt').text(txt);

    // 获取 id, 设置 name="categoryId" 的 input 框
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);

    // 用户选择了一级分类后, 需要将 name="categoryId" input 框的校验状态置成 VALID
    // 参数1: 字段名, 参数2: 设置成什么状态, 参数3: 回调(配置提示信息)
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')

  });


  // 4. 进行 jquery-fileupload 实例化, 里面配置图片上传后的回调函数
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result.picAddr);
      var picUrl = data.result.picAddr;

      $('#imgBox img').attr('src',picUrl);

      $('[name="brandLogo"]').val(picUrl);

      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')

    }
  });

  // 5.通过表单校验插件实现表单校验功能
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //   默认不校验 隐藏域的 input, 我们需要重置 excluded 为 [], 恢复对 隐藏域的校验
    excluded: [],

    //配置图标
    feedbackIcons : {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    //校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一个一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });


  // 6.阻止默认的提交,使用ajax提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $(this).serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          $('#addModal').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true);
          currentPage = 1;
          render();
          $('#dropdownTxt').text('请选择一级分类');
          $('#imgBox').attr('src','images/none.png');
        }
      }
    })
  })



})
