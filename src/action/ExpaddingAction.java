package action;

import java.util.Map;

import service.ExpaddingService;

import com.opensymphony.xwork2.ActionSupport;

public class ExpaddingAction extends ActionSupport{
	private String userId = "";
	private String serialNumber = "";
	private int isReview = 0;
	private String userAnswString = "";
	private int part = 1;
	
	private ExpaddingService expaddingService;
	
	private Map<String,Object> data;
	
	
	
	public String showExpadding(){
		return SUCCESS;
	}
	public String saveExpadding(){
		data = expaddingService.saveExpadding(userId,serialNumber,userAnswString);
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
	public int getPart() {
		return part;
	}
	public void setPart(int part) {
		this.part = part;
	}
	public ExpaddingService getExpaddingService() {
		return expaddingService;
	}
	public void setExpaddingService(ExpaddingService expaddingService) {
		this.expaddingService = expaddingService;
	}
	public Map<String, Object> getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
}
