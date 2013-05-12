package dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import dao.ResultDao;

public class ResultDaoImpl extends BaseDao implements ResultDao {
	
	@Override
	public List getContents(String userId, String serialNumber) {
		Session session = getSessionFactory().openSession();
		String sql = "SELECT content_1,content_2,content_3 "+
				"FROM user_vocabulary_submit_record "+
				"WHERE user_id='"+userId+"' AND serial_number='"+serialNumber+"'";
		
		SQLQuery query = session.createSQLQuery(sql);
		
		Object[] objs = (Object[])query.list().get(0);
		List contents = new ArrayList();
		
		contents.add(objs[0]);
		contents.add(objs[1]);
		contents.add(objs[2]);
		
		session.close();
		
		return contents;
	}
	
	@Override
	public boolean updateScore(String userId, String serialNumber, int score) {
		Session session = getSessionFactory().openSession();
		String sql = "UPDATE user_vocabulary_submit_record SET score_string ='"+
				score+"',score="+score+" WHERE user_id='"+userId+
				"' AND serial_number='"+serialNumber+"'";
		
		Transaction tx = session.beginTransaction();
		
		int count = session.createSQLQuery(sql).executeUpdate();
		
		tx.commit();
		session.close();
		
		if(count == 1){
			return true;
		}else{
			return false;
		}
	}

}
