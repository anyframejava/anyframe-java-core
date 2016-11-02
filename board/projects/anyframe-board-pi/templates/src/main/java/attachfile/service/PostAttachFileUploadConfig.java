package ${packageName}.attachfile.service;

import java.io.Serializable;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;

public class PostAttachFileUploadConfig implements Serializable {

	private static final long serialVersionUID = 1L;
	private Logger Log = Logger.getLogger(this.getClass());
	private String CONFIG_FILE_PATH = "/fileupload"; // fileupload.properties

	public static String COMMON_TEMP_PATH = "common.temp.path";
	public static String COMMON_FILE_MAXSIZE = "common.file.maxsize";

	public static String KEY_DISK_PATH = "disk.path";

	private HashMap<String, String> ConfigMap;

	public PostAttachFileUploadConfig() {
		loadConfigFile(CONFIG_FILE_PATH);
	}

	public PostAttachFileUploadConfig(String configPath) {
		loadConfigFile(configPath);
	}

	private void loadConfigFile(String path) throws MissingResourceException {
		ResourceBundle res = ResourceBundle.getBundle(path);

		if (ConfigMap == null) {
			ConfigMap = new HashMap<String, String>();
		}

		Enumeration<String> itor = res.getKeys();

		while (itor.hasMoreElements()) {
			String chkKey = itor.nextElement();

			chkKey = chkKey.trim();

			if (KEY_DISK_PATH.toLowerCase().equals(chkKey.toLowerCase())
					|| COMMON_TEMP_PATH.toLowerCase().equals(
							chkKey.toLowerCase())
					|| COMMON_FILE_MAXSIZE.toLowerCase().equals(
							chkKey.toLowerCase())) {
				ConfigMap.put(chkKey, res.getString(chkKey));
			} else {
				Log.info("unknown configuration [key:" + chkKey + "]");
			}
		}
	}

	public String getValue(String key) {
		return ConfigMap.get(key);
	}

}
