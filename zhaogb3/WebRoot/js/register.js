$(function() {
	
	/*var itemFather = [{   //测试数据
			"id": 1,
			"fatherId": 0,
			"name": "机械"
		}, {
			"id": 10,
			"fatherId": 0,
			"name": "电子"
		}]
		var itemChild = [{
			"id": 2,
			"fatherId": 1,
			"name": "铸造工"
		}, {
			"id": 3,
			"fatherId": 1,
			"name": "锻造工"
		}, {
			"id": 11,
			"fatherId": 10,
			"name": "计算机维修工"
		}, {
			"id": 12,
			"fatherId": 10,
			"name": "电子设备装接工"
		}]   */   
	var salaryId;     //薪资id
	var sex ;         //性别
	var age;     //年龄
	//var num=0;       //判断是否发布过消息，发布之后才能到推荐岗位页面中去
	var wages = [{
						"salary": "1500以下"
					}, {
						"salary": "1500~1999"
					}, {
						"salary": "2000~2999"
					}, {
						"salary": "3000~3999"
					}, {
						"salary": "4000~4999"
					}, {
						"salary": "5000~6999"
					}, {
						"salary": "7000以上"
					}, {
						"salary": "面议"
					}]
	
	
	$(document).ready(function() {
		//填写姓名
		$(".text-name").focus(function() {
			$(".text-name").css("background-color", "#FFFFCC");
		});
		$(".text-name").blur(function() {
			$(".text-name").css("background-color", "#F2F2F2");
		});

		//选择性别
		$(".btn-sex.w").click(function() {
			sex = 1;
			$(".btn-sex.wo").css({
				"background-color": "#F2F2F2",
				"color": "#A2A8B3"
			});
			$(this).css({
				"background-color": "#71C671",
				"color": "#FFFFFF"
			});
		});
		$(".btn-sex.w").trigger("click");
		$(".btn-sex.wo").click(function() {
			sex = 2;
			$(".btn-sex.w").css({
				"background-color": "#F2F2F2",
				"color": "#A2A8B3"
			});
			$(this).css({
				"background-color": "#71C671",
				"color": "#FFFFFF"
			});
		});

		//点击年龄
		$(".text-age").focus(function() {
			$(".text-age").css("background-color", "#FFFFCC");
		});
		$(".text-age").blur(function() {
			$(".text-age").css("background-color", "#f5f5f5");
		});
		$(".text-age").click(function(){
			$(".select-age").show();
			$(".select-age-bg").show();
			$(".text-age").blur();	
		});
		//选择年龄
		$(".table-view-cell.sage").click(function(){
			var value=$(this).text();
			age =$(this).attr('value');
			$(".select-age").hide();
			$(".select-age-bg").hide();
			$(".text-age").val(value);
		});
		//点击关闭
		$(".icon.icon-close.iage").click(function(){
			$(".select-age").hide();
			$(".select-age-bg").hide();
		});

		//选择期望工资
		$(".text-salary").focus(function() {
			$(".text-salary").css("background-color", "#FFFFCC");
			$(".select-pay").show();
			$(".select-pay-bg").show();
			$(".text-salary").blur();
		});
		//确定期望工资
		$(".btn-select.check").click(function() {
			var value = $('input:radio[name="wages"]:checked').val();
			salaryId=value;
			$(".select-pay,.select-pay-bg").hide();
			$(".text-salary").css("background-color", "#F5F5F5");
			$(".text-salary").val(wages[value - 1].salary);
		});
		//取消期望工资
		$(".btn-select.close").click(function() {
			$(".select-pay,.select-pay-bg").hide();
			$(".text-salary").css("background-color", "#F5F5F5");
		});
		//选择岗位
		$(".text-job").click(function(){
			$(".father-ul").empty();
			$(".child-ul").empty();
			$(".text-job").css("background-color", "#F5F5F5");
			$(".select-job").show();
			$(".text-job").blur();
			showItem_father();			
			$(".father-ul li:first").trigger("click");
		});
		
		//生成子节点	
		$(".father-ul").on('click', 'li', function() {
			       var fatherName=$(this).text();
					$(this).addClass('on').siblings().removeClass('on');
					$(".child-ul").empty();
					showItem_child(fatherName);
				});
		//点击子节点返回
		$(".child-ul").on('click', 'li', function() {
					$(".select-job").hide();
					$(".text-job").val($(this).text());
				});
	   //点击返回箭头返回
	   $(".icon.icon-left-nav").click(function(){
	   	$(".father-ul").empty();
	   	$(".child-ul").empty();
	   	$(".select-job").hide();	   	
	   });
	   
	   //返回首页
	   $(".image1").click(function(){
			location.href="introduce.html";
		});

		//填写手机号
		$(".text-phone").focus(function() {
			$(".text-phone").css("background-color", "#FFFFCC");
		});
		$(".text-phone").blur(function() {
			$(".text-phone").css("background-color", "#F2F2F2");
		});
		
		//发布信息的点击事件
		$(".btn-publish").click(function(){
			if(check_submit()){   //判断各信息不为空
			var user={
				"name":$(".text-name").val(),
			   // "sex":$(".text_sex").val(),
				"sex":sex,
			    "age":age,
			    "salary":salaryId,
			    "itemName":$(".text-job").val(),
			    "phone":$(".text-phone").val()					
			}
			
			//alert(user.itemName);			
			$.ajax({ 
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				type:'post',
	            url:'/zhaogb/saveMessage',   
	            data:user,   
	            dataType:'json', //很重要!!!.预期服务器返回的数据类型   
	            success:function(data){  
	            	alert('发布信息成功');
	            	$.session.set('migrantId',data.id);
	            	//alert(data.id);
	            	//var c=;
	            	//alert($.session.get('migrantId'));
	            	//alert(data); //提示信息
	            	//num=1;       //用来判断是否发布信息过了
	            	//alert(data.id);
	            	//document.cookie="id="+data.id;	            	
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }         
	         });
			}
			
		})

	});

    //生成父节点
    function showItem_father(){
    	$.ajax({      //向后台获取父职业
    		async: false,
			type:'post',
            url:'/zhaogb/getItem',   
            //data:json,   
            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
            success:function(itemFather){  
            	for(var i=0;i<itemFather.length;i++){
            		var count = 'items' + i;
            		$(".father-ul").append("<li class='" + count + "'>" + itemFather[i].name + "</li>");
            	}
            },
            error:function(){   
                alert("error occured!!!");   
            }
         
         }); 	
    	
    }
    
    //生成子节点
    function showItem_child(fatherName){
    	$.ajax({    //根据父职业id获取子职业的信息
			type:'post',
            url:'/zhaogb/getItemChild',   
            data:{"name":fatherName},   
            dataType:'json', //很重要!!!.预期服务器返回的数据类型   
            success:function(itemChild){  
            	for (var j = 0; j < itemChild.length; j++) {
					$(".child-ul").append("<li>" + itemChild[j].name + "</li>");
				}
            },
            error:function(){   
                alert("error occured!!!");   
            }         
         });     	
    }
    
    //推荐岗位的点击事件，页面跳转到recommend.html
    $(".tuijian").click(function(){
    		window.location.href=response.encodeURL('recommend.html');        
    })
    
	//验证手机号码格式
	$(".text-phone").blur(function(){	 
		if ($(".text-phone").val() == "") { 
		alert("手机号码不能为空！"); 
		//$("#moileMsg").html("<font color='red'>手机号码不能为空！</font>"); 
		$(".text-phone").focus(); 
		} 
		else if(!($(".text-phone").val().match(/^(((13[0-9]{1})|(18[0-9]{1})|(15[0-9]{1}))+\d{8})$/))) { 
		//else if(!$(".text_phone").val().match(/^[1][3][0-9]{9}$/)){
		alert("手机号码格式不正确！");
		$(".text-phone").val("");
		//$("#moileMsg").html("<font color='red'>手机号码格式不正确！请重新输入！</font>"); 
		$(".text-phone").focus(); 
		} 	
	})
    
	//点击发布消息，验证各条信息不为空
	function check_submit() {
		if ($(".text-name").val().length == 0) {
			alert('名字不能为空 ');
			return false;
		}
		if ($(".text-age").val().length == 0) {
			alert('年龄不能为空 ');
			return false;
		}
		if ($(".text-salary").val().length == 0) {
			alert('期望工资不能为空 ');
			return false;
		}
		if ($(".text-job").val().length == 0) {
			alert('岗位不能为空 ');
			return false;
		}
		if ($(".text-phone").val().length == 0) {
			alert('手机号不能为空');
			return false;
		}
		return true;
	}
});