package dao.impl;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;

import dao.CommonDao;


public class CommonDaoImpl extends BaseDao implements CommonDao {
	@Override
	public String getXmlMaterial(String serialNumber, int part) {
		System.out.println("serialNumber:"+serialNumber);
		System.out.println("part:"+part);
		Session session = getSessionFactory().openSession();
		String sql = "SELECT xml_material_part_"+part+" xml_material "+
				"FROM cached_voc_expanding WHERE serial_number='"+serialNumber+
				"'";
		SQLQuery query = session.createSQLQuery(sql);
		List list = query.list();
		
		String xml = (String)list.get(0);
		
		session.close();
		
		return xml;
	}
	
	@Override
	public Object getContents(String userId, String serialNumber) {
		String sql = "SELECT content_1,content_2,content_3"
					+" FROM user_vocabulary_submit_record WHERE user_id='"
					+userId+"' AND serial_number='"+serialNumber+"'";
		Session session = getSessionFactory().openSession();
		SQLQuery query = session.createSQLQuery(sql);
		
		List contens = query.list();
		
		session.close();
		
		System.out.println(contens.get(0));
		
		return contens.get(0);
	}
}
