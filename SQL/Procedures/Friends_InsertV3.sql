

create proc [dbo].[Friends_InsertV3]

			@moreSkills [dbo].[Skills] READONLY
			,@Title nvarchar(120)
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

Declare @Id int = 0;

Declare		@moreSkills dbo.Skills 
			,@Title nvarchar(120) = 'James Dean'
			,@Bio nvarchar(700) = 'Model & Actor'
			,@Summary nvarchar(255) = 'Died Young'
			,@Headline nvarchar(80) = 'Car Crash'
			,@Slug nvarchar(100) = 'JD0'
			,@StatusId int = 010
			,@TypeId int = 111
		    ,@PrimaryImageUrl nvarchar(50) = 'imageurl.jpeg'
			,@UserId int = 2222


			EXECUTE dbo.Friends_InsertV3
			@moreSkills 
			,@Title 
			,@Bio 
			,@Summary 
			,@Headline 
			,@Slug 
			,@StatusId 
			,@TypeId
			,@PrimaryImageUrl
			,@UserId 
		    ,@Id OUTPUT
			
Select @Id
	
	select *
	from dbo.Friends
	where Id= @Id

*/


BEGIN



INSERT INTO [dbo].[Images]

							([TypeId]
							,[Url])

		
		VALUES		 (@TypeId
					,@PrimaryImageUrl)

		Declare	 @PrimaryImageId int= SCOPE_IDENTITY()
		
		Declare  @DateNow datetime2 = getutcdate()


INSERT INTO [dbo].[Friends]
							(Title
							,Bio
							,Summary
							,Headline
							,Slug
							,StatusId
							,PrimaryImageId
							,UserId
							)

		VALUES   (@Title
				,@Bio
				,@Summary
				,@Headline
				,@Slug
				,@StatusId
				,@PrimaryImageId
				,@UserId
				,@moreSkills)


	SET @Id = SCOPE_IDENTITY()



END
