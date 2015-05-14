

$(function() {
	
	var migrantId;   //发布信息的用户id
	var stationInfor;//岗位信息
	var otherStation;//该公司的其它岗位
	var companyInfor;//公司信息
	var areaInfor;   //地区信息
	var parentInfor=new Array(5);//父地区  ,注：所有的岗位都用parentInfor数组,如果地区格式具体的话，不会有冲突
	var id;          //岗位的id
	var wealString="";  //公司待遇
	
	var ages = [{
		"age": "18-25"
	}, {
		"age": "26-30"
	}, {
		"age": "31-35"
	}, {
		"age": "36-40"
	}, {
		"age": "41-45"
	}, {
		"age": "45以上"
	}, {
		"age": "无要求"
	}]
	var types = [{
		"type": "全职"
	}, {
		"type": "兼职"
	}, {
		"type": "实习"
	},{
		"type":""
	}]
	var experiences = [{
		"experience": "无经验"
	}, {
		"experience": "1年以下"
	}, {
		"experience": "1-3年"
	}, {
		"experience": "3-5年"
	}, {
		"experience": "5-10年"
	}, {
		"experience": "10年以上"
	}, {
		"experience": "经验不限"
	}]
	var educations = [{
		"education": "本科"
	}, {
		"education": "硕士"
	}, {
		"education": "博士"
	}, {
		"education": "大专"
	}, {
		"education": "中技"
	}, {
		"education": "中专"
	}, {
		"education": "高中"
	}, {
		"education": "初中"
	}, {
		"education": "小学"
	}, {
		"education": "学历不限"
	}]
	var workShift = [{
		"workShift": "白班"
	}, {
		"workShift": "中班"
	}, {
		"workShift": "晚班"
	}, {
		"workShift": "两班倒"
	}, {
		"workShift": "三班倒"
	},{
		"workShift":"暂无"
	}]
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
	var natures = [{
		"nature": "国有企业"
	}, {
		"nature": "集体企业"
	}, {
		"nature": "有限责任公司"
	}, {
		"nature": "股份有限公司"
	}, {
		"nature": "私营企业"
	}, {
		"nature": "中外合资企业"
	}, {
		"nature": "外商投资企业"
	},{
		"nature":"暂无介绍"
	}]
	var scales = [{
		"scale": "20人以下"
	}, {
		"scale": "20-99人"
	}, {
		"scale": "100-499人"
	}, {
		"scale": "500-999人"
	}, {
		"scale": "1000-9999人"
	}, {
		"scale": "10000人以上"
	},{
		"scale":"暂无介绍"
	}]
	var weals = [{
		"weal": "五险一金"
	}, {
		"weal": "带薪年假"
	}, {
		"weal": "高温补贴"
	}, {
		"weal": "餐补"
	}]   
    //alert(num);
	$(document).ready(function() {
		//alert(num);
		//getMigrantId(); //获取发布信息的用户id  测试时先注掉
		id = getUrlParam('id');  //获取url的id参数值		
		getStation();//获取岗位详情
		getCompany();//获取公司详情
		if(stationInfor.areaId!=null){
		getArea(stationInfor.areaId);//获取地区
		getParentArea();//获取父地区
		}
		getOtherStation() //获取公司的其它岗位
		
		checkNull();  //判断岗位和公司信息是否为null
		creat_job();  //显示岗位信息
		creat_company()  //显示公司信息
		creat_otherjob(); //显示公司其它的岗位信息
		//返回图标的点击事件，返回岗位详情页面
		$(".back").click(function(){
			window.location.href='recommend.html';
			
		})
		//点击岗位详情事件
		$(".item1").click(function() {
			$(this).addClass('on').siblings().removeClass('on');
			$(".det-body").show();
			$(".det-company").hide();
		});
		//点击公司信息事件
		$(".item2").click(function() {
			$(this).addClass('on').siblings().removeClass('on');
			$(".det-company").show();
			$(".det-body").hide();
		});
		$(".item1").trigger("click");
		
		//申请岗位的点击事件，存到apply表中
		$(".btn-ne.ne2").click(function(){  
			//alert('hi');
			applyItem();			
		})
		
		//其它岗位的点击事件
		$(".det-com.part-ul").on('click','li',function(){			
			location.href='details.html?id='+$(this).attr('value')+'';
	});

		
//		$(".icon.icon-left-nav.irec").click(function(){
//			location.href="recommend.html";
//		});

	});
	
	function getMigrantId(){  //向后台获取发布信息的用户id
		//alert("nini");
	   migrantId=$.session.get('migrantId');
//		$.ajax({     
//			async: false,
//			type:'post',
//            url:'/zhaogb/getMigrantId',   
//            //data:{"id":id},   
//            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
//            success:function(data){
//            		//alert('hi');
//            	//migrantId=data[data.length-1].id;   
//            	//alert(data.id);
//            	migrantId=data.id;
//            	//alert(migrantId);
//            },
//            error:function(){   
//                alert("error occured!!!");   
//            }
//         
//         });		
	}
	
	
	function getUrlParam(name){   //获取url的参数值
		 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if (r != null) return unescape(r[2]); return null;			
	}
	
	function getStation(){		
		$.ajax({      //根据id向后台获取岗位详情
		   async: false,
		   type:'post',
           url:'/zhaogb/getStationInfor',   
           data:{"id":id},   
           dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
           success:function(data){
           	stationInfor=data;               	  
           },
           error:function(){   
               alert("error occured!!!");   
           }
        
        });	
	}

   function getCompany(){  //根据companyId,获取公司信息
   	$.ajax({ 
			async: false,     //设置ajax为同步   即ajax 先执行完，再执行后面页面的语句
			type:'post',
           url:'/zhaogb/getCompany',   
           data:{"companyId":stationInfor.companyId},   
           dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
           success:function(data){ 
           	companyInfor=data;
           },
           error:function(){   
               alert("error occured!!!");   
           }
        
        });	    	
   }
	//生成岗位详情
	function creat_job() {
		creat_weal(stationInfor.weal);  //构造岗位待遇字符串
		var areaStr="";//地区字符串
//		if(stationInfor.areaId==null){     默认地区是详细的
//			areaStr="";
//		}
//		else if(areaInfor.level<2)
//			areaStr=areaStr+parentInfor[1].name+"|";
//		else if(areaInfor.level>=2){
//			areaStr=areaStr+parentInfor[1].name+"-"+parentInfor[2].name+"|";
//		}
		//alert(areaStr);
		//alert(areaInfor.level);
		
		if(stationInfor.areaId==null){     //默认地区是详细的
			areaStr="";
		}
		else if(parentInfor[1].name=="北京市"||parentInfor[1].name=="天津市"||parentInfor[1].name=="上海市"||parentInfor[1].name=="重庆市"){
			//alert('hi');
			areaStr=areaStr+parentInfor[1].name+"-"+parentInfor[3].name+"|";
		}
		else{
			//alert('hihi');
			areaStr=areaStr+parentInfor[1].name+"-"+parentInfor[2].name+"|";
		}
		
		var html1 =
			"<ul class='table-view'>" +
			"<li class='table-view-cell det-li'>" +
			"	<div class=''>" + stationInfor.name + "<span class='em-1'>" + wages[stationInfor.salary - 1].salary + "</span></div></li>" +
			"<li class='table-view-cell det-li li3'>" +
			"	<div class=''>" + companyInfor.name + "</div></li>" +
			"<li class='table-view-cell det-li li3'>" +
			"	<div class='det3-aprt aprt1'>"+areaStr+types[stationInfor.type-1].type+"</div><div class='det3-aprt aprt2'>截止："+stationInfor.endTime+"</div></li>" +
			"	<li class='table-view-cell det-li2'>" +
			"<div class='det4-aprt'>年龄范围<span class='det4-s'>" +ages[stationInfor.age-1].age+ "岁</span></div>" +
			"		<div class='det4-aprt aprt4'>招聘人数<span class='det4-s'>"+stationInfor.number+"人</span></div></li></ul>" +
			"<div class='details-weal'>" +
			"<div class='det-weal'>员工福利</div>" +
			"<ul class='table-view det-weals'>" +wealString+
			"</ul></div>" +
			"<div class='details-infor'>" +
			"	<ul class='table-view det-infor'>" +
			"	<li class='table-view-cell det-infor-title'>" +
			"	<div>基本信息</div></li>" +
			"<li class='table-view-cell det-infor'>" +
			"<div class='table-view-cell det-infor p1'>工作经验:<span>" + experiences[stationInfor.experience - 1].experience + "</span>" +
			"	</div>" +
			"<div class='table-view-cell det-infor p1'>学历:<span>" + educations[stationInfor.education - 1].education + "</span></div></li>" +
			"	<li class='table-view-cell det-infor area'>" +
			"	<div class='det-infor ex'>工作地点:<span>工业园区</span></div></li>" +
			//"	<div class='image6'>" +
			//"<img src='img/img6.png' height='16px' width='14px'>查看地图</div></li>" +
			"	<li class='table-view-cell det-infor'>" +
			"	<div>工作班次:<span>" + workShift[stationInfor.workShift - 1].workShift + "</span></div></li></ul></div>" +
			"	<div class='details-des'>" +
			"<ul class='table-view det-des'>" +
			"<li class='table-view-cell det-des'>" +
			"	<div>职位描述</div></li>" +
			"<li class='table-view-cell det-des des1'>" +
			"<div>工资待遇:</div></li>" +
			"<li class='table-view-cell det-des des1'>" +stationInfor.remark
			"</li></ul></div>";
		$(".det-body").append(html1);
	}
	//生成公司信息
	function creat_company() {
			var html2 =
				"<ul class='table-view'>" +
				"<li class='table-view-cell det-com'>" +
				"<div class='det-companys part1'>" + companyInfor.name + "</div>" +
				"<div class='det-companys part2'>" + companyInfor.address + "" +"</div></li>" +
				"	<li class='table-view-cell det-com'>" +
				"	<ul class='table-view det-ba'>" +
				"<li class='table-view-cell det-ba'>基本信息</li>" +
				"<li class='table-view-cell det-ba ba1'>行业类型:<span class='ba1-1'>汽车/摩托车</span></li>" +
				"<li class='table-view-cell det-ba ba1'>公司性质:<span class='ba1-1'>" + natures[companyInfor.nature - 1].nature + "</span></li>" +
				"	<li class='table-view-cell det-ba ba1'>公司规模:<span class='ba1-1'>" + scales[companyInfor.scale - 1].scale + "</span></li></ul></li>" +
				"<li class='table-view-cell det-com'><div>公司介绍</div>" +
				"<div class='det-cominfor'> " + companyInfor.introduction + "</div></li>" +
				"<li class='table-view-cell det-com'>" +
				"<div class='det-com part-com'>该公司其他职位</div>" +
				"<ul class='det-com part-ul'></li></ul></ul>";
			$(".det-company").append(html2);
		}
	
	//生成福利图标
	function creat_weal(weals){
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
			wealString+="<li class='table-view-cell det-weals'><span class='icon icon-check det-weals'></span>"+str[n]+"</li>";
		}
		}
	}
