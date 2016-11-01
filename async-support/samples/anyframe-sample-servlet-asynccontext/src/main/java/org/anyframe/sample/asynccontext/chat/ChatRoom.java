/*
 * Copyright 2008-2013 the original author or authors.
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
package org.anyframe.sample.asynccontext.chat;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.servlet.AsyncContext;
import javax.servlet.AsyncEvent;
import javax.servlet.AsyncListener;

import org.apache.log4j.Logger;

public class ChatRoom {

	private static ChatRoom INSTANCE = new ChatRoom();

	public static ChatRoom getInstance() {
		return INSTANCE;
	}

	private Logger logger = Logger.getLogger(getClass());
	private List<AsyncContext> clients = new LinkedList<AsyncContext>();
	private BlockingQueue<String> messageQueue = new LinkedBlockingQueue<String>();

	private Thread messageHandlerThread;
	private boolean running;

	private ChatRoom() {
	}

	public void init() {
		running = true;
		Runnable handler = new Runnable() {
			public void run() {
				logger.info("Starting... Message Handler.");
				while (running) {
					try {
						String message = messageQueue.take();
						logger.info("Take message [" + message + "] from messageQueue");

						sendMessageToAllInternal(message);
					} catch (InterruptedException ex) {
						break;
					}
				}
			}
		};
		messageHandlerThread = new Thread(handler);
		messageHandlerThread.start();
	}

	public void enter(final AsyncContext asyncCtx) {
		asyncCtx.addListener(new AsyncListener() {
			public void onTimeout(AsyncEvent event) throws IOException {
				logger.info("onTimeout");
				clients.remove(asyncCtx);
			}

			public void onError(AsyncEvent event) throws IOException {
				logger.info("onError");
				clients.remove(asyncCtx);
			}

			public void onStartAsync(AsyncEvent event) throws IOException {
			}

			public void onComplete(AsyncEvent event) throws IOException {
				logger.info("onComplete");
			}
		});
		try {
			sendMessageTo(asyncCtx, "Welcome!");
			clients.add(asyncCtx);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void sendMessageToAll(String message) {
		try {
			messageQueue.put(message);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		logger.info("Add message [" + message + "] to messageQueue");
	}

	private void sendMessageToAllInternal(String message) {
		for (AsyncContext ac : clients) {
			try {
				sendMessageTo(ac, message);
			} catch (IOException e) {
				clients.remove(ac);
			}
		}
		logger.info("Send message [" + message + "] to all clients");
	}

	private void sendMessageTo(AsyncContext ac, String message) throws IOException {
		logger.info("Pushing the Received Message to the Live Client~");
		logger.info("Thread ID : " + Thread.currentThread().getId());
		PrintWriter acWriter = ac.getResponse().getWriter();
		acWriter.println(toJSAppendCoomand(message));
		acWriter.flush();
	}

	private String toJSAppendCoomand(String message) {
		return "<script type='text/javascript'>\n" + "window.parent.chatapp.append({ message: \"" + escape(message)
				+ "\" });\n" + "</script>\n";
	}

	public void close() {
		running = false;
		messageHandlerThread.interrupt();
		logger.info("Stopped Message Handler.");

		for (AsyncContext ac : clients) {
			ac.complete();
		}
		logger.info("Complete All Client AsyncContext.");
	}

	private static String escape(String orig) {
		StringBuilder builder = new StringBuilder((int) (orig.length() * 1.2f));

		for (int i = 0; i < orig.length(); i++) {
			char c = orig.charAt(i);
			switch (c) {
				case '<':
					builder.append("&lt;");
					break;
				case '>':
					builder.append("&gt;");
					break;
				case '&':
					builder.append("&amp;");
					break;
				default:
					builder.append(c);
			}
		}
		return builder.toString();
	}

}
