/* 
Example SQL query: create an indexed view for journals/questions written in a specifix language 
and create fulltext search index on the indexed view.
*/

--Set the options to support indexed views.
-- SET NUMERIC_ROUNDABORT OFF;
-- SET ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT,
--    QUOTED_IDENTIFIER, ANSI_NULLS ON;

--Create view with schemabinding.
IF OBJECT_ID ('journalViews.vjournalsSimplifiedChinese', 'view') IS NOT NULL
   DROP VIEW journalViews.vjournalsSimplifiedChinese;
GO

CREATE VIEW journalViews.vjournalsSimplifiedChinese
   WITH SCHEMABINDING
   AS  
      SELECT id, title, body FROM [dbo].[journals] WHERE LanguageId = '06b03a84-5274-47d9-bb2a-72a2e84cdb94'
GO

--Create an index on the view.
CREATE UNIQUE CLUSTERED INDEX IDX_V1
   ON journalViews.vjournalsSimplifiedChinese(id);
GO

--Create fulltext catalog 
-- CREATE FULLTEXT CATALOG writing_hub_catalog;  
-- GO  
CREATE FULLTEXT INDEX ON journalViews.vjournalsSimplifiedChinese
 (   
  title 
     Language 2052,  
  body  
     Language 2052    
 )   
  KEY INDEX IDX_V1  
      ON writing_hub_catalog;   


   