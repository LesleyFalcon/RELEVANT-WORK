ALTER proc [dbo].[Friends_InsertV2]
                  
                  @Title nvarchar(120)
                  ,@Bio nvarchar(700)
                  ,@Summary nvarchar(255)
                  ,@Headline nvarchar(80)
                  ,@Slug nvarchar(100)
                  ,@StatusId int
                  ,@TypeId int
                  ,@PrimaryImageUrl nvarchar(50)	
                  ,@UserId int
                  ,@Id int OUTPUT

AS


/*
Declare		         @Title nvarchar(120) = 'James Dean'
                  ,@Bio nvarchar(700) = 'Model & Actor'
                  ,@Summary nvarchar(255) = 'Died Young'
                  ,@Headline nvarchar(80) = 'Car Crash'
                  ,@Slug nvarchar(100) = 'JD0'
                  ,@StatusId int = 010
                  ,@TypeId int = 111
                  ,@PrimaryImageUrl nvarchar(50) = 'imageurl.jpeg'
                  ,@UserId int = 2222
			
Declare           @Id int =0;		

EXECUTE dbo.Friends_InsertV2
			
                  @Title 
                  ,@Bio 
                  ,@Summary 
                  ,@Headline 
                  ,@Slug 
                  ,@StatusId 
                  ,@TypeId
                  ,@PrimaryImageUrl
                  ,@UserId 
                  ,@Id OUTPUT
			
Select  @Id
	
Select *
From dbo.Friends
Where Id= @Id
*/

BEGIN

INSERT INTO [dbo].[Images]

                  ([TypeId]
                  ,[Url])

		
  VALUES		      (@TypeId
                  ,@PrimaryImageUrl)

Declare	          @PrimaryImageId int= SCOPE_IDENTITY()
		
	


INSERT INTO [dbo].[Friends]
                 
                  (Title
                  ,Bio
                  ,Summary
                  ,Headline
                  ,Slug
                  ,StatusId
                  ,PrimaryImageId
                  ,UserId)

  VALUES				  (@Title
                  ,@Bio
                  ,@Summary
                  ,@Headline
                  ,@Slug
                  ,@StatusId
                  ,@PrimaryImageId
                  ,@UserId)


SET @Id = SCOPE_IDENTITY()

END
