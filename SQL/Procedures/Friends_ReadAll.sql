ALTER proc [dbo].[Friends_SelectAllV2]

AS


/*
Execute dbo.Friends_SelectAllV2

*/

BEGIN

SELECT     f.Id
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


FROM [dbo].[Friends] as f inner join dbo.Images as i
 ON f.PrimaryImageId = i.Id

END
