@@ FileUpload 샘플을 실행하기 전에 아래 사항에 대해 수정을 해 주세요.


* core 서블릿 설정 변경필요


[수정 전] core-servlet.xml 의 내용 중, 아래 부분을..

(중략)
<anyframe:annotation-driven	synchronizeOnSession="true" >	
</anyframe:annotation-driven>
(중략)


[수정 후] 아래와 같이 수정해야 한다.

(중략)
<mvc:annotation-driven>
</mvc:annotation-driven>
(중략)



* /resource/fileupload.properties 파일 수정

common.temp.path=c:/Temp   (Streaming 데이타를 임시로 저장하는 Local Disk Path)
common.file.maxsize=-1	   (Binary File 제한 크기, Byte 단위. -1 인 경우 무제한)

disk.path=C:/Temp	   (업로드 된 파일의 저장 위치)

