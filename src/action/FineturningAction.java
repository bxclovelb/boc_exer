package action;

import java.util.Map;

import service.ConsolidatingService;
import service.FineturningService;

import com.opensymphony.xwork2.ActionSupport;

public class FineturningAction extends ActionSupport{
	private String userId = "";
	private String serialNumber = "";
	private int isReview = 0;
	private String userAnswString = "";
	
	private FineturningService fineturningService;
	
	private Map<String,Object> data;
	
	
	
	public String showFineturning(){
		return SUCCESS;
	}
	public String saveFineturning(){
		data = fineturningService.saveFineturning(userId,serialNumber,userAnswString);
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
	public FineturningService getFineturningService() {
		return fineturningService;
	}
	public void setFineturningService(FineturningService fineturningService) {
		this.fineturningService = fineturningService;
	}
	public Map<String, Object> getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
}
