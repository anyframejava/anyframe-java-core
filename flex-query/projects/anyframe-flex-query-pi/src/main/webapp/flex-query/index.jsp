<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Anyframe Flex Samples</title>
<link href="main.css" rel="stylesheet" type="text/css" />
</head>
<script type="text/javascript">
function openFlexWindows(){
	var url = './uisample/Main.html';
	var newWin = window.open(url,"","scrollbars=0,status=0,resizable=0,menubar=0,toolbar=0,location=0,titlebar=0,directories=0,width=1024,height=610");
}
</script>
<body>

<h1><img src="images/anyframe_flex_log.png" width="290" height="53" /></h1>
<div class="highlight">
<h1>Anyframe Flex Query Plugin</h1>
<p>Anyframe Flex Query Plugin은 Flex UI Sample Application과 Spring BlazeDS Integration의 주요 기능을 테스트 하기위한 Test Drive Application으로 구성되어 있습니다.</br>
Test Drive는 <a href="http://static.springsource.org/spring-flex/docs/1.5.x/reference/html/">Spring BlazeDs Integration Test Drive</a>를 Anyframe의 FlexService, QueryService를 사용해 수정했습니다.</p>
</div>
</br>
<div class="highlight">
  <h2>Anyframe Flex Sample Index</h2>

<h4>HTTPService</h4>
<ul>
<li><a href="#httpservice">HTTP Service </a>: BlazeDS와 Spring MVC를 이용한 샘플.</li>
</ul>

<h4>Remoting</h4>
<ul>
<li><a href="#movieservice">Movie Management Application</a>: Movie관리 Application을 Spring BlazeDS Integration을 이용해 제공.</li>
<li><a href="#insync">inSync Contact Management Application</a>: FlexService를 사용한 간단한 CRUD Application을 구성하는 방법을 6단계로 제공.</li>
<li><a href="#company">Company Management Application</a>: FlexService를 이용한 CRUD Application.</li>
</ul>

<h4>Messaging</h4>
<ul>
<li><a href="#chat">Chat</a>: Messaging을 이용한 Chat Application.</li>
<li><a href="#jmspush">JMS Push</a>: JMS Topic과 Messaging를 이용한 Server Push.</li>
<li><a href="#collaboration">Collaboration</a>: 서로 다른 클라이언트에서 Messaging을 이용해 원격으로 협업하는 예.</li>
</ul>

<h4>Anyframe Flex UI Sample</h4>
<ul>
<li><a href="#uisample">Anyframe Flex UI Sample Application</a>: 8개의 UI 샘플.</li>
<li><a href="#fileupload">File Upload/Download Sample Application</a>: File Upload/Download 샘플.</li>
</ul>
</div>
<br />

<h1>Test Drive</h1>
<h2>HTTPService Samples</h2>
<a name="httpservice"></a>
<div class="item">
<h3>HTTPService를 사용한 Data Accessing</h3>
<h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면  <a href="httpservice/httpservice.html">여기</a>를 클릭하세요 .</li>
  <li>조회 된 Data는 catalog.jsp에 의해 XML로 변경됩니다.</li>
    <!-- li>Also notice some of the built-in DataGrid  features:</li>
    <ul>
      <li>Sortable columns  (click on a column header) </li>
      <li>Moveable columns (click on a column header and, with the mouse button pressed, move the column to a new position) </li>
    </ul-->
  </ol>
</div>

<h2>Remoting Samples</h2>
<a name="movieservice"></a>
<div class="item">
<h3>Movie Service Basic CRUD</h3>
<h4>Run the sample:</h4>
<ol>
  <li>Spring BlazeDS Integration을 사용한 MovieService 샘플입니다.</li>
  <li>Application을 시작하려면 <a href="moviefinder/moviefinder.html">여기</a>를 클릭하세요.</li>
</ol>
</div>
<a name="insync"></a>
<div class="item">
  <h3>InSync01: Searching Contacts</h3>
  <h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면 <a href="insync01/insync01.html">여기</a>를 클릭하세요 .</li>
  <li>Search 버튼을 클릭하면 Database의 contact 테이블의 모든 데이터를 조회합니다.</li>
  <li>Input Field에 조회 조건을 입력하고 Search 버튼을 클릭하면  First Name 컬럼에서 해당하는 데이터를 조회합니다.</li>
  </ol>
</div>
<br />

<div class="item">
  <h3>InSync02: Using the RemoteObject Events</h3>
  <h4>Run the sample:</h4>
  <ol>
 	 <li>Application을 시작하려면 <a href="insync02/insync02.html">여기</a>를 클릭하세요 .</li>
 	 <li>RemoteObject의 result, fault Event를 사용했습니다.</li>
  </ol>
</p>
</div>
<br />

<div class="item">
  <h3>InSync03: Strong Typing</h3>
  <h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면 <a href="insync03/insync03.html">여기</a>를 클릭하세요 .</li>
  <li>Search 버튼을 클릭하면 Database의 contact 테이블의 모든 데이터를 조회합니다.</li>
  <li>Input Field에 조회 조건을 입력하고 Search 버튼을 클릭하면  First Name 컬럼에서 해당하는 데이터를 조회합니다.</li>
  <li>DataGrid에서 Contact를 클릭하면 Contact form에서 수정 할 수 있습니다.</li>
  <li>Save버튼을 클릭하면 수정된 결과가 Database에 저장됩니다.</li>
  </ol>
</div>
<br />

<div class="item">
  <h3>InSync04: Opening Multiple Contacts</h3>
  <h4>Run the sample:</h4>
