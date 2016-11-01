/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.idgen.impl;

/**
 * This class is useful for writing MultiThreaded test cases where you need to
 * perform multithreaded load testing on a component.
 * <p>
 * An instance of will create a block of threads of the specified size. Each
 * thread will be assigned to run a specified Runnable instance. The threads
 * will then all wait at a latch until the go method is called. The go method
 * will not return until all of the Runnables have completed.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class LatchedThreadGroup {
	private Thread[] mThreads;

	private Object mSemaphore = new Object();

	private int mStartedCount;

	private boolean mLatched;

	private int mCompletedCount;

	private Throwable mException;

	/*---------------------------------------------------------------
	 * Constructors
	 *-------------------------------------------------------------*/
	/**
	 * Creates a LatchedThreadGroup with a thread for each Runnable in the
	 * runnables array.
	 * 
	 * @param runnables
	 *            runnable objects
	 */
	public LatchedThreadGroup(Runnable[] runnables) {
		int threadCount = runnables.length;
		mThreads = new Thread[threadCount];
		for (int i = 0; i < threadCount; i++) {
			mThreads[i] = new Runner(runnables[i], "Latched_Thread_" + i);
		}
	}

	/**
	 * Creates a LatchedThreadGroup with threadCount threads each running
	 * runnable.
	 * 
	 * @param runnable
	 *            runnable object
	 * @param threadCount
	 *            thread count
	 */
	public LatchedThreadGroup(Runnable runnable, int threadCount) {
		mThreads = new Thread[threadCount];
		for (int i = 0; i < threadCount; i++) {
			mThreads[i] = new Runner(runnable, "Latched_Thread_" + i);
		}
	}

	/*---------------------------------------------------------------
	 * Methods
	 *-------------------------------------------------------------*/
	/**
	 * reset memory
	 */
	protected void resetMemory() {
		System.gc();
		System.gc();

		// Let the system settle down.
		try {
			Thread.sleep(50);
		} catch (InterruptedException e) {
		}
		Runtime runtime = Runtime.getRuntime();
		System.out.println("Memory: "
				+ (runtime.totalMemory() - runtime.freeMemory()));
	}

	/**
	 * Causes all of the Runnables to start at the same instance. This method
	 * will return once all of the Runnables have completed.
	 * 
	 * @return time, in milliseconds, that it took for all of the Runnables to
	 *         complete.
	 * @throws Exception
	 *             fail to execute go method
	 */
	public long go() throws Exception {
		// Start each of the threads. They will block until the latch is
		// released. This is
		// necessary because it takes some time for the threads to each allocate
		// their required
		// system resources and actually be ready to run.
		int threadCount = mThreads.length;
		for (int i = 0; i < threadCount; i++) {
			mThreads[i].start();
		}

		// Wait for all of the threads to start before starting to time the test
		synchronized (mSemaphore) {
			while (mStartedCount < threadCount) {
				mSemaphore.wait();
			}

			// Start clean
			resetMemory();

			// Release the threads.
			mLatched = true;
			System.out.println("Main thread released the test thread latch.");
			mSemaphore.notifyAll();
		}
		// Start timing
		long startTime = System.currentTimeMillis();

		// Wait for all of the threads to complete
		synchronized (mSemaphore) {
			System.out.println("Waiting for test threads to all complete.");
			while (mCompletedCount < threadCount) {
				try {
					mSemaphore.wait();
				} catch (InterruptedException e) {
				}
			}
		}
		final long duration = System.currentTimeMillis() - startTime;
		System.out.println("All test threads completed.");

		if (mException != null) {
			throw new Exception("Exception in test thread." + mException);
		}
		return duration;
	}

	/**
	 * Inner access method to getLogger() to work around a bug in the Javac
	 * compiler when getLogger() is called from the method of an inner class.
	 * Jikes seems to handle it Ok. :-/
	 */
	// private Logger getInnerLogger()
	// {
	// return getLogger();
	// }
	/*---------------------------------------------------------------
	 * Inner Classes
	 *-------------------------------------------------------------*/
	private class Runner extends Thread {
		private Runnable mRunnable;

		/**
		 * constructor wieh Runnable object and name
		 * 
		 * @param runnable
		 *            runnable object
		 * @param name
		 *            name of runnable object
		 */
		protected Runner(Runnable runnable, String name) {
			super(name);
			mRunnable = runnable;
		}

		/**
		 * execute runnable object
		 */
		public void run() {
			try {
				// Need all threads to wait until all the others are ready.
				synchronized (mSemaphore) {
					mStartedCount++;
					System.out.println("Started " + mStartedCount
							+ " test threads.");
					if (mStartedCount >= mThreads.length) {
						mSemaphore.notifyAll();
					}
					while (!mLatched) {
						try {
							mSemaphore.wait();
						} catch (InterruptedException e) {
						}
					}
				}

				// Run the runnable
				try {
					mRunnable.run();
				} catch (Throwable t) {
					synchronized (mSemaphore) {
						System.err.println("Error in "
								+ Thread.currentThread().getName() + t);
						if (mException != null) {
							mException = t;
						}
					}
				}
			} finally {
				// Say that we are done
				synchronized (mSemaphore) {
					mCompletedCount++;
					System.out.println(mCompletedCount
							+ " test threads completed.");
					mSemaphore.notifyAll();
				}
			}
		}
	}
}
