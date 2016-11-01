-- default table
DROP TABLE logging_event_exception IF EXISTS;
DROP TABLE logging_event_property IF EXISTS;
DROP TABLE logging_event IF EXISTS;

CREATE TABLE logging_event (
  timestmp BIGINT NOT NULL,
  formatted_message LONGVARCHAR NOT NULL,
  logger_name VARCHAR(256) NOT NULL,
  level_string VARCHAR(256) NOT NULL,
  thread_name VARCHAR(256),
  reference_flag SMALLINT,
  arg0 VARCHAR(256),
  arg1 VARCHAR(256),
  arg2 VARCHAR(256),
  arg3 VARCHAR(256),
  caller_filename VARCHAR(256), 
  caller_class VARCHAR(256), 
  caller_method VARCHAR(256), 
  caller_line CHAR(4),
  event_id BIGINT NOT NULL IDENTITY);

CREATE TABLE logging_event_property (
  event_id BIGINT NOT NULL,
  mapped_key  VARCHAR(254) NOT NULL,
  mapped_value LONGVARCHAR,
  PRIMARY KEY(event_id, mapped_key),
  FOREIGN KEY (event_id) REFERENCES logging_event(event_id));

CREATE TABLE logging_event_exception (
  event_id BIGINT NOT NULL,
  i SMALLINT NOT NULL,
  trace_line VARCHAR(256) NOT NULL,
  PRIMARY KEY(event_id, i),
  FOREIGN KEY (event_id) REFERENCES logging_event(event_id));
  
 -- custom table  
  
 DROP TABLE my_logging_event_exception IF EXISTS;
DROP TABLE my_logging_event_property IF EXISTS;
DROP TABLE my_logging_event IF EXISTS;

CREATE TABLE my_logging_event (
  my_timestmp BIGINT NOT NULL,
  my_formatted_message LONGVARCHAR NOT NULL,
  my_logger_name VARCHAR(256) NOT NULL,
  my_level_string VARCHAR(256) NOT NULL,
  my_thread_name VARCHAR(256),
  my_reference_flag SMALLINT,
  my_arg0 VARCHAR(256),
  my_arg1 VARCHAR(256),
  my_arg2 VARCHAR(256),
  my_arg3 VARCHAR(256),
  my_caller_filename VARCHAR(256), 
  my_caller_class VARCHAR(256), 
  my_caller_method VARCHAR(256), 
  my_caller_line CHAR(4),
  event_id BIGINT NOT NULL IDENTITY);

CREATE TABLE my_logging_event_property (
  event_id BIGINT NOT NULL,
  my_mapped_key  VARCHAR(254) NOT NULL,
  my_mapped_value LONGVARCHAR,
  PRIMARY KEY(event_id, my_mapped_key),
  FOREIGN KEY (event_id) REFERENCES my_logging_event(event_id));

CREATE TABLE my_logging_event_exception (
  event_id BIGINT NOT NULL,
  my_i SMALLINT NOT NULL,
  my_trace_line VARCHAR(256) NOT NULL,
  PRIMARY KEY(event_id, my_i),
  FOREIGN KEY (event_id) REFERENCES my_logging_event(event_id));
   
  