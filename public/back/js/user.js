/**
 * Created by JHPC on 2018/6/26.
 */



$(function(){

  var currentPage = 1;//
  var pageSize = 5;


  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tpl',info);
        $('tbody').html(htmlStr);


        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(a, b, c, page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage = page;
            render();
          }
        });
      }
    })
  }


  //2.启动禁用功能,点击按钮,弹出模态框(复用,用的是同一个模态框)
  //通过事件委托来注册点击事件,效率更高
  $('tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
    //点击的时候,将当前选中的用户id记录在全局的currentId
    currentId = $(this).parent().data('id');
    //点击禁用按钮,让用户变成禁用状态,让isDelete变成0
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  });

  //3.点击确认按钮,需要根据id和isDelete发送ajax请求,修改用户状态
  $('#submitBtn').click(function(){
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          $('#userModal').modal('hide');
          render();
        }
      }
    })
  })








})
