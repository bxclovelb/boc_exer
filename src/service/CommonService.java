package service;

import java.util.HashMap;
import java.util.Map;

import dao.CommonDao;

public class CommonService {
	private CommonDao commonDao;

	public Map getXmlMaterial(String serialNumber,int part){
		String xml = commonDao.getXmlMaterial(serialNumber,part);
		
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

	
	
	public CommonDao getCommonDao() {
		return commonDao;
	}
	public void setCommonDao(CommonDao commonDao) {
		this.commonDao = commonDao;
	}
}
