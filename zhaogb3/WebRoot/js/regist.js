﻿/**
 * 
 */
$(function(){
	//alert(migrantId);
	var salaryId;  //薪资id
	//var age;   //年龄
	var sex=0;
	var itemFatherName1;  //第一个父职业的name
	$(document).ready(function() {
	/* 	 //测试用
		var itemFather = [{
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
		}]*/
		//工资类别
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
		
		//选择性别的点击事件
		$(".text_m").click(function() {
			sex = 1;
			$(".text_mw").css({
				"background-color": "#f5f5f5",
				"color": "#A2A8B3"
			});
			$(this).css({
				"background-color": "#71C671",
				"color": "#FFFFFF"
			});
		});
		$(".text_m").trigger("click");
		$(".text_mw").click(function() {
			sex = 2;
			$(".text_m").css({
				"background-color": "#f5f5f5",
				"color": "#A2A8B3"
			});
			$(this).css({
				"background-color": "#71C671",
				"color": "#FFFFFF"
			});
		});
		$(".text_pay").focus(function() {
			$(".text_pay").css("background-color", "#FFFFCC");
			$(".select_pay,.select_pay_bg").show();
			$(".text_pay").blur();
		});
		$(".select_sure").click(function() {
			var value = $('input:radio[name="wages"]:checked').val(); //获取薪资value
			salaryId=value;
			$(".select_pay,.select_pay_bg").hide();
			$(".text_pay").css("background-color", "#F5F5F5");
			$(".text_pay").val(wages[value - 1].salary);
		});
		$(".select_close").click(function() {
			$(".select_pay,.select_pay_bg").hide();
			$(".text_pay").css("background-color", "#F5F5F5");
		});
		$(".text_job").click(function() { //点击岗位文本框触发
			$(".select_ul").empty();
			$(".text_job").css("background-color", "#F5F5F5");
			$(".select_job").show();
			$(".select1_job").show();
			$(".text_job").blur();
			$.ajax({      //向后台获取父职业
				type:'post',
	            url:'/zhaogb/getItem',   
	            //data:json,   
	            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
	            success:function(itemFather){  
	            //data为fatherId为0的职位对象数组，用data[i].id格式获取数据，以下将data【i】.name放到html文件中
	            //alert(data[1].name);
	            //将父职业放到页面中
	            	itemFatherName1=itemFather[0].name;
	            	showItemFather(itemFather);
	            	showItemFather1()//父职业1 被选中的事件
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }
	         
	         }); 	
			
		})
		
		$(".select1_job").click(function() {
			$(".select_job").hide();
			$(".select2_job").hide();
		})
		$(".text_phone").focus(function() {
		$(".text_phone").css("background-color", "#FFFFCC");
		   });
		$(".text_phone").blur(function() {
		$(".text_phone").css("background-color", "#F5F5F5");
		   });
		
		//选择年龄
		$(".text_age").focus(function() {
			$(".text_age").css("background-color", "#FFFFCC");
			//$(".select_age,.select_pay_bg").show();
		});
//		$(".text_age").click(function() {
//			$(".text_age").css("background-color", "#F5F5F5");
//			$(".select_age,.select_pay_bg").hide();
//		});
//		$(".select_close1").click(function() {
//			$(".select_age,.select_pay_bg").hide();
//		});
//		$(".select_sure1").click(function() {
//			//var age = jsGetAge($(".text_data").val());
//			getAge();
//			$(".select_age,.select_pay_bg").hide();
//		});
		$(".text_age").blur(function() {
			if($(".text_age").val().length==0){
				alert("年龄不能为空");
				$(".text_age").focus();				
			}
			else if(isNaN($(this).val())){
				alert("年龄必须为数字");
				$(".text_age").val("");
				$(".text_age").focus();	
			}
			$(".text_age").css("background-color", "#F5F5F5");
			
		});
		
		/*$(".select_ul").click(function(){
			alert('hi');
			
		})
		$(".select_ul").trigger('click');
		$(".cli").click(function(){
			alert('hihi');
			
		})
		$(".cli").trigger('click');*/
		
		//发布信息的点击事件
		$(".public_infor").click(function(){
			//alert('hi');
			if(check_submit()){
			//getAge();  //获取年龄
			//alert(salaryId);
			var user={
				"name":$(".text_name").val(),
			   // "sex":$(".text_sex").val(),
				"sex":sex,
			    "age":$(".text_age").val(),
			    "salary":salaryId,
			    "itemName":$(".text_job").val(),
			    "phone":$(".text_phone").val()					
			}
			
			//alert(user.itemName);
			
			$.ajax({ 
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				type:'post',
	            url:'/zhaogb/saveMessage',   
	            data:user,   
	            dataType:'text', //很重要!!!.预期服务器返回的数据类型   
	            success:function(data){  
	            //data为fatherId为id的职位对象数组，用data[i].id格式获取数据，以下将data【i】.name放到html文件中
	            	//
	            	alert(data);
	            
	       
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }         
	         });
			}
			
		})	
		
	});
	
	function showItemFather(itemFather){
		//alert('itemFather');
		for (var i = 0; i < itemFather.length; i++) {
			var count = 'item' + i;
			$(".select_ul").append("<li class='" + count + "'>" + itemFather[i].name + "</li>");
			
		}
		
	}
	//父职业1 的事件
	function showItemFather1(){
		//alert(itemFatherName1);
		$(".select_ul li:first").addClass('on').siblings().removeClass('on');
		$(".select2_job ul").empty();
		$(".select2_job").show();
		$.ajax({    //根据父职业id获取子职业的信息
			type:'post',
            url:'/zhaogb/getItemChild',   
            data:{"name":itemFatherName1},   
            dataType:'json', //很重要!!!.预期服务器返回的数据类型   
            success:function(itemChild){  
            //data为fatherId为id的职位对象数组，用data[i].id格式获取数据，以下将data【i】.name放到html文件中
            	//alert(data[1].name);
            	//alert(itemChild[0].name);
            	showItemChild(itemChild);
            },
            error:function(){   
                alert("error occured!!!");   
            }         
         }); 
		
		
	}
	
	//父职业的点击事件,显示子职业
	$('.select_ul').on('click','li',function(){  
	   // alert($(this).text()); //弹出点击的li标签的value值
		   //alert('fatherClick');
		    var fatherName=$(this).text();
		    $(this).addClass('on').siblings().removeClass('on');
			$(".select2_job ul").empty();
			$(".select2_job").show();
			$.ajax({    //根据父职业id获取子职业的信息
				type:'post',
	            url:'/zhaogb/getItemChild',   
	            data:{"name":fatherName},   
	            dataType:'json', //很重要!!!.预期服务器返回的数据类型   
	            success:function(itemChild){  
	            //data为fatherId为id的职位对象数组，用data[i].id格式获取数据，以下将data【i】.name放到html文件中
	            	//alert(data[1].name);
	            	showItemChild(itemChild);
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }         
	         }); 
		
		
	}); 
	
	//显示子职业
	function showItemChild(itemChild){
		//alert('itemChild');
		for (var j = 0; j < itemChild.length; j++) {
			$(".select_u2").append("<li>" + itemChild[j].name + "</li>");
		}
		
	}
	
	//为子职业绑定click事件，点击时将子职业放到岗位文本框中
	$('.select_u2').on('click','li',function(){ 
		$(".select1_job").hide();
		$(".select2_job").hide();
		$(".select_job").hide();
		$(".text_job").val($(this).text());
		
		
	})
	
	
	
	//发布信息时判断组件是否为空
	function check_submit(){
		//alert('hi');
		if($(".text_name").val().length==0)
		{
			 alert('名字不能为空 ');
			 return false;
		}
		//if(!$(':radio[name=text_sex]:checked').length)
		if(sex==0)
		{
			 alert('性别没有选');
			 return false;
		}
		if($(".text_age").val().length==0)
		{
			 alert('年龄不能为空 ');
			 return false;
		}
		if($(".text_pay").val().length==0)
		{
			 alert('期望工资不能为空 ');
			 return false;
		}
		if($(".text_job").val().length==0)
		{
			 alert('岗位不能为空 ');
			 return false;
		}
		if($(".text_phone").val().length==0)
		{
			 alert('手机号码不能为空 ');
			 return false;
		}
		return true ;	
	}
	
	//验证手机号码格式
	$(".text_phone").blur(function(){	 
		if ($(".text_phone").val() == "") { 
		alert("手机号码不能为空！"); 
		//$("#moileMsg").html("<font color='red'>手机号码不能为空！</font>"); 
		$(".text_phone").focus(); 
		} 
		else if(!($(".text_phone").val().match(/^(((13[0-9]{1})|(18[0-9]{1})|159|153)+\d{8})$/))) { 
		//else if(!$(".text_phone").val().match(/^[1][3][0-9]{9}$/)){
		alert("手机号码格式不正确！");
		$(".text_phone").val("");
		//$("#moileMsg").html("<font color='red'>手机号码格式不正确！请重新输入！</font>"); 
		$(".text_phone").focus(); 
		} 	
	})
	
});