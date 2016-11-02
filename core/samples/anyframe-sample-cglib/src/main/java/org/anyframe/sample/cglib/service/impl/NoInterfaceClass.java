package org.anyframe.sample.cglib.service.impl;

public class NoInterfaceClass {

	private String str = "";
	
	public NoInterfaceClass(String str) {
		this.str = str;
	}
	
	public void printHello() {
		System.out.println("hello!! " + str);
	}
}
