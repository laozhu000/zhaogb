$(function() {
	/*var itemFather = [{
		"name": "机械"
	}, {
		"name": "电子"
	}]
	var itemChild = [{
		"name": "铸造工"
	}, {
		"name": "锻造工"
	}, {
		"name": "计算机维修工"
	}, {
		"name": "电子设备装接工"
	}]

	var station = [{
		"name": "熟练钳工",
		"salary": 3,
		"companyadd": "中国江苏宜兴市丁蜀镇陶瓷产业园通蠡路5号",
		"weal": "1",
		"companyname": "江苏蓝翔线缆股份有限公司"
	}, {
		"name": "普工",
		"salary": 8,
		"companyadd": "广州市番禺区南村镇市头东线大道南排21号",
		"weal": "2",
		"companyname": "广州冰泉制冷设备有限责任公司"
	}, {
		"name": "熟练钳工",
		"salary": 3,
		"companyadd": "中国江苏宜兴市丁蜀镇陶瓷产业园通蠡路5号",
		"weal": "3",
		"companyname": "江苏蓝翔线缆股份有限公司"
	}]
	*/
	
	var companyInfor;  //公司信息
	var station;     //岗位情况
	var num=0;    //岗位下标
	var condition={   //条件，为0表示没选该条件
		    "salary":0,
		    "itemId":0			  //初值应为0	
		}	
	
	var wages = [{
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
	var weals = [{
		"weal": "有厂车"
	}, {
		"weal": "包吃"
	}, {
		"weal": "包住"
	}]

	$(document).ready(function() {
		//creat_part();
		getStation();  //加载岗位
		creat_tip(weals);
		//点击工资泡沫弹框
		$(".t.rec-salary").click(function() {
			$(".salary-bg").show();
			$(".popover-salary").show();
		});
		//动态生成工资子组件
		for (var j = 1; j <= wages.length; j++) {
			$(".table-view.salary-select").append("<li class='table-view-cell' value="+j+">" + wages[j-1].salary + "</li>");
		}
		//点击工资子组件
		$(".table-view.salary-select").on('click', 'li', function() {
			$(".salary-bg").hide();
			$(".popover-salary").hide();
			condition.salary=$(this).attr('value');	
			//alert(condition.salary);
			//alert(condition.salary);
			//$(".page_infor li").empty();
			getStation();  //刷新岗位页面
			
		});
		//点击职位弹出框
		$(".t.rec-job").click(function() {
			$(".rec-top").hide();
			$(".recommend-job").show();
			$(".table-view.job-father-ul").empty();
			getFatherItem();
			//creat_father(itemFather);
			$(".table-view.job-father-ul li:first").trigger("click");
		});
		//点击x关闭弹框
		$(".icon.icon-close.ijob").click(function() {
			$(".recommend-job").hide();
			$(".rec-top").show();
		});
		
		//父职业的点击事件，生成子职业列表
		$(".table-view.job-father-ul").on('click', 'li', function() {
			$(this).addClass('on').siblings().removeClass('on');
			$(".table-view.job-child-ul").empty();
			var fatherName=$(this).text();
			getChildItem(fatherName);
			//creat_child(itemChild);
		});
		
		//子职业的点击事件
		$(".table-view.job-child-ul").on('click', 'li', function() {
			$(".rec-top").show();
			$(".recommend-job").hide();
			condition.itemId=$(this).attr('value');
			//alert(condition.itemId);			
			getStation();  //刷新岗位页面
		});
	});
	
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
               //	showStation();   //显示岗位信息
               	creat_part();  
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
            	//alert('hi');
            	companyInfor=data;
            	//show companyInfor 待写
               //alert(companyInfor.name);
            },
            error:function(){   
                alert("error occured!!!");   
            }
         
         });		
	}	
	
	//获取父职业
	function getFatherItem(){
		$.ajax({      //向后台获取父职业
			async: false, 
			type:'post',
            url:'/zhaogb/getItem',   
            //data:json,   
            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
            success:function(itemFather){  
            //data为fatherId为0的职位对象数组，用data[i].id格式获取数据，以下将data【i】.name放到html文件中
//            	for (var i = 0; i < itemFather.length; i++) {
//    				$(".sub-nav").append("<li>" + itemFather[i].name + "</li>");
//    			}
            	
            	creat_father(itemFather);  //显示父职业列表
            },
            error:function(){   
                alert("error occured!!!");   
            }
         
         });		
	}
	
	//根据父职业名称获得子职业
	function getChildItem(fatherName){
		$.ajax({    //根据父职业id获取子职业的信息
			type:'post',
            url:'/zhaogb/getItemChild',   
            data:{"name":fatherName},   
            dataType:'json', //很重要!!!.预期服务器返回的数据类型   
            success:function(itemChild){  
            //data为fatherId为id的职位对象数组，用data[i].id格式获取数据，以下将data【i】.name放到html文件中
//            	for (var j = 0; j < itemChild.length; j++) {
//    				$(".sub-nav1").append("<li value="+itemChild[j].id+">" + itemChild[j].name + "</li>");
//    			}
            	creat_child(itemChild);
            },
            error:function(){   
                alert("error occured!!!");   
            }         
         });
		
		
	}
	//生成岗位信息   
	function creat_part() {
		   $(".items").empty();
			for (var i = 0; i < station.length; i++) {
				getCompany(station[i].companyId);  //根据companyId获取公司信息  
				var html = "<div class='rec-part'>" +
					"<ul class='rec-ul'>" +
					"<li class='table-view-cell span1'>" +
					"<div class='part p1'>" + station[i].name + "" +
					"<span class='s'>" + wages[station[i].salary - 1].salary + "</span></div></li>" +
					"<li class='table-view-cell'>" +
					"<div class='part p2'>" + companyInfor.name + "</div></li>" +
					"<li class='table-view-cell tips'>" +
					"<ul class='weals-ul'>"+
					"</ul></li>" +
					"<li class='table-view-cell'>" +
					"<img src='img/img5.png' height='17px' width='14px' class='image5'>" +
					"	<div class='part p4'>" + companyInfor.address + "</div></li>" +
					"<li class='table-view-cell span2'>" +
					"	<div class='part p5'>已申请<span class='number'>20人</span></div>" +
					"	<div class='part pt5'>评论<span class='number'>7条</span></div>" +
					"<div class='btn-ne'><a href='javascript:;' value="+i+">申请岗位</a></div></li></ul>";
				$(".items").append("<li>" + html + "</li>");
			}
		}
	
	//生成福利图标
	function creat_tip(weals){
		for(var n=0;n<weals.length;n++){
			$(".weals-ul").append("<li><span class='tip'>"+weals[n].weal+"</span></li>");		
		}
	}
		//生成选择岗位父节点
	function creat_father(itemFather) {
			for (var k = 0; k < itemFather.length; k++) {
				$(".table-view.job-father-ul").append("<li class='table-view-cell'>" + itemFather[k].name + "</li>");
			}
		}
		//生成选择岗位子节点
	function creat_child(itemChild) {
		for (var m = 0; m < itemChild.length; m++) {
			$(".table-view.job-child-ul").append("<li class='table-view-cell' value="+itemChild[m].id+">" + itemChild[m].name + "</li>");
		}
	}

	   //为申请岗位绑定click事件	
	   $(document).on('click','a',function(){   //为document 的a href 绑定click事件
	     num=$(this).attr('value');   //num为申请岗位的id
	    // showStationInfor();
	     window.location.href='work.html?id='+station[num].id+'';
	
    })
});