package dao;

import java.util.List;

public interface ResultDao {

	public Object getContents(String userId, String serialNumber);

	public boolean updateScore(String userId, String serialNumber, int score);

}
