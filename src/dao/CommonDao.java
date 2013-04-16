package dao;

public interface CommonDao {
	public String getXmlMaterial(String serialNumber, int part);

	public Object getContents(String userId, String serialNumber);
}
