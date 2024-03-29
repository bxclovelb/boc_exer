package action;

import java.util.Map;

import service.ResultService;

import com.opensymphony.xwork2.ActionSupport;

public class ResultAction extends ActionSupport{
	private String userId = "";
	private String serialNumber = "";
	private int score = -1;
	
	private ResultService resultService = null;
	
	private Map<String,Object> data = null;
	
	
	
	public String showResult(){
		return SUCCESS;
	}
	public String getContents(){
		data = resultService.getContents(userId,serialNumber);
		return SUCCESS;
	}
	public String updateScore(){
		data = resultService.updateScore(userId,serialNumber,score);
		return SUCCESS;
	}


	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public ResultService getResultService() {
		return resultService;
	}
	public void setResultService(ResultService resultService) {
		this.resultService = resultService;
	}
	public Map<String, Object> getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
}
