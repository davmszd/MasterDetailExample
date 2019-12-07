IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Person] (
    [Id] nvarchar(450) NOT NULL,
    [Family] nvarchar(max) NULL,
    [Name] nvarchar(max) NULL,
    [NationalCode] nvarchar(max) NULL,
    [Subscribed] bit NOT NULL,
    CONSTRAINT [PK_Person] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [PersonPost] (
    [Id] nvarchar(450) NOT NULL,
    [Description] nvarchar(max) NULL,
    [Name] nvarchar(max) NULL,
    [PersonId] nvarchar(450) NULL,
    CONSTRAINT [PK_PersonPost] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PersonPost_Person_PersonId] FOREIGN KEY ([PersonId]) REFERENCES [Person] ([Id]) ON DELETE NO ACTION
);

GO

CREATE TABLE [PersonPostDetail] (
    [Id] nvarchar(450) NOT NULL,
    [FromDate] nvarchar(max) NULL,
    [PersonPostId] nvarchar(450) NULL,
    [ToDate] nvarchar(max) NULL,
    CONSTRAINT [PK_PersonPostDetail] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PersonPostDetail_PersonPost_PersonPostId] FOREIGN KEY ([PersonPostId]) REFERENCES [PersonPost] ([Id]) ON DELETE NO ACTION
);

GO

CREATE INDEX [IX_PersonPost_PersonId] ON [PersonPost] ([PersonId]);

GO

CREATE INDEX [IX_PersonPostDetail_PersonPostId] ON [PersonPostDetail] ([PersonPostId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191117215633_Init', N'2.0.1-rtm-125');

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191204145825_InitAnu', N'2.0.1-rtm-125');

GO

ALTER TABLE [Person] ADD [MaritalStatus] int NOT NULL DEFAULT 0;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191206085752_add-marital-status-to-person', N'2.0.1-rtm-125');

GO

