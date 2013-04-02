package service;

import java.util.HashMap;
import java.util.Map;

import dao.ConsolidatingDao;

public class ConsolidatingService {
	private ConsolidatingDao consolidatingDao;
	

	public Map saveConsolidating(String userId,
			String serialNumber, String userAnswString) {
		boolean success = consolidatingDao.saveConsolidating(userId, serialNumber, userAnswString);
		
		Map data = new HashMap();
		data.put("success", success);
		return data;
	}

	
	
	
	public ConsolidatingDao getConsolidatingDao() {
		return consolidatingDao;
	}
	public void setConsolidatingDao(ConsolidatingDao consolidatingDao) {
		this.consolidatingDao = consolidatingDao;
	}
}
