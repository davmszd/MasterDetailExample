using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MasterDetail.Web.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Family = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    NationalCode = table.Column<string>(nullable: true),
                    Subscribed = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PersonPost",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    PersonId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonPost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonPost_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PersonPostDetail",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FromDate = table.Column<string>(nullable: true),
                    PersonPostId = table.Column<string>(nullable: true),
                    ToDate = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonPostDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonPostDetail_PersonPost_PersonPostId",
                        column: x => x.PersonPostId,
                        principalTable: "PersonPost",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonPost_PersonId",
                table: "PersonPost",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonPostDetail_PersonPostId",
                table: "PersonPostDetail",
                column: "PersonPostId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonPostDetail");

            migrationBuilder.DropTable(
                name: "PersonPost");

            migrationBuilder.DropTable(
                name: "Person");
        }
    }
}
