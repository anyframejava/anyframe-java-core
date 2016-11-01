package org.anyframe.plugin.simpleweb.jquery.moviefinder.web;

import java.util.ArrayList;
import java.util.List;

import org.anyframe.plugin.simpleweb.jquery.domain.Genre;
import org.anyframe.plugin.simpleweb.jquery.domain.Movie;
import org.anyframe.simpleweb.controller.SimpleJSONTreeController;
import org.anyframe.simpleweb.jquery.jstree.Attributes;
import org.anyframe.simpleweb.jquery.jstree.JSTreeNode;

public class MovieTreeController extends SimpleJSONTreeController {

	@Override
	protected void setTreeData(ArrayList<JSTreeNode> listNode, List jsTreeList,
			String id) throws Exception {
		JSTreeNode node;
		Attributes attribute;
		if (id.equals("0")) {

			for (int i = 0; i < jsTreeList.size(); i++) {
				Genre genre = (Genre) jsTreeList.get(i);
				node = new JSTreeNode();
				attribute = new Attributes();

				attribute.setId(genre.getGenreId());
				
				node.setAttr(attribute);
				node.setData(genre.getName());
				node.setState(genre.getState());
				if(genre.getState()==null || genre.getState()=="")
					attribute.setRel("lockedroot");
				else
					attribute.setRel("root");
				listNode.add(node);
			}
		} else {
			if (jsTreeList.size() > 0) {
				for (int i = 0; i < jsTreeList.size(); i++) {
					Movie movie = (Movie) jsTreeList.get(i);

					node = new JSTreeNode();
					attribute = new Attributes();

					attribute.setId(movie.getMovieId());
					attribute.setRel("leaf");
					node.setAttr(attribute);
					node.setData(movie.getTitle());
					listNode.add(node);
				}
			}
		}
	}

}
