Anyframe Java Core
====

## 특징
* 순수 객체 중심의(POJO) 어플리케이션 개발 지원 : 프레임워크로 인해서 기본 설계와 상세 설계가 이중으로 진행되거나, 개발 시 설계 모델이 구현체와 불일치 되는 것을 줄이기 위해 순수 객체 중심의(POJO) 어플리케이션 개발을 지원한다.
* 개발자는 비즈니스 로직에만 집중하여 구현 : 로깅, 트랜잭션, 예외처리 등과 같은 비기능 영역에 대한 코드가 업무 기능 개발 영역에서 분리될 수 있도록 함으로써, 개발자는 비즈니스 로직에만 집중하여 구현할 수 있다.
* Dependency Injection을 통한 의존 관계 처리 : 인터페이스 중심의 개발을 가이드하고 객체나 컴포넌트간의 참조 관계는 Dependency Injection을 통해 처리함으로써 구현체의 변경에 따른 영향력을 최소화한다.
* MVC Model2 아키텍처 가이드 : Layered Architecture에 기반한 Java EE 웹 어플리케이션을 개발할 때 프리젠테이션 로직과 비지니스 로직을 완전히 분리하여 프리젠테이션 레이어를 구조적으로 개발할 수 있다.
* 기술 공통 서비스 제공 : DB 접근 및 SQL 처리, 캐쉬, WAS와 연동 등과 같은 중요 기능에 대해 재사용 가능한 기술 공통 서비스를 제공함으로써 보다 빠르고 안정적인 개발을 지원한다.
* 다양한 웹 클라이언트 기술과 용이한 연계 가능 : 최근 관심이 높아지고 있는 Ajax, 상용 X-internet 툴 등 다양한 웹 클라이언트 기술과 쉽게 연동되는 구조를 제공한다.
* 재사용 자산 관리 환경 제공 : 재사용 가능성이 높은 공통 컴포넌트나 업무 컴포넌트를 플러그인으로 제작하여 쉽게 활용할 수 있는 모델을 제시한다. 또한 이러한 모델을 기반으로 만들어진 재사용 자산을 체계적으로 관리할 수 있는 원격 저장소를 제공한다. 자세한 내용은 이곳을 참조한다.

## 주요 기능
### Lightweight 컨테이너
Anyframe Java Core에서 채택한 Spring Framework의 Lightweight 컨테이너는 순수 POJO(Plain Old Java Objects) 기반 개발을 지원하며, 순수 POJO 기반으로 설계/개발된 모듈들을 엮어서 해당 어플리케이션이 제대로 된 기능을 제공할 수 있도록 지원한다.
Spring Framework의 Lightweight 컨테이너는 다음과 같은 특징을 가지고 있다.

#### POJO 기반 개발 지원
설계 결과물에 컨테이너 의존적인 코드를 추가하지 않아도 순수 POJO 기반으로 어플리케이션 개발이 가능하도록 지원하다. 즉, Lightweight 컨테이너 기반 개발시 프레임워크로 인한 기본 설계와 상세 설계가 이중으로 진행되거나, 개발시 설계 모델과 구현체가 불일치되는 것을 방지할 수 있다.

#### Dependency Resolution 지원
어플리케이션 구성 모듈간 의존 관계를 처리하기 위한 방법을 제공한다. 특정 모듈의 코드 내에서 참조할 모듈을 직접적으로 생성하여 참조함으로써 참조 모듈간에 tightly-coupled 되지 않도록 하기 위해, 대부분의 Lightweight 컨테이너들과 마찬가지로 DI(Dependency Injection)을 지원하며, 이외에 DL(Dependency Lookup)도 가능하다.

    * DI란 각 클래스 사이의 의존 관계를 설정 정보를 바탕으로 컨테이너가 자동적으로 연결해주는 것을 말한다.
    * 또한 DL은 의존 관계에 놓인 특정 모듈을 사용하기 위해 개발자가 해당 모듈의 소스 코드 내에서 리소스들을 관리하는 컨테이너를 통해 직접적으로 찾는 것을 말한다.

!(README_image/di_4.jpg)

    * [1] Dependency Injection : 각 서비스 사이의 의존 관계를 속성 파일을 기반으로 컨테이너가 자동 처리
    * [2] Service Registration : 속성 파일을 기반으로 서비스 컨테이너의 서비스 목록에 해당 서비스 등록
    * [3] Service Lookup : 컨테이너에서 제공하는 API를 이용하여 사용하고자 하는 서비스 Lookup
    * [4] Retrieve Service Reference : 컨테이너는 해당 서비스의 인스턴스를 찾아 전달
    * [5] Invoke Methods : 클라이언트에서는 전달받은 인스턴스에 대해 특정 메소드 호출을 통해 원하는 기능 수행

