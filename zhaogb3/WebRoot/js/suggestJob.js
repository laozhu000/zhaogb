/**
 * 
 */

$(function(){
	
	var companyInfor;  //公司信息
	var station;     //岗位情况
	var num=0;    //岗位下标
	var condition={   //条件，为0表示没选该条件
		    "salary":0,
		    "itemId":0			  //初值应为0	
		}	
	
	var wages = [{           //月薪
		"salary": "1500以下/月"
	}, {
		"salary": "1500~1999/月"
	}, {
		"salary": "2000~2999/月"
	}, {
		"salary": "3000~3999/月"
	}, {
		"salary": "4000~4999/月"
	}, {
		"salary": "5000~6999/月"
	}, {
		"salary": "7000以上/月"
	}, {
		"salary": "面议"
	}]
	
	$(document).ready(function(){		
		
		getStation();  //进入页面加载所有的岗位

		$(".filter3").click(function() {  //岗位的点击事件，点击弹出父职业
			$(".top_job").show();
			$(".sub-nav").empty();
			$(".sub-nav1").empty();
			$.ajax({      //向后台获取父职业
				type:'post',
	            url:'/zhaogb/getItem',   
	            //data:json,   
	            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
	            success:function(itemFather){  
	            //data为fatherId为0的职位对象数组，用data[i].id格式获取数据，以下将data【i】.name放到html文件中
	            	for (var i = 0; i < itemFather.length; i++) {
	    				$(".sub-nav").append("<li>" + itemFather[i].name + "</li>");
	    			}
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }
	         
	         }); 
			
		});
		$(".sub-nav").on('click', 'li', function() {  //为父职业绑定点击事件，点击时显示子职业
			 var fatherName=$(this).text();
			$(this).addClass('on').siblings().removeClass('on');
			$(".sub-nav1").empty();
			$.ajax({    //根据父职业id获取子职业的信息
				type:'post',
	            url:'/zhaogb/getItemChild',   
	            data:{"name":fatherName},   
	            dataType:'json', //很重要!!!.预期服务器返回的数据类型   
	            success:function(itemChild){  
	            //data为fatherId为id的职位对象数组，用data[i].id格式获取数据，以下将data【i】.name放到html文件中
	            	for (var j = 0; j < itemChild.length; j++) {
	    				$(".sub-nav1").append("<li value="+itemChild[j].id+">" + itemChild[j].name + "</li>");
	    			}
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }         
	         }); 
			
		});
		$(".sub-nav1").on('click', 'li', function() {   //子职业的点击事件，点击后更新岗位为符合条件的岗位
			//alert('hi');
			//
			$(".top_job").hide();
			condition.itemId=$(this).attr('value');
			//alert(condition.itemId);			
			getStation();  //刷新岗位页面
		});
		$(".filter2").click(function() {     //薪资的点击事件，点击后显示薪资供选择
			$(".sub-nav2").empty();
			$(".top_pay").show();
			for (var k = 1; k <= wages.length; k++) {
				$(".sub-nav2").append("<li value="+k+">" + wages[k-1].salary + "</li>");
			}
		});
		$(".sub-nav2").on('click', 'li', function() {   //薪资的点击事件，点击后更新岗位为符合条件的岗位
			$(".top_pay").hide();
			condition.salary=$(this).attr('value');		
			//alert(condition.salary);
			//$(".page_infor li").empty();
			getStation();  //刷新岗位页面
		});

	})
	
	//获取岗位
	function getStation(){			
		$.ajax({      //向后台获取职业
			type:'post',
            url:'/zhaogb/showJob',   
            data:condition,   
            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
            success:function(data){
            	station=data;
            	//alert(data[0].name);
               	showStation();   //显示岗位信息
            	  
            },
            error:function(){   
                alert("error occured!!!");   
            }
         
         });		
		
	}
	
	 //根据companyId获取公司信息     
	function getCompany(companyId){
		$.ajax({ 
			async: false,     //设置ajax为同步   即ajax 先执行完，再执行后面页面的语句
			type:'post',
            url:'/zhaogb/getCompany',   
            data:{"companyId":companyId},   
            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
            success:function(data){
            	//alert(data.name);  
            	companyInfor=data;
            	//show companyInfor 待写
               //alert(companyInfor.name);
            },
            error:function(){   
                alert("error occured!!!");   
            }
         
         });		
	}	
	
	function showStation(){        //显示岗位信息
		$(".page_infor li").empty();
		for(var i=0;i<station.length;i++){
			
        	getCompany(station[i].companyId);  //根据companyId获取公司信息      
        	//alert("hi");
        	//alert(companyInfor.name);
		var html = "<div class='layout1_1'>" +
		"<span class='s'>"+wages[station[i].salary-1].salary+"</span>"+station[i].name+"</div>" +
		"<div class='layout1_2'><img src='img/6.png' class='image4'/>" +
		"	<div class='layout1_2_1'>"+companyInfor.name+"</div></div>" +
		"<div class='layout1_3 clearfix'>" +
		"	<div class='tip'>有厂车</div>" +
		"	<div class='tip 1'>包吃</div>" +
		"	<div class='tip 2'>包住</div>" +
		"	<div class='tip 3'>缴纳社保</div>" +
		"</div>" +
		"<div class='layout1_4'>" +
		"<div class='img1_4'></div>" +
		"<div class='address'>"+companyInfor.address+"</div>" +
		"</div>" +
		"<div class='layout1_5'>" +
		"<ul class='clearfix'>" +
		"<li>已申请<em>20</em>人</li>" +
		"<li>评论<em>7</em>条</li>" +
		"<li class='b'><a href='javascript:;' value="+i+">申请岗位</a></li></ul></div>";
	$(".page_infor").append("<li>" + html + "</li>");
		}		
	}
	
       //为申请岗位绑定click事件	
	   $(document).on('click','a',function(){   //为document 的a href 绑定click事件
	     num=$(this).attr('value');   //num为申请岗位的id
	    // showStationInfor();
	     window.location.href='work.html?id='+station[num].id+'';
	
       })
})