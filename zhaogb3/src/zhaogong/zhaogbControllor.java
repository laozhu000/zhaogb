package zhaogong;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;



import javax.servlet.http.HttpSession;

//import org.apache.jasper.compiler.Node.VariableDirective;
import org.eclipse.jetty.util.ajax.JSON;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.sun.el.lang.FunctionMapperImpl.Function;

import zhaogong.zhaogb;

public class zhaogbControllor extends Controller {
	//public static List<Record> migrant=null;   //用户注册信息，便于使用注册用户id
	//public HttpSession session=new HttpSession();
	public void index() { 
		renderText("welcome to zhaogongbao.");
		//redirect("/reg.html");
		//redirect("/zhaogb.html");
		redirect("/introduce.html");
		}
	
	//获取父职位名称
	public void getItem(){
		List<Record> fatherItem=getModel(zhaogb.class).findItem();
		renderJson(fatherItem);		
	}
	
	//获取子职位名称
	public void getItemChild(){
		//Integer fatherId=getParaToInt("id");
		//System.out.println(fatherId);
		String fatherName=getPara("name");
		List<Record> childItem=getModel(zhaogb.class).findChildItem(fatherName);
		renderJson(childItem);		
	}
	
	//存储用户信息
	public void saveMessage(){
		Integer idInteger;
		java.util.Date date = new java.util.Date();  //获取系统当前日期
		//System.out.println(date);
		String name=getPara("name");
		Integer sex=getParaToInt("sex");
		Integer age=getParaToInt("age");
		Integer salary=getParaToInt("salary");
		String itemName=getPara("itemName");
		String phone=getPara("phone");
		//在用户发布时，查询出用户注册信息，通过migrant[migrant.length-1].id得到注册用户的id
		idInteger=getModel(zhaogb.class).saveUserMessage(date,name,sex,age,salary,itemName,phone);
		//setAttr("migrantId",migrant);
	    getRequest().getSession().setAttribute("migrantId",idInteger);
		//setSessionAttr("migrantId", idInteger);
	    //getRequest().getSession().getAttribute(arg0);
	    //System.out.println(migrant.get(0).getStr("id"));
		//JSON idJson={"id":idInteger,"nsme":"ds"};
	    //renderJson("{\"id\":"+idInteger+"}");
		renderText("发布信息成功");	
		
	}
	
	//根据用户选的条件显示合适的工作
	public void showJob(){
		Integer salary=getParaToInt("salary");
		Integer itemId=getParaToInt("itemId");
		List<Record> Job=getModel(zhaogb.class).findJob(salary,itemId);	
		renderJson(Job);
	}
	//获取公司的信息
	public void getCompany(){
		Integer companyId=getParaToInt("companyId"); //获取公司Id
		Record company=getModel(zhaogb.class).findCompany(companyId);
		renderJson(company);		
	}
	
	//岗位详情
	public void getStationInfor(){
		Integer stationId=getParaToInt("id");
		Record stationInfor=getModel(zhaogb.class).findStation(stationId);
		renderJson(stationInfor);
		
	}
	
	//公司详情
//	public void getCompanyInfor(){
//		Integer companyId=getParaToInt("companyId");
//		Record companyInfor=getModel(zhaogb.class).findCompanyInfor(companyId);
//		renderJson(companyInfor);
//		
//		
//	}
	
	//将申请岗位信息放到apply表中
	public void saveApply(){
		Integer migrantId=getParaToInt("migrantId");
		Integer stationId=getParaToInt("stationId");
		getModel(zhaogb.class).saveApplyInfor(migrantId,stationId);
		renderText("申请岗位成功，请等候通知");		
	}
	
	//获取注册的用户id
	public void getMigrantId() {
		//将用户发布信息时得到的全局变量migrant渲染到岗位详情页面
		//renderJson(migrant);		//将setAttr的migrantId渲染到前台		
		Integer id=(Integer)getRequest().getSession().getAttribute("migrantId");
		//Integer id=getSessionAttr("migrantId");
		renderJson("{\"id\":"+id+"}");
	}
	
	//根据公司id获取该公司的其它岗位
	public void getOtherStation(){
		Integer companyId=getParaToInt("id");
		List<Record> otherStation=getModel(zhaogb.class).findOtherStation(companyId);
		renderJson(otherStation);		
	}	
	
	//根据areaId获取地区信息
	public void getArea(){
		Integer id=getParaToInt("id");
		Record area=getModel(zhaogb.class).findArea(id);
		renderJson(area);
	}
	
	//根据area的parentId获取父地区
	public void getParentArea(){
		Integer idInteger=getParaToInt("id");
		List<Record> parentArea=getModel(zhaogb.class).findParentArea(idInteger);
		renderJson(parentArea);
	}
	
	//根据migrantId获取申请岗位信息
	public void getApply(){
		Integer migrantId=getParaToInt("migrantId");
		//System.out.println(migrantId);
		List<Record> applyInforList=getModel(zhaogb.class).findApply(migrantId);
		renderJson(applyInforList);		
	}
}
