package ${packageName}.attachfile.service;

import java.io.Serializable;
import java.util.StringTokenizer;

public class PostAttachFileMeta implements Serializable {

	private static final long serialVersionUID = 1L;
	private long size;
	private String fname; // pure filename without path-info
	private String orgfname; // original filename received by form-submit

	private static final String delimiter = "/\\";

	public PostAttachFileMeta() {
		this.size = 0L;
		this.fname = "";
	}

	public PostAttachFileMeta(long nSize, String name) {
		this.size = nSize;
		this.orgfname = name;

		this.fname = getFileNameOnly(name);
	}

	public long getSize() {
		return this.size;
	}

	public void setSize(long nSize) {
		this.size = nSize;
	}

	public String getName() {
		return this.fname;
	}

	public void setName(String name) {
		this.orgfname = name;
		this.fname = getFileNameOnly(name);
	}

	public String getOrgName() {
		return this.orgfname;
	}

	public static String getFileNameOnly(String orgFileName) {
		StringTokenizer token = new StringTokenizer(orgFileName, delimiter);
		String ret = "";

		while (token.hasMoreTokens()) {
			ret = token.nextToken();
		}

		return ret;
	}
}