//	function creat_weals(weals) {
//		for (var i = 0; i < weals.length; i++) {
//			$(".table-view.det-weals").append("<li class='table-view-cell det-weals'><span class='icon icon-check det-weals'></span>" + weals[i].weal + "</li>");
//		}
//
//	}
	
	//申请岗位，将申请信息放到apply表中
	 function applyItem(){ 
		  var applyInfor;  //用户申请的岗位详情 
		  var i;//临时变量
		  var name="id";
		  //var cookieId;
		  //var temp=document.cookie.indexOf(name+"=");  //判断cookie是否为空
//		 if(temp==-1)        //cookie为空，说明用户没注册
//			 alert("请先注册！");
//		 else{                  //cookie不为空，用户已经注册过了
//			 //alert('hi');
//			 cookieId=document.cookie.split("=");  //获取cookie的id值
//			 if(cookieId[0]==name){
//			 migrantId=cookieId[1]; 
//			 //alert(migrantId);
//			 }
			 //getMigrantId(); //获取发布信息的用户id  测试时先注掉
		  
//		  var apply={
//				  "migrantId":migrantId,
//				  "stationId":id
//		  }		  
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
			  if(applyInfor[i].stationId==id){
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
				  "stationId":id
		  }			 
		 $.ajax({ 
				type:'post',
	            url:'/zhaogb/saveApply',   
	            data:apply,   
	            dataType:'text', //很重要!!!.      预期服务器返回的数据类型   
	            success:function(data){ 
	            	alert(data);
	            	//location.href='recommend.html';//申请岗位成功，页面跳转到推荐岗位页面上
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }
	         
	         });	
		 
	 }
	 
	 //获取该公司的其它岗位信息
	 function getOtherStation(){
		 $.ajax({
			    async: false,
			    type:'post',
	            url:'/zhaogb/getOtherStation',   
	            data:{"id":companyInfor.id},   
	            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
	            success:function(data){ 
	            	//alert(data);
	            	//alert(data[2].name);
	            	otherStation=data;
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }	 			 
		 });		 
	 }
	 
	 //判断岗位和公司信息是否为空
	 function checkNull(){
		 if(stationInfor.name==null){
			 stationInfor.name="";			 
		 }		 
		 if(stationInfor.salary==null){
			 stationInfor.salary=wages.length;
		 }
//		 if(stationInfor.weal==null){
//			 stationInfor.weal="";
//		 }
		 if(companyInfor.name==null){
			 companyInfor.name="";
		 }
		 if(companyInfor.address==null){
			 companyInfor.address="";
		 }
		 if(stationInfor.type==null){
			 stationInfor.type=types.length;
		 }
		 if(stationInfor.workShift==null){
			 stationInfor.workShift=workShift.length;
		 }
		 if(stationInfor.endTime==null){
			 stationInfor.endTime="暂无介绍";
		 }
		 if(stationInfor.age==null){
			// alert("hi");
			 stationInfor.age=ages.length;
		 }
		 if(stationInfor.number==null){
			 stationInfor.number="暂无介绍";
		 }
		 if(stationInfor.experience==null){
			 stationInfor.experience=experiences.length;
		 }
		 if(stationInfor.education==null){
			 stationInfor.education=educations.length;
		 }
		 if(stationInfor.remark==null){
			 stationInfor.remark="";
		 }		 
		 if(companyInfor.scale==null){
			 companyInfor.scale=scales.length;
		 }
		 if(companyInfor.nature==null){
			 companyInfor.nature=natures.length;
		 }
		 if(companyInfor.introduction==null){
			 companyInfor.introduction="";
		 }
		 for(var i=0;i<otherStation.length;i++){  //otherStation是一个json数组，遍历
		 if(otherStation[i].name==null){
			 otherStation[i].name="";
		 }
		 if(otherStation[i].salary==null){
			 otherStation[i].salary=wages.length;			 
		 }
		 if(otherStation[i].type==null){
			 otherStation[i].type=types.length;
		 }
		 if(otherStation[i].endTime==null){
			 otherStation[i].endTime="暂无介绍";
		 }
		}
	 }	 
	 //该公司的其它岗位添加到页面中
	 function creat_otherjob() {
			var areaStr1="";//地区字符串
			for (var j = 0; j < otherStation.length; j++) {
				areaStr1="";
				//alert("hi");
				if(otherStation[j].id!=stationInfor.id){  //去掉之前的岗位
				if(otherStation[j].areaId!=null){
					getArea(otherStation[j].areaId);//获取地区
					getParentArea();//获取父地区
				}			
				/*if(otherStation[j].areaId==null){   默认地区是具体的
					areaStr1="";
					}
				else if(areaInfor.level<2)
					areaStr1=areaStr1+parentInfor[1].name+"|";
				else if(areaInfor.level>=2){
					areaStr1=areaStr1+parentInfor[1].name+"-"+parentInfor[2].name+"|";
				}	*/
				
				if(otherStation[j].areaId==null){   //默认地区是具体的
					areaStr1="";
					}
				else if(parentInfor[1].name=="北京市"||parentInfor[1].name=="天津市"||parentInfor[1].name=="上海市"||parentInfor[1].name=="重庆市"){
					//alert('hi');
					areaStr1=areaStr1+parentInfor[1].name+"-"+parentInfor[3].name+"|";
				}
				else{
					//alert('hihi');
					areaStr1=areaStr1+parentInfor[1].name+"-"+parentInfor[2].name+"|";
				}
				
				$(".det-com.part-ul").append("<li value="+otherStation[j].id+"><div class='det-com part1-com1'>"+otherStation[j].name+"<span class='det-com part1-com'>"+wages[otherStation[j].salary-1].salary+"</span></div><div class='det-com part2-com1'>"+areaStr1+types[otherStation[j].type-1].type+"<span class='det-com part2-com'>"+otherStation[j].endTime+"</span></div></li>");
			 }
			}
		}
	 
	 //根据areaId获取地区信息
	 function getArea(areaId){
		 $.ajax({
			    async: false,
			    type:'post',
	            url:'/zhaogb/getArea',   
	            data:{"id":areaId},   
	            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
	            success:function(data){ 
	            	//alert(data);
	            	//alert(data[2].name);
	            	areaInfor=data;
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }	 			 
		 });		 
	 }
	 
	 //获取父地区
	function getParentArea(){
		 parentInfor[areaInfor.level]=areaInfor;
		 for(var i=areaInfor.level;i>1;i--){
			 $.ajax({
				    async: false,
				    type:'post',
		            url:'/zhaogb/getParentArea',   
		            data:{"id":parentInfor[i].parentId},   
		            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
		            success:function(data){ 
		            	parentInfor[i-1]=data[0];
		            	//alert(parentInfor[i-1].name);
		            },
		            error:function(){   
		                alert("error occured!!!");   
		            }	 			 
			 });			 
		 }		 
	 }
});