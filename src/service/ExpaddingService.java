package service;

import java.util.HashMap;
import java.util.Map;

import dao.ExpaddingDao;

public class ExpaddingService {
	private ExpaddingDao expaddingDao;
	
	
	public Map saveExpadding(String userId,
			String serialNumber, String userAnswString) {
		boolean exist = expaddingDao.exist(userId,serialNumber);
		
		boolean success = true;
		if( ! exist ){
			success = expaddingDao.createRecord(userId,serialNumber);
		}
		
		if( success ){
			success = expaddingDao.saveExpadding(userId,serialNumber,userAnswString);
		}
		
		Map<String,Boolean> data = new HashMap<String,Boolean>();
		data.put("success", success);
		
		return data;
	}
	
	

	public ExpaddingDao getExpaddingDao() {
		return expaddingDao;
	}
	public void setExpaddingDao(ExpaddingDao expaddingDao) {
		this.expaddingDao = expaddingDao;
	}
}
