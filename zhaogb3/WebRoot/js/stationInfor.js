/**
 * 
 */

$(function(){
	//alert(migrantId);
	var migrantId;
	var stationInfor;
	var compnayInfor;
	var id;//岗位的id
	
	var ages = [{       //年龄段
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
	var types = [{   //工作类型
		"type": "全职"
	}, {
		"type": "兼职"
	}, {
		"type": "实习"
	}]
	var experiences = [{  //经验
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
	var educations = [{     //教育程度
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
	var worksShit = [{  //工作班次
		"workShit": "白班"
	}, {
		"workShit": "中班"
	}, {
		"workShit": "晚班"
	}, {
		"workShit": "两班倒"
	}, {
		"workShit": "三班倒"
	}]
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
	var natures = [{    //公司类型
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
	var scales = [{   //公司规模
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
		
	$(document).ready(function(){
		
		//向后台获取migrantId，即申请人的id
		$.ajax({      //根据id向后台获取岗位详情
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
		
	    id = getUrlParam('id');  //获取url的id参数值
		//alert(id);
		getStation();//获取岗位详情
		getCompany();//获取公司详情
		
		showStationInfor();//显示岗位详情
		showCompanyInfor();//显示公司详情
		
		$(".b1").click(function() {
			$(".pad").show();
			$(".pad1").hide();
			$(".b1").css("border-bottom", "2px solid #FFDC35");
			$(".b2").css("border-bottom", "2px solid #e6e6e6");
		});
		$(".b2").click(function() {
			$(".pad").hide();
			$(".pad1").show();
			$(".b2").css("border-bottom", "2px solid #FFDC35");
			$(".b1").css("border-bottom", "2px solid #e6e6e6");
		});
		
		$(".applyItem1").click(function(){ //申请岗位的点击事件
			applyItem();   //将信息存入数据库中			
		})
		
		$(".applyItem2").click(function(){
			
			applyItem();
		})
	})
	
	
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

    function getCompany(){
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
    
    function showStationInfor(){  //显示岗位详情		   
		   //将岗位详情放到页面中
		   var html1 =
			    "<div class='work2 clearfix'>" +
					"<div class='work2_1'>" + stationInfor.name + "</div>" +
					"<div class='work2_2'>" + wages[stationInfor.salary - 1].salary + "</div>" +
				"</div>" +
				"<div class='work3'>" +
					"<div class='work3_1'>" + companyInfor.name + 
					"</div>" +
				"</div>" +
				"<div class='work4'>" +
					"<div class='work4_1'>无锡-北塘区|<em>" + types[stationInfor.type - 1].type + "</em></div>" +
					"<div class='work4_2'>截止：<em>" + stationInfor.endTime + "</em></div>" +
				"</div>" +
				"<div class='work5'>" +
					"<ul class='w5 clearfix'>" +
						"<li class='work5_1'>年龄范围<em>" + ages[stationInfor.age - 1].age + "</em>" +
						"</li>" +
						"<li class='work5_2'>招聘人数<em>2人</em>" +
						"</li>" +
						"</ul>" +
				"</div>" +
				"<div class='work6 clearfix'>" +
					"<div class='work6_1'>员工福利</div>" +
						"<ul class='w6_1'>" +
							"<li class='w6'>五险一金</li>" +
							"<li class='w6 1'>绩效奖金</li>" +
							"<li class='w6 2'>带薪年假</li>" +
							"<li class='wo6'>高温补贴</li>" +
							"<li class='wo6 1'>餐补</li>" +
							"<li class='wo6 2'>节日福利</li>" +
						"</ul>" +
				"</div>" +
				"	<div class='work7'>" +
				"	<div class='work7_1'>基本信息</div>" +
				"<div class='work7_2'><em>工作经验:</em>" + experiences[stationInfor.experience - 1].experience + "</div>" +
				"<div class='work7_3'><em>学历:</em>" + educations[stationInfor.education - 1].education + "</div>" +
				"<div class='work7_4'>" +
				"<div class='work7_4_1'>" +
				"<em>工作地点:</em>工业园区</div>" +
				"</div>" +
				"	<div class='work7_4_2'>" +
				"	<div class='image5' ></div><div class='em1'>查看地图</div>" +
				"</div>" +
				"<div class='work7_5'><em>工作班次:</em>" + worksShit[stationInfor.workShift-1].workShit + "</div>" +  //注：数据库workShift有null
				"</div>" +
				"<div class='work8'>" +
				"<div class='work8_1'>职业描述</div>" +
				"<div class='work8_2'>工资待遇：</div>" +
				"<p>1.薪资构成：综合收入4000~6000元/月。基本薪资2000元/月+绩效奖+岗位津贴+加班费</p>" +
				"<p>2.加班工资：平时加班1.5倍，周末加班2倍</p>" +
				"	</div>";
		   //alert(html1);
			//$(".append").append("<li>" + html1 + "</li>");
		    //alert(html1);
			$(".ul1").append("<li>" + html1 + "</li>");	
		 
		   
	   }
    
    
	   function showCompanyInfor(){
		   //将companyInfor放到公司详情页面中
		   var html2 = "<div class='company1'>" +
			"<div class='company1_1'>" + companyInfor.name + "</div>" +
			"	<div class='company1_2'>" +
			"	<div class='company1_2_1'>" + companyInfor.address + "</div>" +
			"<div class='company1_2_2'>" +
			"<div class='image7'></div>" +
			"	<div class='company1_2_3'>查看地图</div>" +
			" </div>" +
			"</div>" +
			"</div>" +
			"<div class='company2'>" +
			"<div class='company2_1'>基本信息</div>" +
			"<div class='company2_2'>行业类型：<em>汽车/摩托车</em>" +
			"</div>" +
			"<div class='company2_3'>公司性质：<em>" + natures[companyInfor.nature - 1].nature + "</em>" +
			"</div>" +
			"	<div class='company2_4'>公司规模：<em>" + scales[companyInfor.scale - 1].scale + "</em>" +
			"	</div>" +
			"</div>" +
			"<div class='company3'>" +
			"<div class='company3_1'>公司介绍</div>" +
			"	<div class='company3_2'>" + companyInfor.introduction + "</div>" +
			"</div>" +
			"<div class='company4'>" +
			"<div class='company4_1'>" +
			"	<div class='company4_1_1'>该公司其他职位</div>" +
			"	</div>" +
			"<div class='company4_2'>" +
			"	<div class='company4_3_1'>普工</div>" +
			"	<div class='company4_3_2'>2000-3000元</div>" +
			"	<div class='company4_3_3'>北塘区|全职</div>" +
			"	<div class='company4_3_4'>截止:2015-02-10</div>" +
			"	</div>" +
			"</div>";
		$(".ul2").append("<li>" + html2 + "</li>");		   
	   }
	   
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
	
})