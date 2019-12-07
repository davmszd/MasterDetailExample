using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterDetail.Web.Model
{
  public class DBContext : DbContext
  {
    public DbSet<Person> Person { get; set; }
    public DbSet<PersonPost> PersonPost { get; set; }
    public DbSet<PersonPostDetail> PersonPostDetail { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      
      modelBuilder.Seed();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer(@"Server=.;initial catalog=MasterDetail;persist security info=True;user id=sa;password=123qweR;MultipleActiveResultSets=True;");
    }
  }

  public static class ModelBuilderExtensions
  {
    public static void Seed(this ModelBuilder modelBuilder)
    {

      //modelBuilder.Entity<Person>().HasDate(
      //    new Person
      //    {
      //      Name = "ali",
      //      Family = "alavi",
      //      NationalCode= "0123456789"
      //    },

      //    new Person
      //    {
      //      Name = "reza",
      //      Family = "razavi",
      //      NationalCode = "0123456789"
      //    },
      //    new Person
      //    {
      //      Name = "hasan",
      //      Family = "hasani",
      //      NationalCode = "0123456789"
      //    }
      //); 
    }
  }

  public enum MaritalStatus
  {
    None = 0,
    Single = 1,
    Married = 2,
  }

  public class Person
  {
    public string Id { get; set; }

    public string Name { get; set; }
    public string Family { get; set; }
    public string NationalCode { get; set; }
    public bool Subscribed { get; set; }
    public MaritalStatus MaritalStatus { get; set; }
    public List<PersonPost> ThePersonPostList { get; set; }

  }

  public class PersonPost
  {
    public string Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public List<PersonPostDetail> ThePersonPostDetailList { get; set; }
  }

  public class PersonPostDetail
  {
    public string Id { get; set; }
    public string FromDate { get; set; }
    public string ToDate { get; set; }
  }
}
