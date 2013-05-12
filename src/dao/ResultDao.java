package dao;

import java.util.List;

public interface ResultDao {

	List getContents(String userId, String serialNumber);

	boolean updateScore(String userId, String serialNumber, int score);
	
}
