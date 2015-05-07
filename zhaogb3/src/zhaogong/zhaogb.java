package zhaogong;

import java.util.*;
import java.sql.Date;
import java.util.List;

import javax.print.attribute.standard.DateTimeAtCompleted;

import org.omg.CORBA.PUBLIC_MEMBER;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class zhaogb extends Model<zhaogb> {
	public static final zhaogb dao = new zhaogb();
	
	//查找fatherId为0的职位名称 
	public List<Record> findItem(){	
		List<Record> items=Db.find("select * from item where fatherId=0");
		return items;
	}
	
	//查找子职位，即根据fatherName找到fatherId，在根据fatherId查找
	public List<Record> findChildItem(String fatherName){
		List<Record> itemFather=Db.find("select id from item where name='"+fatherName+"'");
		Record fatherIdInteger=itemFather.get(0);  //获取父职业的id对象
		Integer fatherId = fatherIdInteger.getInt("id"); //获取父职业的id
		//System.out.println(fatherId);
		List<Record> items=Db.find("select * from item where fatherId="+fatherId+"");
		return items;
		//List<Record> items=Db.find("select * from item where fatherId='"+fatherId+"'");
		//return items;
	}
	
	//存储用户信息到migrant中,并返回用户的id,用于申请岗位时用
	public List<Record> saveUserMessage(java.util.Date date,String name,Integer sex,Integer age,Integer salary,String itemName,String phone){
		List<Record> itemIdList=Db.find("select id from item where name='"+itemName+"'");
		Record itemIdRecord=itemIdList.get(0);  //获取职业的id对象
		Integer itemId = itemIdRecord.getInt("id"); //获取职业的id
		Record user = new Record().set("created",date).set("name", name).set("sex", sex)
				.set("age", age).set("salary", salary).set("itemId", itemId).set("phone",phone);
		Db. save("migrant", user);
		
		//查询刚发布信息用户的id
		List<Record> migrantIdList=Db.find("select * from migrant");  //sql语句，待优化，不必查询所有的项
		return migrantIdList;
	}
	
	//根据salary和item查找合适的工作
	public List<Record> findJob(Integer salary,Integer itemId){
		String sql="select * from station";
		if(salary!=0){          //等于0代表没选这个条件
			sql+=" where salary='"+salary+"'";
		}
		if(itemId!=0){
			if(salary==0){
			sql+=" where itemId='"+itemId+"'";
			}
			else {
				sql+=" and itemId='"+itemId+"'";
			}				
		}
		System.out.println(sql);
		List<Record> jobList=Db.find(sql);
		return jobList;	
	}
	
	//根据companyId查找公司
	public Record findCompany(Integer companyId){
		Record company=Db.findById("company", companyId);
		return company;
	}
	
	//根据stationId查找岗位信息
	public Record findStation(Integer id){
		Record stationInfor=Db.findById("station", id);
		return stationInfor;
	}
	
	//根据companyId查找公司信息
//	public Record findCompanyInfor(Integer companyId){
//		Record companyInfor=Db.findById("company",companyId);
//		return companyInfor;		
//	}	
	
	//用户申请岗位的信息放到apply表中
	public void saveApplyInfor(Integer migrantId,Integer stationId){
		java.util.Date date = new java.util.Date();  //获取系统当前日期		
		Record apply = new Record().set("created",date).set("state",1).set("migrantId",migrantId).set("stationId",stationId);				
		Db. save("apply", apply);		
	}
	
	//查找公司的其它岗位	
	public List<Record> findOtherStation(Integer companyId){		
		List<Record> otherStation=Db.find("select * from station where companyId='"+companyId+"'");
		return otherStation;		
	}
	
	//查找地区信息
	public Record findArea(Integer id){
		return Db.findById("t_prov_city_area_street", id);
	}
	
	//查找父地区
	public List<Record> findParentArea(Integer id){
		return Db.find("select * from t_prov_city_area_street where code='"+id+"'");		
	}
	
	public List<Record> findApply(Integer migrantId){
		//System.out.println(migrantId);
		return Db.find("select * from apply where migrantId='"+migrantId+"'");
	}
}
