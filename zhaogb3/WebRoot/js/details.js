$(function() {
	
	var migrantId;   //发布信息的用户id
	var stationInfor;//岗位信息
	var compnayInfor;//公司信息
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
	}]
	var types = [{
		"type": "全职"
	}, {
		"type": "兼职"
	}, {
		"type": "实习"
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
	$(document).ready(function() {
		
		getMigrantId(); //获取发布信息的用户id
		
		id = getUrlParam('id');  //获取url的id参数值
		
		getStation();//获取岗位详情
		getCompany();//获取公司详情
		
		creat_job();  //显示岗位信息
		creat_company()  //显示公司信息
		//creat_weals(weals)
		
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
	});
	
	function getMigrantId(){  //向后台获取发布信息的用户id
		$.ajax({     
			async: false,
			type:'post',
            url:'/zhaogb/getMigrantId',   
            //data:{"id":id},   
            dataType:'json', //很重要!!!.      预期服务器返回的数据类型   
            success:function(data){
            	migrantId=data[data.length-1].id;               	  
            },
            error:function(){   
                alert("error occured!!!");   
            }
         
         });		
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
		var html1 =
			"<ul class='table-view'>" +
			"<li class='table-view-cell det-li'>" +
			"	<div class=''>" + stationInfor.name + "<span class='em-1'>" + wages[stationInfor.salary - 1].salary + "</span></div></li>" +
			"<li class='table-view-cell det-li li3'>" +
			"	<div class=''>" + companyInfor.name + "</div></li>" +
			"<li class='table-view-cell det-li li3'>" +
			"	<div class=''>无锡-北塘区|全职</div></li>" +
			"	<li class='table-view-cell det-li2'>" +
			"<div class='det4-aprt'>年龄范围<span class='det4-s'>" + ages[stationInfor.age - 1].age + "岁</span></div>" +
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
			"<div class='table-view-cell det-infor p1'>学历:<span></span>" + educations[stationInfor.education - 1].education + "</em></div></li>" +
			"	<li class='table-view-cell det-infor area'>" +
			"	<div class='det-infor ex'>工作地点:<span></span>工业园区</em></div>" +
			"	<div class='image6'>" +
			"<img src='img/img6.png' height='16px' width='14px'>查看地图</div></li>" +
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
				"<div class='det-companys part2'>" + companyInfor.address + "" +
				"<img src='img/img5.png' height='16px' width='14px'>查看地图</div></li>" +
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
				"<div class='det-com part1-com1'>普工<span class='det-com part1-com'>2000-3000元</span></div>" +
				"	<div class='det-com part2-com1'>北塘区|全职<span class='det-com part2-com'>截止2015-02-10</span></div></li></ul>";
			$(".det-company").append(html2);
		}
		//生成员工福利
	
	//生成福利图标
	function creat_weal(weals){   //若有weal为null时，则无法显示出来   待做？？
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
	
	 function applyItem(){   //申请岗位，将申请信息放到apply表中
		  var applyInfor={
				  "migrantId":migrantId,
				  "stationId":id
		  }
		  $.ajax({ 
				type:'post',
	            url:'/zhaogb/saveApply',   
	            data:applyInfor,   
	            dataType:'text', //很重要!!!.      预期服务器返回的数据类型   
	            success:function(data){ 
	            	alert(data);
	            },
	            error:function(){   
	                alert("error occured!!!");   
	            }
	         
	         });		  
	  }
	
	
});