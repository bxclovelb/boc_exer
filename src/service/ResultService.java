package service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import dao.ResultDao;

public class ResultService {
	private ResultDao resultDao;
	
	

	public Map updateScore(String userId, String serialNumber,
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
