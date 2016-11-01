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
import java.util.Iterator;
import java.util.List;

/**
 * <pre>
 *   Tree에 저장될 수 있는 하나의 Node이다.
 *   TreeNode는 자신의 하위 TreeNode를 여러개 가질 수 있다.
 *   TreeNode의 depth는 1부터 계산된다.
 * </pre>
 * @author Alex, Eum
 */
public class TreeNode {

	private Object node;
	private int depth;
	@SuppressWarnings("unchecked")
	private ArrayList subNodeList;

	/**
	 * <pre>
	 * 생성자
	 * </pre>
	 * 
	 * @param node TreeNode가 가지고 있는 실제 Object.
	 * @param depth TreeNode의 depth. 1부터 존재함.
	 */
	public TreeNode(Object node, int depth) {
		this.node = node;
		this.depth = depth;
	}

	/**
	 * <pre>
	 *   TreeNode의 depth를 리턴한다.
	 * </pre>
	 */
	public int getDepth() {
		return depth;
	}

	/**
	 * <pre>
	 *   하위 TreeNode를 자신에게 추가한다.
	 * </pre>
	 * 
	 * @param subNode 추가될 하위 TreeNode.
	 */
	@SuppressWarnings("unchecked")
	public void add(TreeNode subNode) {
		if (subNodeList == null) {
			subNodeList = new ArrayList();
		}
		subNodeList.add(subNode);
	}

	/**
	 * <pre>
	 *   자신과 자신의 하위 TreeNode가 소유한 Node객체(Object)를
	 *   전체 목록(ArrayList)에 추가한다.
	 *   이때 추가되는 순서는, 한 라인씩 인쇄할 순서이다.
	 * </pre>
	 * 
	 * @param allNode 전체 Object 목록을 저장할 ArrayList.
	 */
	@SuppressWarnings("unchecked")
	public void compileNode(List allNode) {
		if (node != null) {
			allNode.add(node);
		}

		if (subNodeList != null) {
			Iterator it = subNodeList.iterator();
			TreeNode subNode = null;
			while (it.hasNext()) {
				subNode = (TreeNode) it.next();
				subNode.compileNode(allNode);
			}
		}
	}

	/**
	 * <pre>
	 *   자신과 자신의 하위 TreeNode의 depth를
	 *   전체 depth목록(ArrayList)에 추가한다.
	 *   이때 추가되는 순서는, 한 라인씩 인쇄할 순서이다. (compileNode 메서드와 동일)
	 * </pre>
	 * 
	 * @param allDepth 전체 depth 목록을 저장할 ArrayList.
	 */
	@SuppressWarnings("unchecked")
	public void compileDepth(List allDepth) {
		if (depth != 0) {
			allDepth.add(new Integer(depth));
		}

		if (subNodeList != null) {
			Iterator it = subNodeList.iterator();
			TreeNode subNode = null;
			while (it.hasNext()) {
				subNode = (TreeNode) it.next();
				subNode.compileDepth(allDepth);
			}
		}
	}
}