<ol>
	<li>Application을 시작하려면  <a href="insync04/insync04.html">여기</a>를 클릭하세요 .</li>
  <li>Search 버튼을 클릭하면 Database의 contact 테이블의 모든 데이터를 조회합니다.</li>
  <li>Input Field에 조회 조건을 입력하고 Search 버튼을 클릭하면  First Name 컬럼에서 해당하는 데이터를 조회합니다.</li>
  <li>DataGrid에서 contact를 더블 클릭 하면 탭화면이 추가 됩니다.</li>
  <li>Contact from에서 값을 수정하고 Save버튼을 클릭하면 Database에 값이 저장됩니다.</li>
  </ol>
</div>
<br />

<div class="item">
  <h3>InSync05: Adding New Contacts</h3>
  <h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면 <a href="insync05/insync05.html">여기</a>를 클릭하세요 .</li>
  <li>Search 버튼을 클릭하면 Database의 contact 테이블의 모든 데이터를 조회합니다.</li>
  <li>New Contact을 클릭하면 신규 Contact를 추가 할 수 있습니다.</li>
  
  </ol>
</div>
<br />

<div class="item">
  <h3>InSync06: Adding Event Notification for &quot;Loosely Coupled&quot; UI Synchronization</h3>
  <h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면 <a href="insync06/insync06.html">여기</a>를 클릭하세요 .</li>
  <li>Search 버튼을 클릭하면 Database의 contact 테이블의 모든 데이터를 조회합니다.</li>
  <li>Input Field에 조회 조건을 입력하고 Search 버튼을 클릭하면  First Name 컬럼에서 해당하는 데이터를 조회합니다.</li>
  <li>DataGrid에서 contact를 더블 클릭 하면 탭화면이 추가 됩니다.</li>
  <li>contact의 first name또는 last name을 수정하고 save버튼을 클릭하면 DataGrid에 수정 된 데이터가 반영됩니다.</li>
 <li>New Contact을 클릭하면 신규 Contact를 추가 할 수 있습니다.</li>
  </ol>
</div>
<br />

<a name="company"></a>
<div class="item">
  <h3>Company Manager</h3>
  <h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면 <a href="companymgr/companymgr.html">여기</a>를 클릭하세요 .</li>
  <li>Search 버튼을 클릭하면 Database의 Company 테이블의 모든 데이터를 조회합니다.</li>
  <li>Input Field에 조회 조건을 입력하고 Search 버튼을 클릭하면  Name 컬럼에서 해당하는 데이터를 조회합니다.</li>
  </ol>
</div>
<br />

<h2>Messaging Samples</h2>

<a name="chat"></a>
<div class="item">
  <h3>Chat</h3>
  <h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면 <a href="chat/chat.html">여기</a>를 클릭하세요 .</li>
  <li>다른 Browser를 열고 같은 URL을 입력 해 두 개의 Chat Application을 실행한다.</li>
  <li>Browser에서 메세지를 입력하고 Send버튼을 누르면 다른 Browser에 메세지가 나타난다.</li>
  </ol>
</div>
<br />

<a name="jmspush"></a>
<div class="item">
  <h3>JMS Push</h3>
  <h4>Run the sample:</h4>
  <p>이 Application은 JMS를 이용해 Sever측의 데이터를 클라이언트에 Push하는 예이다.</p>
  <div class="highlight">
  	<p>이 Application은 ActiveMQ를 이용했다. src/main/resources/spring/context-jms.xml파일을 참고한다.</p>
  	<p><strong>실행방법</strong></p>
	<ol>
		<li>ActiveMQ 5.4.2을 <a href="http://activemq.apache.org/activemq-542-release.html">다운</a>받는다.</li>
		<li>{ActiveMQ 5.4.2설치 위치}/bin/activemq.bat를 실행해 JMS서버를 시작한다.</li>
		<li>{프로젝트}/src/main/resources/spring/context-scheduling-trigger.xml를 열어 아래 주석을 제거한다.</li>
		<li>WAS를 재시작한다.</li>
	</ol>
  </div>
  <li>Application을 시작하려면 <a href="jmspush/jmspush.html">여기</a>를 클릭하세요 .</li>
</ol>
</div>
<br />

<a name="collaboration"></a>
<div class="item">
  <h3>Collaboration</h3>
  <h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면 <a href="collaboration/collaboration.html">여기</a>를 클릭하세요 .</li>
  <li>다른 Browser를 열고 같은 URL을 입력 해 두 개의 Collaboration Application을 실행한다.</li>
  <li>한 개의 Browser에서 데이터를 입력하거나 변경하면 다른 Browser에서 실시간으로 데이터가 변경된다.</li>
</ol>
</div>
<br />

<h1>Anyframe Flex UI Sample</h1>
<h2>Flex UI Sample</h2>
<a name="uisample"></a>
<div class="item">
<h3>Flex UI Sample</h3>
<h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면 <a href="javascript:openFlexWindows();">여기</a>를 클릭하세요 .</li>
  <li>사용자 ID, Password를 임의로 입력 해  로그인 합니다.</li>
  <li>Grid, Tree, Form, Tab 등에 대한 UI 샘플 입니다.</li>
 </ol>
</div>
<br />
<a name="fileupload"></a>
<div class="item">
<h3>File Upload/Download</h3>
<h4>Run the sample:</h4>
<ol>
  <li>Application을 시작하려면  <a href="fileupload/fileupload.html">여기</a>를 클릭하세요 .</li>
  <li>file 저장 위치는 src/main/resources/context.properties파일의 repository.path를 참고 한다.</li>
 </ol>
</div>
<p>&copy; 2008-2012 www.anyframejava.org - SAMSUNG SDS</p>
</body>
</html>