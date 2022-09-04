
ALTER proc [dbo].[Friends_UpdateV2]
			
                   @Id int
                  ,@Title nvarchar(120)
                  ,@Bio nvarchar(700)
                  ,@Summary nvarchar(255)
                  ,@Headline nvarchar(80)
                  ,@Slug nvarchar(100) 
                  ,@StatusId int
                  ,@UserId int
                  ,@TypeId int
                  ,@PrimaryImageUrl nvarchar(50)

AS

/*
Declare            @Id int= 11
                  ,@Title nvarchar(120)= 'Harry'
                  ,@Bio nvarchar(700)= 'Famous'
                  ,@Summary nvarchar(255)= 'Actor'
                  ,@Headline nvarchar(80)= 'Movies'
                  ,@Slug nvarchar(100)= 'Unique2'
                  ,@StatusId int = 902
                  ,@UserId int =3456
                  ,@TypeId int = 113
                  ,@PrimaryImageUrl nvarchar(50) ='imageUrl.jpeg'


Execute dbo.Friends_SelectAllV2	 


Execute dbo.Friends_UpdateV2
                   
                   @Id  
                  ,@Title 
                  ,@Bio 
                  ,@Summary 
                  ,@Headline 
                  ,@Slug 
                  ,@StatusId 
                  ,@UserId
                  ,@TypeId
                  ,@PrimaryImageUrl
			 
Execute dbo.Friends_SelectAllV2
*/


BEGIN

Declare           @dateNow datetime2 = getutcdate()


UPDATE [dbo].[Friends]
		
SET                [Title] = @Title
                  ,[Bio] = @Bio
                  ,[Summary]= @Summary
                  ,[Headline] = @Headline
                  ,[Slug] = @Slug
                  ,[StatusId] = @StatusId
                  ,[UserId] = @UserId
                  ,[DateModified]= @dateNow
			

Where Id = @Id


UPDATE [dbo].[Images]
	     
SET                [TypeId] = @TypeId
                  ,[Url]= @PrimaryImageUrl


Where Id = (SELECT f.PrimaryImageId

FROM dbo.Friends AS f

WHERE Id = @Id)


END
