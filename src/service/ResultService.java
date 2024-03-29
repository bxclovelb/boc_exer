package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import dao.ResultDao;

public class ResultService {
	private ResultDao resultDao;
	
	public Map<String, Object> getContents(String userId, String serialNumber) {
		List contens = resultDao.getContents(userId, serialNumber);
		
		Map data = new HashMap();
		data.put("content_1", contens.get(0));
		data.put("content_2", contens.get(1));
		data.put("content_3", contens.get(2));
		return data;
	}
	public Map<String, Object> updateScore(String userId, String serialNumber,
			int score) {
		boolean success = resultDao.updateScore(userId, serialNumber,score);
		
		Map data = new HashMap();
		data.put("success", success);
		return data;
	}
	
	
	

	public ResultDao getResultDao() {
		return resultDao;
	}
	public void setResultDao(ResultDao resultDao) {
		this.resultDao = resultDao;
	}
}
