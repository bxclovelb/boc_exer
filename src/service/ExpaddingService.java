package service;

import java.util.HashMap;
import java.util.Map;

import dao.ExpaddingDao;

public class ExpaddingService {
	private ExpaddingDao expaddingDao;
	
	
	public Map getXmlMaterial(String serialNumber,int part){
		String xml = expaddingDao.getXmlMaterial(serialNumber,part);
		
		Map<String,String> data = new HashMap<String,String>();
		if(part == 1){
			xml = "<expadding>"+xml.replace("{MEDIA_PATH}",
				"http://www.bingoenglish.com/mediafile/voice_mp3")+"</expadding>";
			data.put("xml", xml);
		}else if(part == 2){
			xml = "<consolidating>"+xml+"</consolidating>";
			data.put("xml", xml);
		}else if(part == 3){
			xml = "<finetuning>"+xml+"</finetuning>";
			data.put("xml", xml);
		}
		
		return data;
	}
	public Map saveExpadding(String userId,
			String serialNumber, String userAnswString) {
		boolean success = expaddingDao.saveExpadding(userId,serialNumber,userAnswString);
		
		Map<String,Boolean> data = new HashMap<String,Boolean>();
		data.put("success", success);
		
		return data;
	}
	
	

	public ExpaddingDao getExpaddingDao() {
		return expaddingDao;
	}
	public void setExpaddingDao(ExpaddingDao expaddingDao) {
		this.expaddingDao = expaddingDao;
	}
}
