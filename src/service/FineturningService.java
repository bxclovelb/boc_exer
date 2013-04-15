package service;

import java.util.HashMap;
import java.util.Map;

import dao.ConsolidatingDao;
import dao.FineturningDao;

public class FineturningService {
	private FineturningDao fineturningDao;
	

	public Map saveFineturning(String userId,
			String serialNumber, String userAnswString) {
		boolean success = fineturningDao.saveFineturning(userId, serialNumber, userAnswString);
		
		Map data = new HashMap();
		data.put("success", success);
		return data;
	}


	public FineturningDao getFineturningDao() {
		return fineturningDao;
	}
	public void setFineturningDao(FineturningDao fineturningDao) {
		this.fineturningDao = fineturningDao;
	}
}
