USE [C115_falconmail00_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_PaginationV2]    Script Date: 5/6/2022 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






ALTER proc [dbo].[Friends_PaginationV2]

				@PageIndex int
				,@PageSize int
			

AS


/*

Execute dbo.Friends_PaginationV2 

*/


BEGIN


Declare @offSet int = @PageIndex * @PageSize



SELECT  
					f.Id
					,f.Title
					,f.Bio
					,f.Summary
					,f.Headline
					,f.Slug
					,f.StatusId
					,f.UserId
					,i.Id
					,i.TypeId
					,i.Url
					
					,TotalCount = COUNT(1) OVER()



From dbo.Friends as f inner join dbo.Images as i
ON f.PrimaryImageId = i.Id
ORDER BY f.Id

		
		
		OFFSET @offSet Rows
			Fetch Next @PageSize Rows ONLY

END
