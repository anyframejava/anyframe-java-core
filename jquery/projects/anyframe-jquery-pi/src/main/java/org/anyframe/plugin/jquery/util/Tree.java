/*
 * Copyright 2008-2011 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.plugin.jquery.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * <pre>
 *   Tree에 Node를 계속 추가한 후, 상위 Node부터 한 라인씩 출력할 수 있도록
 *   정렬된 결과를 리턴한다.
 *   각 노드의 depth도 계산하여 리턴한다.
 * </pre>
 */
public class Tree {
	@SuppressWarnings("unchecked")
	private HashMap nodeBag;

	private TreeNode root;

	@SuppressWarnings("unchecked")
	public Tree() {
		nodeBag = new HashMap();
		root = new TreeNode(null, 0);
	}

	/**
	 * Tree의 제일 상단에 Node를 추가한다.
	 * 
	 * @param ID
	 *            Node를 식별하기 위한 ID
	 * @param node
	 *            추가할 하나의 Node(Object)
	 */
	public void add(String ID, Object node) {
		this.add(ID, null, node);
	}

	/**
	 * <pre>
	 *   Tree의 특정 Node에 Node를 추가한다.
	 *   추가할 상위 노드가 Tree에 존재하지 않거나(ID로 식별), ID가 null 이면 제일 상단에 추가된다.
	 * </pre>
	 * 
	 * @param ID
	 *            Node를 식별하기 위한 ID
	 * @param parentID
	 *            Node를 추가할 상위 Node의 ID
	 * @param node
	 *            추가할 하나의 Node(Object)
	 */
	@SuppressWarnings("unchecked")
	public void add(String ID, String parentID, Object node) {
		TreeNode newNode = null;
		TreeNode parentNode = (TreeNode) nodeBag.get(parentID);
		if (parentNode == null) {
			newNode = new TreeNode(node, 1);
			root.add(newNode);
		} else {
			newNode = new TreeNode(node, parentNode.getDepth() + 1);
			parentNode.add(newNode);
		}

		nodeBag.put(ID, newNode);
	}

	/**
	 * <pre>
	 *   Tree에 Node를 계속 추가한 후, 상위 Node부터 한 라인씩 출력할 수 있도록
	 *   정렬된 결과를 리턴한다.
	 * </pre>
	 * 
	 * @param nodes
	 *            정렬된 Node를 저장할 Object 배열.
	 */
	public void toArray(Object[] nodes) {
		this.toArray(nodes, null, null);
	}

	/**
	 * <pre>
	 *   Tree에 Node를 계속 추가한 후, 상위 Node부터 한 라인씩 출력할 수 있도록
	 *   정렬된 결과를 리턴한다.
	 * </pre>
	 * 
	 * @param nodes
	 *            정렬된 Node를 저장할 Object 배열. *
	 * @param rootId
	 *            Array로 추출할 root node ID (null 일 경우 전체 트리)
	 */
	public void toArray(Object[] nodes, String rootId) {
		this.toArray(nodes, null, rootId);
	}

	/**
	 * Tree로 정렬된 모든 결과를 리턴한다.
	 * 
	 * @param nodes
	 *            정렬된 Node를 저장할 Object 배열.
	 * @param depth
	 *            각 Node의 depth를 저장할 Integer 배열.
	 */
	public void toArray(Object[] nodes, Integer[] depth) {
		this.toArray(nodes, depth, null);
	}

	/**
	 * Tree로 정렬된 결과를 리턴한다.
	 * 
	 * @param nodes
	 *            정렬된 Node를 저장할 Object 배열.
	 * @param depth
	 *            각 Node의 depth를 저장할 Integer 배열.
	 * @param rootId
	 *            Array로 추출할 root node ID (null 일 경우 전체 트리)
	 */
	@SuppressWarnings("unchecked")
	public void toArray(Object[] nodes, Integer[] depth, String rootId) {
		ArrayList nodeList = new ArrayList();

		TreeNode rootNode = null;
		if (rootId != null) {
			rootNode = (TreeNode) nodeBag.get(rootId);
		}
		if (rootNode == null) {
			rootNode = root;
		}

		rootNode.compileNode(nodeList);
		nodeList.toArray(nodes);

		if (depth != null) {
			ArrayList allDepth = new ArrayList();
			rootNode.compileDepth(allDepth);
			allDepth.toArray(depth);
		}
	}

	/**
	 * Tree로 정렬된 모든 결과를 리턴한다.
	 */
	@SuppressWarnings("unchecked")
	public List getList() {
		return getList(null);
	}

	/**
	 * Tree로 정렬된 결과를 리턴한다.
	 * 
	 * @param rootId
	 *            결과를 추출할 root ID
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getList(String rootId) {
		List nodeList = new ArrayList();

		TreeNode rootNode = null;
		if (rootId != null) {
			rootNode = (TreeNode) nodeBag.get(rootId);
		}
		if (rootNode == null) {
			rootNode = root;
		}

		rootNode.compileNode(nodeList);

		return nodeList;
	}

	public TreeNode getTreeNode(String rootId) {
		TreeNode rootNode = null;
		if (rootId != null) {
			rootNode = (TreeNode) nodeBag.get(rootId);
		}
		if (rootNode == null) {
			rootNode = root;
		}

		return rootNode;
	}
	
	/**
	 * Tree가 가지고 있는 Node의 갯수를 리턴한다.
	 */
	public int size() {
		return nodeBag.size();
	}

	/**
	 * Tree가 가지고 있는 Node의 갯수를 리턴한다.
	 */
	@SuppressWarnings("unchecked")
	public int size(String rootId) {
		ArrayList nodeList = new ArrayList();

		TreeNode rootNode = null;
		if (rootId != null) {
			rootNode = (TreeNode) nodeBag.get(rootId);
		}
		if (rootNode == null) {
			rootNode = root;
		}

		rootNode.compileNode(nodeList);

		return nodeList.size();
	}
}
