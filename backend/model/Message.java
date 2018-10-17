package com.amazonaws.lambda.demo.model;

public class Message {
	private String type;
	private UnstructuredMessage unstructured;

	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public UnstructuredMessage getUnstructured() {
		return unstructured;
	}
	
	public void setUnstructured(UnstructuredMessage unstructured) {
		this.unstructured = unstructured;
	}
	
	public Message(String type, UnstructuredMessage unstructured) {
		this.type = type;
		this.unstructured = unstructured;
	}
	
	public Message() {
	}
	
}
