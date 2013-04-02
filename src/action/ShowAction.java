package action;

import com.opensymphony.xwork2.ActionSupport;

public class ShowAction extends ActionSupport{
	private Stirng userId;
	private String serialNumber;
	private int isReview;
	private int part;
	
	
	public String showExpadding(){
		
		return SUCCESS;
	}
	
	
	
	


	public Stirng getUserId() {
		return userId;
	}
	public void setUserId(Stirng userId) {
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
	public int getPart() {
		return part;
	}
	public void setPart(int part) {
		this.part = part;
	}
}
