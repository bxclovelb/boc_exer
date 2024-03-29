package dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import dao.ConsolidatingDao;

public class ConsolidatingDaoImpl extends BaseDao implements ConsolidatingDao {

	@Override
	public boolean saveConsolidating(String userId, String serialNumber,
			String userAnswString) {
		Session session = getSessionFactory().openSession();
		String sql = "UPDATE user_vocabulary_submit_record SET date_time ='"+
				SimpleDateFormat.getDateTimeInstance().format(new Date())+
				"',content_2='"+userAnswString+"' WHERE user_id='"+userId+
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

}