DI와 DL에 대한 비교 및 보다 자세한 내용에 대해서는 Anyframe Java Core 매뉴얼을 참조하도록 한다.

#### Aspect Oriented Programming 지원
AOP는 어플리케이션 전체에 걸쳐 사용되나 쉽게 분리된 모듈로 작성하기 힘든 로깅, 인증, 권한체크, DB 연동, 트랜잭션, 락킹, 에러처리 등과 같은 공통 기능을 재사용 가능하도록 컴포넌트화 할 수 있는 기법이다.

!(README_image/aop.jpg)

AOP에는 새로운 용어가 많이 등장한다. AOP를 이용하여 개발을 수행하기 위해서는 Anyframe Java Core 매뉴얼을 참조하도록 한다.

#### Life-cycle 관리
Lightweight 컨테이너는 정의된 모듈의 Life-cycle을 관리하여 해당 모듈들을 초기화시키고 종료시키는 역할을 수행함으로써 개발자가 비즈니스 로직에 집중하여 개발할 수 있게 된다.

#### 신규 기능 추가 용이
XML/Annotation 기반의 설정을 통해서 간단하게 컨테이너 기반 위에 신규 기능을 추가할 수 있도록 지원한다.

### Plugins
Anyframe Java Core에서는 Spring, Hibernate, Query 등과 같은 다양한 오픈 소스들을 중심으로 참조 라이브러리와 샘플 코드를 엮어서 구성된 다양한 Plugin들을 제공한다. 사용자는 Plugin들을 적절히 선택하고 설치함으로써 해당 프로젝트에 필요한 기능들을 갖춘 샘플 프로젝트를 손쉽게 구성할 수 있게 된다.
Anyframe Java Core에서 제공하는 Plugin들은 다음과 같으며 이에 대한 보다 자세한 사항은 각 Plugin의 매뉴얼을 참조하도록 한다.

#### Essential Plugins
* core : 다른 Plugin 설치를 위한 기반을 제공하는 Plugin이며, SpringMVC + Spring + Spring JDBC를 이용한 영화 정보 관리 기능을 제공한다.
* datasource : Database에 연결하기 위한 Connection(javax.sql.Connection) 객체를 생성하는 Datasource 관련 설정 파일과 라이브러리를 제공한다. core plugin이 동작하는데 필요한 필수 plugin이다.
* logging : Log4j를 이용하여 Log를 체계적으로 관리할 수 있는 기능을 제공한다. core plugin이 동작하는데 필요한 필수 plugin이다.
* spring : Spring 관련 라이브러리를 제공한다. core plugin이 동작하는데 필요한 필수 plugin이다.

