package dao;

import java.util.Map;

public interface ExpaddingDao {
	String getXmlMaterial(String serialNumber, int part);

	boolean saveExpadding(String userId, String serialNumber,
			String userAnswString);

}
