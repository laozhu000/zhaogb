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
	var wealString=""; //公司福利
	var num=0;    //岗位下标
	var migrantId;  //注册用户id
	var stationId;  //岗位id
	var condition={   //条件，为0表示没选该条件
		    "salary":0,
		    "itemId":0			  //初值应为0	
		}	
	//alert('hehe');
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
	
	/*var weals = [{
		"weal": "有厂车"
	}, {
		"weal": "包吃"
	}, {
		"weal": "包住"
	}]*/

	$(document).ready(function() {
		//alert('hehe');
		
		//creat_part();
		getStation();  //加载岗位 ,ajax是异步的
		//creat_tip(weals);
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
			//alert(condition.salary);
			//$(".page_infor li").empty();
			getStation();  //刷新岗位页面
			
		});
		//点击职位弹出框
		$(".t.rec-job").click(function() {
			$(".salary-bg").hide();
			$(".popover-salary").hide();
			$(".rec-top").hide();
			$(".items").hide();
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
			$(".items").show();
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
			$(".recommend").show();
			$(".rec-top").show();
			$(".recommend-job").hide();
			condition.itemId=$(this).attr('value');
			//alert(condition.itemId);			
			getStation();  //刷新岗位页面
		});
//		$(".rec-ul").on('click',$(".rec-ul li"),function(){
//			alert('hi');
//			location.href="details.html";
//		});
		
		
//		$(".items").on('click','li.itemsli',function(){
//			//alert('hi');
//			num=$(this).attr('value');
//			//alert(num);
//			location.href='details.html?id='+station[num].id+'';			
//		})
            
	});
	
	//为岗位信息绑定click事件
	$(document).on('click','.rec-ul',function(){
		//alert('hi');
		//console.log($(this))
		//$('.rec-ul').addClass('on');
		num=$(this).attr("value");
		//num=$(this).getAttribute('value');
		//alert(num);
		location.href='details.html?id='+station[num].id+'';
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
	function creat_part(){
		   $(".items").empty();
			for (var i = 0; i <station.length; i++) {		
				//$(".weals-ul").empty();
				//alert('hi');
				creat_tip(station[i].weal);
				getCompany(station[i].companyId);  //根据companyId获取公司信息  
				checkNull(i);
				var html = "<div class='rec-part'>" +
					"<ul class='rec-ul' value="+i+">" +
					"<li class='table-view-cell span1'>" +
					"<div class='part p1'>" + station[i].name + "" +
					"<span class='s'>" + wages[station[i].salary - 1].salary + "</span></div></li>" +
					"<li class='table-view-cell'>" +
					"<div class='part p2'>" + companyInfor.name + "</div></li>" +
					"<li class='table-view-cell tips'>" +
					"<ul class='weals-ul'>"+ wealString+
					"</ul></li>" +
					"<li class='table-view-cell'>" +
					"<img src='img/img5.png' height='17px' width='14px' class='image5'>" +
					"	<div class='part p4'>" + companyInfor.address + "</div></li></ul>" +
					"<ul class='rec-ul2'><li class='table-view-cell span2'>" +
					"	<div class='part p5'>已申请<span class='number'>20人</span></div>" +
					"	<div class='part pt5'>评论<span class='number'>7条</span></div>" +
					"<div class='btn-ne'><a href='javascript:;' value="+i+">申请岗位</a></div></li></ul>";
				$(".items").append("<li class='itemsli'>" + html + "</li>");
			}
		}
	
	//生成福利图标
	function creat_tip(weals){   //若有weal为null时，则无法显示出来   待做？？
		//alert('hi');
		wealString="";
		if(weals!=null){
			//alert('hi');
		var str=weals.split(',');
		//alert(str[0]);
		for(var n=0;n<str.length;n++){
			//alert('hi');
			//alert('hihi');
			//$(".weals-ul").append("<li><span class='tip'>"+str[n]+"</span></li>");
			wealString+="<li><span class='tip'>"+str[n]+"</span></li>";
		}
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
	     //getMigrantId();
	     stationId=station[num].id;
	     applyItem();  //申请岗位
	     //window.location.href='details.html?id='+station[num].id+'';	
	     
    })    
    
    //点击 岗位信息时，跳转到岗位详情页面
//    $(".rec-ul").on('click','li',function(){
//    	    alert('hi');
//			location.href="details.html";
//		});
  
    
    //获取注册用户id
    function getMigrantId(){  //向后台获取发布信息的用户id
			//alert("nini");
			$.ajax({     
				async: false,
				type:'post',
	            url:'/zhaogb/getMigrantId',   
	            //data:{"id":id},   
	            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
	            success:function(data){
	            		//alert('hi');
	            	//migrantId=data[data.length-1].id;   
	            	//alert(data.id);
	            	migrantId=data.id;
	            	//alert(migrantId);
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }
	         
	         });		
		}
    
	   
	 //申请岗位，将申请信息放到apply表中
		 function applyItem(){ 
			  var applyInfor;  //用户申请的岗位详情 
			  var i;//临时变量
			  var name="id";
			  //var cookieId;
			  //var temp=document.cookie.indexOf(name+"=");  //判断cookie是否为空
//			 if(temp==-1)        //cookie为空，说明用户没注册
//				 alert("请先注册！");
//			 else{                  //cookie不为空，用户已经注册过了
//				 //alert('hi');
//				 cookieId=document.cookie.split("=");  //获取cookie的id值
//				 if(cookieId[0]==name){
//				 migrantId=cookieId[1]; 
//				 //alert(migrantId);
//				 }
				 //getMigrantId(); //获取发布信息的用户id  测试时先注掉
			  
//			  var apply={
//					  "migrantId":migrantId,
//					  "stationId":id
//			  }		  
			  getMigrantId();
			  //查询apply表，看是否是申请同一个岗位
			  if(migrantId==null){
				  alert('请先注册');
			  }
			  else{
			  $.ajax({
				    async: false,
				    type:'post',
		            url:'/zhaogb/getApply',   
		            data:{"migrantId":migrantId},   
		            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
		            success:function(data){ 
		            	applyInfor=data;
		            },
		            error:function(){   
		                alert("error occured!!!");   
		            }	         
		         });
			  
			  if(applyInfor==null){
				  saveApply();
			  }
			  else{
			  for(i=0;i<applyInfor.length;i++){
				  if(applyInfor[i].stationId==stationId){
					  alert("您已经申请过该岗位，不要重复申请！");
					 break;  
				  }
			  }		  
			  if(i==applyInfor.length){   //没有申请相同岗位
			    saveApply()
			    }
			   }
			  }
			 }
		  //}
		 
		 //将申请岗位信息放到apply表中
		 function saveApply(){
			 var apply={
					  "migrantId":migrantId,
					  "stationId":stationId
			  }			 
			 $.ajax({ 
					type:'post',
		            url:'/zhaogb/saveApply',   
		            data:apply,   
		            dataType:'text', //很重要!!!.      预期服务器返回的数据类型   
		            success:function(data){ 
		            	alert(data);
		            	location.href='recommend.html';//申请岗位成功，页面跳转到推荐岗位页面上
		            },
		            error:function(){   
		                alert("error occured!!!");   
		            }
		         
		         });	
			 
		 }
		 
    
    function checkNull(number){   //判断岗位和公司相关信息是否为null
			 if(station[number].name==null){
				 station[number].name="";			 
			 }		 
			 if(station[number].salary==null){
				 station[number].salary=wages.length;
			 }
			 if(companyInfor.name==null){
				 companyInfor.name="";
			 }
			 if(companyInfor.address==null){
				 companyInfor.address="";
			 }
		 }	
	       
});