#### Optional Plugins
* async-support : Servlet 3 에 기반한 Spring 3.2.2.RELEASE에 추가된 비동기 요청 처리 기능에 대한 설명과 Server push 예제를 제공한다.
* cache : Terracotta의 Ehcache를 간편하게 사용하는 방법을 가이드하기 위한 영화 정보 관리 기능을 제공한다.
* chart : 오픈 소스 Chart 기능을 제공하는 FusionChart Free를 활용하여 Ajax 기법으로 웹 페이지 내에서 사용할 수 있는 Chart 기능을 제공한다.
* excel : Apache POI의 서브 프로젝트인 HSSF와 Query Service를 이용하여 Movie목록을 Excel파일로 처리하는 기능을 제공한다.
* fileupload : jQuery 기반의 표준 WEB 기술(Multipart Form Submit)을 활용하여 Binary 파일의 업로드 기본기능 및 Progress 처리 등의 확장 기능을 제공한다.
* flex-query : Adobe Flex와 BlezeDS, Spring Framework의 연계를 위한 설정 파일과 프로젝트에서 사용빈도가 높은 샘플 화면 8가지를 제공한다.
* generic : Java5부터 지원하는 Generics 개념을 기반으로 기본 CRUD 메소드 기능이 모두 구현된 클래스를 직접 이용하거나 상속받아서 사용할 수 있는 기능을 제공한다.
* hibernate : Hibernate와 Anyframe Java Core에서 구현한 Dynamic Hibernate Service를 이용한 영화 정보 관리 기능을 제공한다.
* i18n : DBMessageSource, LocaleResolver를 활용한 국제화 처리 사례를 제공한다.
* idgen : Anyframe Java Core의 ID Generation 서비스를 사용하여 유일한 ID를 생성하는 기능을 제공한다.
* jdbc-support : 오픈소스 p6spy 를 확장하여 SQL Injection 보안 위험을 방어할 수 있는 기능 및 최종 실행 쿼리에 대한 로깅(재처리) 기능을 제공한다.
* jquery : 자바스크립트 라이브러리인 jQuery를 이용하여 영화 정보 관리 기능을 제공한다.
* logback : Logback framework와 Anyframe Java Core간의 연계방법을 가이드 하기 위한 샘플코드를 제공한다.
* logging-sql : log4jdbc를 이용한 SQL Logging 기능을 제공한다.
* logmanager : Anyframe Java Core의 Log Manager와 연동하기 위한 Legacy Application으로써 샘플 코드를 제공한다.
* mip-query : TOBESOFT에서 제공하는 X-Internet 솔루션인 MiPlatform을 Anyframe Java Core와 연계하여 영화 정보 관리 기능 및 실제 시스템 개발 시 활용할 수 있는 다양한 UI Sample을 제공한다. mipsample plugin 기능 확인을 위해 DB에 추가되어야 할 샘플 데이터가 함께 제공된다.
* mybatis : Mybatis를 활용한 영화 정보 관리 기능을 제공한다.
* oscache : opensymphony의 OSCache를 간편하게 활용할 수 있도록 하기 위해 제공되는 OSCache Service의 기본 활용 방법을 가이드하기 위한 샘플 코드를 제공한다.
* query : 쿼리문이나 객체의 입력만으로 DB 데이터 조작을 가능하게 하는 Anyframe Java Core의 Query 서비스를 활용하여 영화 정보를 관리하는 기능을 제공한다.
* query-ria : 다양한 RIA 플랫폼과 Anyframe Java Core의 Query 서비스를 연계하는데 필요한 Query서비스의 확장 라이브러리들을 제공한다.
* remoting : Spring Remoting 기법 중 HttpInvoker를 활용하여 영화 정보 조회 기능을 제공한다.
* routingdatasource : AbstractRoutingDataSource를 활용하여 다중으로 정의된 DB를 동적으로 변경하여 접근하는 방법을 가이드 한다.
* scheduling : Quartz의 작업 추가, 수정, 삭제 등을 간편하게 활용할 수 있도록 하기 위해 제공되는 Scheduling 서비스의 기본 활용 방법과 샘플 코드를 제공한다.
* sockjs : Java EE 7에 새롭게 추가된 WebSocket 처리의 특징과 사용법을 설명하고, 그에 기반해 스프링 4.0.0.RELEASE에서 추가된 WebSocket 처리에 대한 활용 방법을 가이드하기 위한 샘플 코드와 이 오픈 소스를 활용하는데 필요한 가이드라인으로 구성되어 있다.
* springrest : SpringMVC 기반의 웹어플리케이션에 대해 REST 스타일을 적용하여 영화 정보 관리 기능을 제공한다.
* stomp : Java EE 7에 새롭게 추가된 메시지 푸시 처리의 특징과 사용법을 설명하고, 그에 기반해 스프링 4.0.0.RELEASE에서 추가된 푸시 처리에 대한 활용 방법을 가이드하기 위한 샘플 코드와 이 오픈 소스를 활용하는데 필요한 가이드라인으로 구성되어 있다.
* test : 테스트 코드 실행에 필요한 참조 라이브러리만을 제공한다.
* tiles : Tiles(Apache Tiles 2.2.1) 기반의 화면 레이아웃 정의 방법을 가이드한다.
* util : Anyframe Java Core 서비스에 포함되어 있는 Date, Digest, Number, String, Validation 유틸리티 활용을 위한 demo 화면을 제공한다.
* util-system : 시스템 리소스를 확인할 수 있는 Util-System Service의 내용을 simpleweb-jquery plugin(jQuery UI Portlet)과 chart plugin의 FusionChart Free 서비스를 사용하여 DashBoard 형태로 한눈에 볼 수 있는 웹 어플리케이션 형태로 제공한다.
* websocket : Java EE 7에 새롭게 추가된 WebSocket 처리의 특징과 사용법을 설명하고, 그에 기반해 스프링 4.0.0.RELEASE에서 추가된 WebSocket 처리에 대한 활용 방법을 가이드하기 위한 샘플 코드와 이 오픈 소스를 활용하는데 필요한 가이드라인으로 구성되어 있다.
* xp-query : Anyframe Java Core와 XPLATFORM 연계에서 XP QueryService 사용을 위한 가이드와 샘플 코드를 제공한다.
* xplatform : Anyframe Java Core와 XPLATFORM 연계를 위한 가이드와 샘플 코드를 제공한다.

