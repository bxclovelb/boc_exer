package dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import dao.ResultDao;


public class ResultDaoImpl extends BaseDao implements ResultDao {

	@Override
	public boolean updateScore(String userId, String serialNumber, int score) {
		String sql = "UPDATE user_vocabulary_submit_record SET score_string ='"
					+score+"',score="+score+" WHERE user_id='"+userId
					+"' AND serial_number='"+serialNumber+"'";
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
