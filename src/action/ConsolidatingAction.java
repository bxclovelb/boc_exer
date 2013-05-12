package action;

import java.util.Map;

import service.ConsolidatingService;
import service.ExpaddingService;

import com.opensymphony.xwork2.ActionSupport;

public class ConsolidatingAction extends ActionSupport{
	private String userId;
	private String serialNumber;
	private int isReview;
	private String userAnswString;
	
	private ConsolidatingService consolidatingService;
	
	private Map<String,Object> data;
	
	
	
	public String showConsolidating(){
		return SUCCESS;
	}
	public String saveConsolidating(){
		data = consolidatingService.saveConsolidating(userId,serialNumber,userAnswString);
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
	public int getIsReview() {
		return isReview;
	}
	public void setIsReview(int isReview) {
		this.isReview = isReview;
	}
	public String getUserAnswString() {
		return userAnswString;
	}
	public void setUserAnswString(String userAnswString) {
		this.userAnswString = userAnswString;
	}
	public ConsolidatingService getConsolidatingService() {
		return consolidatingService;
	}
	public void setConsolidatingService(ConsolidatingService consolidatingService) {
		this.consolidatingService = consolidatingService;
	}
	public Map<String, Object> getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
}