#### Parking Plugins
* Plugin Parking이란 Anyframe Java Core에서 제공하는 다양한 Plugin 중, 활용 빈도가 낮은 Plugin들을 선별하여 해당 Plugin에 대한 개선을 중단함을 의미한다. 단, Parking이 영구적인 개선 중단을 의미하지는 않으며, 해당 Plugin에 대한 활용 요구가 증가할 경우 해제할 수 있다.

* board : GUI 기반으로 게시판 생성에 대한 정보(파일첨부, 덧글, 익명여부등의 부가기능 포함)를 입력하여 게시판을 자동 생성할 수 있다.
* cxf : Apache CXF관련 라이브러리를 제공한다.
* cxf-jaxrs : Apache CXF를 활용하여 HTTP 기반의 REST 아키텍처 스타일의 웹 서비스로 구현한 영화 정보 관리 기능을 제공한다.
* cxf-jaxws : Apache CXF를 활용하여 SOAP 기반의 웹 서비스로 구현한 영화 정보 목록 및 상세 조회 기능을 제공하고 있으며 자동 생성된 WSDL을 확인할 수 있다.
* iam : Anyframe Java Core의 IAM(Identity & Access Management)을 이용하여 DB 기반의 사용자 인증 및 권한 제어 기능을 제공한다.
* ibatis2 : iBATIS2를 활용한 영화 정보 관리 기능을 제공한다.
* jasperreports : JasperReports와 Spring을 연계하여 영화 정보 등록 현황을 HTML, PDF 형태의 Report로 보여준다.
* monitoring : 오픈소스 Monitoring Tool인 Infrared를 이용하여 샘플 어플리케이션의 성능을 다양한 형태로 측정, 수집함으로써 정성적인 성능 분석을 가능하게 해준다.
* simpleweb : Anyframe Java Core에서 제공하는 웹 개발 단순화 방법을 활용하는 데 필요한 공통 설정파일과 라이브러리들을 제공한다.
* simpleweb-vo : Web Application을 개발 할때 개발자가 웹 개발을 보다 쉽게 할 수 있도록 웹 개발 단순화 방법을 가이드 하며 공통 Controller 클래스와 Tag Library를 제공한다. Transfer Object로 VO(Value Object)를 사용하는 경우에 대해 영화 정보 관리 기능을 샘플 코드로 제공한다.
* simpleweb-map : Web Application을 개발 할때 개발자가 웹 개발을 보다 쉽게 할 수 있도록 웹 개발 단순화 방법을 가이드 하며 공통 Controller 클래스와 Tag Library를 제공한다. Transfer Object로 Map(java.util.Map) 객체를 사용하는 경우에 대해 영화 정보 관리 기능을 샘플 코드로 제공한다.
* simpleweb-jquery : Web Application을 개발 할때 개발자가 웹 개발을 보다 쉽게 할 수 있도록 웹 개발 단순화 방법을 가이드 하며 공통 Controller 클래스와 Tag Library를 제공한다. JSON 형태의 데이터를 사용하여 영화 정보 관리 기능을 샘플 코드로 제공한다. 이와 함께 jQuery 컴포넌트들(jqgrid, quickpager, autocomplete, jstree, ui-tab, dropdown, uploadify)과의 연계 방안도 제공한다.
* spring-optional : Anyframe Java Core Plugin을 통해 설치되지 않는 Spring 라이브러리들(spring-aspects, spring-instrument, spring-instrument-tomcat, spring-jms, spring-webmvc-portlet 등)을 제공하고 샘플 코드 및 매뉴얼은 따로 제공하지 않는다.
* struts : Struts를 이용하여 영화 정보 관리 기능을 제공한다.
* webflow : Spring Webflow를 이용하여 영화 정보 관리 기능을 제공한다.


### 리소스
Anyframe Java Core 5.6.0은 JDK 1.6 이상 환경에서 사용될 수 있으며, 사용하고 있는 주요 오픈 소스는 다음과 같다.

* [Spring Framework 4.0.0.RELEASE](http://www.springsource.org/)
* [Hibernate 3.6.9.Final](http://www.hibernate.org/)
* [Apache Commons Projects (DBCP, BeanUtils, Collections...)](http://commons.apache.org/)
* [EHCache 2.5.0](http://ehcache.org/)
* [Quartz 2.1.3](http://www.quartz-scheduler.org/)
* [Log4j 1.2.15](http://logging.apache.org/log4j)
* [MyBatis 3.1.0](http://www.mybatis.org/)

JDK 1.5 환경에서는 Anyframe Java Core 5.5.2를 사용해야 하므로, 다음의 위치에서 매뉴얼을 참조하도록 한다.
* [Anyframe Java Core 5.5.2 매뉴얼](http://www.anyframejava.org/project/anyframe552/reference)
