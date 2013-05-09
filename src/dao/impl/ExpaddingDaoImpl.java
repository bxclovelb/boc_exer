package dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import dao.ExpaddingDao;

public class ExpaddingDaoImpl extends BaseDao implements ExpaddingDao {

	@Override
	public boolean saveExpadding(String userId, String serialNumber,
			String userAnswString) {
		Session session = getSessionFactory().openSession();
		String sql = "UPDATE user_vocabulary_submit_record SET date_time ='"+
				SimpleDateFormat.getDateTimeInstance().format(new Date())+
				"',content_1='"+userAnswString+"' WHERE user_id='"+userId+
				"' AND serial_number='"+serialNumber+"'";
		Transaction tx = session.beginTransaction();
		
		int count = session.createSQLQuery(sql).executeUpdate();
		
		tx.commit();
		session.close();
		
		if(count == 0){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public boolean exist(String userId, String serialNumber) {
		Session session = getSessionFactory().openSession();
		String sql = "SELECT count(*) count FROM user_vocabulary_submit_record "+
				"WHERE user_id='"+userId+"' AND serial_number='"+serialNumber+"'";
		SQLQuery query = session.createSQLQuery(sql);
		
		int count = Integer.parseInt(query.list().get(0).toString());
		
		session.close();
		
		if(count == 1){
			return true;
		}else{
			return false;
		}
	}
	
	@Override
	public boolean createRecord(String userId, String serialNumber) {
		String sql = "INSERT INTO user_vocabulary_submit_record("+
				"user_id,date_time,serial_number,score) VALUES('"+userId+"','"+
				SimpleDateFormat.getDateTimeInstance().format(new Date())+"','"+
				serialNumber+"',-1)";
		Session session = getSessionFactory().openSession();
		Transaction tx = session.beginTransaction();
		
		int count = session.createSQLQuery(sql).executeUpdate();
		
		tx.commit();
		session.close();
		
		if(count == 0){
			return false;
		}else{
			return true;
		}
	}
}
