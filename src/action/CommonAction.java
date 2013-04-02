package action;

import java.util.Map;

import service.CommonService;
import service.ConsolidatingService;
import service.ExpaddingService;

import com.opensymphony.xwork2.ActionSupport;

public class CommonAction extends ActionSupport{
	private String serialNumber;
	private int part;
	
	private CommonService commonService;
	
	private Map<String,Object> data;
	
	
	
	public String getXmlMaterial(){
		data = commonService.getXmlMaterial(serialNumber,part);
		return SUCCESS;
	}
	


	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	public int getPart() {
		return part;
	}
	public void setPart(int part) {
		this.part = part;
	}
	public CommonService getCommonService() {
		return commonService;
	}
	public void setCommonService(CommonService commonService) {
		this.commonService = commonService;
	}
	public Map<String, Object> getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
}
