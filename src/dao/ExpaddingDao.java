package dao;

import java.util.Map;

public interface ExpaddingDao {
	public boolean saveExpadding(String userId, String serialNumber,
			String userAnswString);

	public boolean exist(String userId, String serialNumber);

	public boolean createRecord(String userId, String serialNumber);

}
