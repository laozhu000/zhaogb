package config;
import zhaogong.zhaogb;
import zhaogong.zhaogbControllor;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;

public class config extends JFinalConfig {
	
//	public static String jdbcUrl="jdbc:mysql://localhost:3306/zhaogongbao";
//	public static String user="root";
//	public static String password="930926";
	
	public void configConstant(Constants me) {
		loadPropertyFile("a_little_config.txt");
		me.setDevMode(true);
		}
	//配置路由
	public void configRoute(Routes me) {
		me.add("/zhaogb", zhaogbControllor. class);
		}
   //连接数据库
	public void configPlugin(Plugins me) {
		// 配置C3p0数据库连接池插件
		C3p0Plugin c3p0Plugin = new C3p0Plugin(getProperty("jdbcUrl"), getProperty("user"), getProperty("password").trim());
		me.add(c3p0Plugin);
				
		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
		me.add(arp);
		//注：需要的表都要addMapping到zhaogb.class,???migrant 表不用addMapping
		arp.addMapping("item", zhaogb.class);	// 映射item 表到 zhaogb模型
		}
	public void configInterceptor(Interceptors me) {
	
		}
	public void configHandler(Handlers me) {
	
	}
	//直接运行 main 用8000端口开服务
	public static void main(String[] args) {
		JFinal.start("WebRoot", 8000, "/", 5);
	}
}	