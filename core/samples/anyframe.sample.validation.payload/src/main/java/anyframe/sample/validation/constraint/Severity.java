package anyframe.sample.validation.constraint;

import javax.validation.Payload;

public class Severity {
	public static interface Warning extends Payload {
	};

	public static interface Error extends Payload {
	};
}
